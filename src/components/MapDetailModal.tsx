import React from 'react';
import { GameMap } from '../types/brawl';
import { MODE_CONFIG } from '../utils/rarityColors';
import { MapBlueprint } from './MapBlueprint';
import { BrawlerAvatar } from './BrawlerAvatar';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { X, Trophy, CheckCircle, Info, Sparkles } from 'lucide-react';

interface MapDetailModalProps {
  map: GameMap | null;
  onClose: () => void;
  onSelectBrawler?: (brawlerId: string) => void;
  lang?: Language;
}

export const MapDetailModal: React.FC<MapDetailModalProps> = ({
  map,
  onClose,
  onSelectBrawler,
  lang = 'en',
}) => {
  if (!map) return null;

  const t = TRANSLATIONS[lang].maps;

  const modeConfig = MODE_CONFIG[map.mode] || {
    color: '#3b82f6',
    iconBg: 'bg-blue-600',
    borderColor: 'border-blue-500',
    objective: 'Battle for victory!',
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#111722] border-2 border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 to-[#141d2b] border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-heading tracking-wider uppercase text-white shadow-sm"
              style={{ backgroundColor: modeConfig.color }}
            >
              {map.mode}
            </span>
            <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs font-semibold rounded-full border border-slate-700">
              {lang === 'tr' ? `Tema: ${map.environment}` : `Environment: ${map.environment}`}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading text-white tracking-wide uppercase">
            {map.name}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">{map.description}</p>
        </div>

        {/* Content Body: Blueprint left, Analytics & Top Brawlers right */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 max-h-[520px] overflow-y-auto">
          {/* Tactical Blueprint Grid */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <MapBlueprint map={map} className="w-full" lang={lang} />
            <div className="mt-3 w-full bg-[#151c27] p-3 rounded-xl border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 font-heading text-amber-400 mb-1">
                <Info className="w-3.5 h-3.5" />
                {t.objective}
              </div>
              <p>{modeConfig.objective}</p>
            </div>
          </div>

          {/* Strategic Tips & Top Meta Brawlers */}
          <div className="lg:col-span-7 space-y-5">
            {/* Strategy Tips */}
            <div>
              <h4 className="text-xs font-heading uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                {t.keyGuidelines}
              </h4>
              <div className="space-y-2">
                {map.tips.map((tip, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#151d29] border border-slate-800 rounded-xl flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Brawlers Calculated by Win Rate */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-heading uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  {t.topBrawlersForMap}
                </h4>
                <span className="text-[11px] text-slate-500 font-mono">{t.matchesAnalyzed}</span>
              </div>

              <div className="space-y-2">
                {map.topBrawlers.map((b, index) => (
                  <div
                    key={b.brawlerId}
                    onClick={() => onSelectBrawler?.(b.brawlerId)}
                    className="p-2.5 bg-[#141b27] hover:bg-[#1a2333] border border-slate-800 hover:border-amber-400/50 rounded-xl flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 text-center font-heading text-slate-400 font-bold text-xs">
                        #{index + 1}
                      </span>
                      <BrawlerAvatar id={b.brawlerId} name={b.name} size="sm" showBorder={false} />
                      <div>
                        <div className="font-heading text-sm text-white group-hover:text-amber-400 transition-colors">
                          {b.name}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {lang === 'tr' ? `Seçilme: %${b.pickRate} • Yıldız: %${b.starRate}` : `Pick Rate: ${b.pickRate}% • Star Rate: ${b.starRate}%`}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-heading text-base text-emerald-400">{b.winRate}%</div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase">
                        {lang === 'tr' ? 'Kazanma Oranı' : 'Win Rate'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
