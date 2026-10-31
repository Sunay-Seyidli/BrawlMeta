import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Local development: loads .env if it exists.
// On Render: environment variables are set in the dashboard (or render.yaml)
// and are read from process.env. Render does not use .env files.
dotenv.config({ quiet: true });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
// Render sets RENDER=true at runtime, so production mode is detected automatically.
const isProd = process.env.NODE_ENV === 'production' || process.env.RENDER === 'true';

const BRAWL_API_BASE = 'https://api.brawlstars.com/v1';
const UPSTREAM_TIMEOUT_MS = 8000;
const PLACEHOLDER_KEY = 'YOUR_BRAWL_STARS_API_KEY';

const getApiKey = (): string => {
  const key = (process.env.BRAWL_STARS_API_KEY || process.env.VITE_BRAWL_STARS_API_KEY || '').trim();
  return key && key !== PLACEHOLDER_KEY ? key : '';
};

const encodeTag = (raw: string): string => {
  const tag = raw.trim();
  return encodeURIComponent((tag.startsWith('#') ? tag : `#${tag}`).toUpperCase());
};

const brawlFetch = (apiPath: string, apiKey: string): Promise<Response> =>
  fetch(`${BRAWL_API_BASE}${apiPath}`, {
    headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });

async function startServer() {
  const app = express();
  app.set('trust proxy', true); // Render's proxy sits in front of the app
  app.use(express.json());

  // Health check path (render.yaml -> healthCheckPath)
  app.get('/healthz', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  // Reports whether the key is configured. Never returns any part of the key.
  app.get('/api/brawlstars/status', (_req, res) => {
    res.json({ configured: Boolean(getApiKey()) });
  });

  // Official Brawl Stars API: player profile + battle log
  app.get('/api/brawlstars/player/:tag', async (req, res) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      return res.json({
        success: false,
        error: 'NO_KEY',
        message: 'No BRAWL_STARS_API_KEY set in environment. Using high-fidelity verified simulator.',
      });
    }

    const tag = encodeTag(req.params.tag);

    try {
      const [playerRes, battleRes] = await Promise.all([
        brawlFetch(`/players/${tag}`, apiKey),
        brawlFetch(`/players/${tag}/battlelog`, apiKey),
      ]);

      if (!playerRes.ok) {
        const errorText = await playerRes.text();
        return res.json({
          success: false,
          error: `HTTP_${playerRes.status}`,
          status: playerRes.status,
          message:
            playerRes.status === 403
              ? '403 Forbidden: The public IP of this deployment is not in the "Allowed IP Addresses" list on developer.brawlstars.com, or the API key is invalid or expired.'
              : playerRes.status === 404
              ? '404 Player Tag Not Found in Brawl Stars.'
              : `Brawl Stars API error: ${errorText}`,
        });
      }

      const playerData = await playerRes.json();
      let battleData: any = null;
      if (battleRes.ok) {
        try {
          battleData = await battleRes.json();
        } catch {
          // battlelog is optional
        }
      }

      return res.json({
        success: true,
        source: 'official_supercell_api',
        data: playerData,
        battleLog: battleData?.items ?? [],
      });
    } catch (err: any) {
      console.error('Brawl Stars API fetch error:', err);
      return res.json({
        success: false,
        error: 'NETWORK_ERROR',
        message: err?.message || 'Failed to connect to https://api.brawlstars.com',
      });
    }
  });

  // Official Brawl Stars event rotation
  app.get('/api/brawlstars/events/rotation', async (_req, res) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      return res.json({ success: false, error: 'NO_KEY' });
    }

    try {
      const response = await brawlFetch('/events/rotation', apiKey);
      if (!response.ok) {
        return res.json({ success: false, status: response.status });
      }
      const data = await response.json();
      return res.json({ success: true, data });
    } catch (err: any) {
      return res.json({ success: false, error: err?.message });
    }
  });

  // Unknown API routes should 404 instead of returning the SPA shell
  app.use('/api', (_req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  const distDir = path.resolve(__dirname, 'dist');

  if (!isProd) {
    // Development: Vite dev server runs as middleware (HMR included)
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve the prebuilt SPA from dist/
    app.use('/assets', express.static(path.join(distDir, 'assets'), {
      immutable: true,
      maxAge: '1y',
      fallthrough: false,
    }));
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  const server = app.listen(PORT, HOST, () => {
    console.log(`BrawlMeta running at http://${HOST}:${PORT} (${isProd ? 'production' : 'development'})`);
  });

  // Render sends SIGTERM before stopping or redeploying an instance
  const shutdown = (signal: string) => {
    console.log(`${signal} received, shutting down...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 10_000).unref();
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
