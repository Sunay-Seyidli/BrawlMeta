# BrawlMeta – Render Deployment

Uygulama tek bir Node.js Web Service olarak çalışır. Express sunucusu hem Vite ile build edilmiş frontend'i (`dist/`) hem de `/api/brawlstars/*` endpoint'lerini sunar.

## 1. Repo'yu GitHub'a koyun

Projeyi bir GitHub reposuna push edin. Render GitHub/GitLab üzerinden çalışır.

## 2. Blueprint ile kurulum (önerilen)

1. Render dashboard → **New** → **Blueprint**.
2. Repo'yu seçin. Render kökteki `render.yaml` dosyasını okuyacaktır.
3. `BRAWL_STARS_API_KEY` için değer isteyecektir; Brawl Stars developer token'ınızı girin.
4. **Apply** deyin.

## 3. Manuel kurulum (alternatif)

1. **New** → **Web Service** → repo'yu seçin.
2. Ayarlar:
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Health Check Path: `/healthz`
3. **Environment** sekmesinde:
   - `BRAWL_STARS_API_KEY` = token'ınız (Secret olarak işaretleyin)
   - `NODE_VERSION` = `22.12.0`

`PORT` değişkenini Render otomatik verir; elle eklemeyin.

## 4. Brawl Stars API IP whitelist (önemli)

`developer.brawlstars.com` üzerindeki anahtar, isteği yapan çıkış IP'sine izin vermelidir. Render servisleri sabit bir çıkış IP'si ile çalışır; bu IP'yi Render dokümantasyonundaki **Outbound IP addresses** bölümünden bulup servisinizin bölgesine uygun olanı "Allowed IP Addresses" listesine ekleyin. Liste zaman içinde değişebileceği için dokümandaki güncel değeri kullanın. Ekleme yapmadan 403 hatası alırsanız sebep budur.

## 5. Doğrulama

Deploy tamamlandıktan sonra:

```bash
curl https://<servisiniz>.onrender.com/healthz
# {"status":"ok"}

curl https://<servisiniz>.onrender.com/api/brawlstars/status
# {"configured":true}
```

## Notlar

- **Free plan** servisi 15 dakika trafik almazsa uyutur; ilk istek birkaç saniye gecikebilir. Sürekli açık olması için `plan: starter` veya üstünü seçin.
- `.env` dosyası Render'da kullanılmaz; tüm değişkenler dashboard veya `render.yaml` üzerinden girilir.
- `autoDeploy: true` olduğu için her `main` push'unda yeniden deploy olur.
- Build ve start komutları Linux üzerinde çalışır; ek bir Docker gerekmez.
