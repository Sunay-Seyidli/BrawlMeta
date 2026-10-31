import React, { useState } from 'react';
import { Brawler } from '../types/brawl';
import { RARITY_COLORS } from '../utils/rarityColors';
import { BrawlerAvatar } from './BrawlerAvatar';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { X, Shield, Swords, Zap, Gauge, Flame, Sparkles, Trophy, CheckCircle2 } from 'lucide-react';

interface BrawlerWikiModalProps {
  brawler: Brawler | null;
  onClose: () => void;
  onSelectMap?: (mapName: string) => void;
  lang?: Language;
}

export const BrawlerWikiModal: React.FC<BrawlerWikiModalProps> = ({
  brawler,
  onClose,
  onSelectMap,
  lang = 'en',
}) => {
  const [powerLevel, setPowerLevel] = useState<number>(11);
  const [activeTab, setActiveTab] = useState<'abilities' | 'meta' | 'synergies'>('abilities');

  const t = TRANSLATIONS[lang].brawlers;

  if (!brawler) return null;

  const rarityConfig = RARITY_COLORS[brawler.rarity];

  // Brawl Stars stat formula:
  const calculateStat = (base: number, max: number) => {
    if (powerLevel === 1) return base;
    if (powerLevel === 11) return max;
    const step = (max - base) / 10;
    return Math.round(base + step * (powerLevel - 1));
  };

  const currentHealth = calculateStat(brawler.stats.healthBase, brawler.stats.healthMax);
  const currentDamage = calculateStat(brawler.stats.damageBase, brawler.stats.damageMax);
  const currentSuper = calculateStat(brawler.stats.superBase, brawler.stats.superMax);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#111722] border-2 border-slate-700 rounded-3xl overflow-hidden shadow-2xl my-auto">
        {/* Header with brawler thematic gradient banner */}
        <div className={`p-6 bg-gradient-to-r ${rarityConfig.bg} border-b border-slate-800 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <BrawlerAvatar id={brawler.id} name={brawler.name} rarity={brawler.rarity} size="xl" />
            <div className="text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                <span
                  className="px-2.5 py-0.5 rounded-full text-xs font-heading uppercase text-white shadow-sm"
                  style={{ backgroundColor: rarityConfig.badge }}
                >
                  {brawler.rarity}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  {brawler.class}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-heading bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  TIER {brawler.tier}
                </span>
                <span className="text-xs text-slate-400">
                  {lang === 'tr' ? `${brawler.releaseYear} Yılında Çıktı` : `Released ${brawler.releaseYear}`}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-heading text-white tracking-wide uppercase">
                {brawler.name}
              </h2>
              <p className="text-sm text-slate-300 font-medium italic mt-0.5">{brawler.title}</p>
              <p className="text-xs text-slate-300/80 mt-2 max-w-xl">{brawler.description}</p>
            </div>
          </div>
        </div>

        {/* Dynamic Power Level Slider & Interactive Stats */}
        <div className="p-4 bg-[#0d121b] border-b border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-heading uppercase tracking-wider text-slate-300">
                {t.inspectPower}
              </span>
              <span className="px-2 py-0.5 bg-gradient-to-r from-red-600 to-amber-500 rounded font-heading text-sm text-white shadow-sm">
                {lang === 'tr' ? `Seviye ${powerLevel}` : `Power ${powerLevel}`}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-60">
              <span className="text-xs text-slate-500 font-bold">1</span>
              <input
                type="range"
                min={1}
                max={11}
                value={powerLevel}
                onChange={(e) => setPowerLevel(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-700 rounded-lg appearance-none"
              />
              <span className="text-xs text-amber-400 font-bold">{t.powerMax}</span>
            </div>
          </div>

          {/* Stats Barometer Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="bg-[#141b27] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                <Shield className="w-3.5 h-3.5" />
                <span>{t.health}</span>
              </div>
              <div className="text-lg font-heading text-white">{currentHealth.toLocaleString()}</div>
            </div>

            <div className="bg-[#141b27] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-rose-400 font-medium mb-1">
                <Swords className="w-3.5 h-3.5" />
                <span>{t.attackDamage}</span>
              </div>
              <div className="text-lg font-heading text-white">{currentDamage.toLocaleString()}</div>
            </div>

            <div className="bg-[#141b27] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>{t.superPower}</span>
              </div>
              <div className="text-lg font-heading text-white">
                {currentSuper > 0 ? currentSuper.toLocaleString() : (lang === 'tr' ? 'Etki/Güçlendirme' : 'Utility/Buff')}
              </div>
            </div>

            <div className="bg-[#141b27] p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium mb-1">
                <Gauge className="w-3.5 h-3.5" />
                <span>{t.speedRange}</span>
              </div>
              <div className="text-xs font-bold text-slate-200">
                {brawler.stats.movementSpeed} • {brawler.stats.range}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800 bg-[#0c1017]">
          <button
            onClick={() => setActiveTab('abilities')}
            className={`flex-1 py-3 text-xs font-heading uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'abilities'
                ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.tabAbilities}
          </button>
          <button
            onClick={() => setActiveTab('meta')}
            className={`flex-1 py-3 text-xs font-heading uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'meta'
                ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.tabMeta}
          </button>
          <button
            onClick={() => setActiveTab('synergies')}
            className={`flex-1 py-3 text-xs font-heading uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'synergies'
                ? 'text-amber-400 border-b-2 border-amber-400 bg-amber-500/5'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.tabSynergies}
          </button>
        </div>

        {/* Modal Tab Content */}
        <div className="p-5 max-h-[420px] overflow-y-auto space-y-5">
          {activeTab === 'abilities' && (
            <>
              {/* Star Powers */}
              <div>
                <h4 className="text-xs font-heading uppercase tracking-wider text-amber-400 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  {t.starPowers}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {brawler.starPowers.map((sp) => (
                    <div key={sp.id} className="p-3 bg-[#151c28] border border-amber-500/30 rounded-xl relative">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-heading text-sm text-amber-300">{sp.name}</span>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          {sp.winRate}% {lang === 'tr' ? 'Kazanma' : 'Win'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{sp.description}</p>
                      <div className="mt-2 text-[10px] text-slate-400 font-mono">
                        {lang === 'tr' ? `Seçilme: %${sp.pickRate}` : `Usage: ${sp.pickRate}% pick rate`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gadgets */}
              <div>
                <h4 className="text-xs font-heading uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-4 h-4" />
                  {t.gadgets}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {brawler.gadgets.map((gad) => (
                    <div key={gad.id} className="p-3 bg-[#151c28] border border-emerald-500/30 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-heading text-sm text-emerald-300">{gad.name}</span>
                        <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          {gad.winRate}% {lang === 'tr' ? 'Kazanma' : 'Win'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{gad.description}</p>
                      <div className="mt-2 text-[10px] text-slate-400 font-mono">
                        {lang === 'tr' ? `Seçilme: %${gad.pickRate}` : `Usage: ${gad.pickRate}% pick rate`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hypercharge if present */}
              {brawler.hypercharge && (
                <div className="p-4 bg-gradient-to-r from-purple-950/80 to-fuchsia-950/80 border border-purple-500/50 rounded-2xl relative overflow-hidden">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-heading text-xs rounded shadow-sm">
                      {t.hypercharge}
                    </span>
                    <h5 className="font-heading text-base text-purple-200">{brawler.hypercharge.name}</h5>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">{brawler.hypercharge.description}</p>
                  <div className="mt-3 flex items-center gap-4 text-xs font-bold text-purple-300">
                    <span>⚡ {lang === 'tr' ? 'Hız' : 'Speed'} +{brawler.hypercharge.speedBoost}%</span>
                    <span>⚔️ {lang === 'tr' ? 'Hasar' : 'Damage'} +{brawler.hypercharge.damageBoost}%</span>
                    <span>🛡️ {lang === 'tr' ? 'Kalkan' : 'Shield'} +{brawler.hypercharge.shieldBoost}%</span>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'meta' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-heading uppercase tracking-wider text-slate-300 mb-2">
                  {t.bestMapsTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {brawler.bestMaps.map((mapName) => (
                    <div
                      key={mapName}
                      onClick={() => onSelectMap?.(mapName)}
                      className="p-3 bg-[#151c28] border border-slate-700/80 hover:border-amber-400/80 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span className="font-heading text-sm text-slate-200">{mapName}</span>
                      </div>
                      <span className="text-xs text-amber-400 font-bold">
                        {lang === 'tr' ? 'Rehbere Git →' : 'View Guide →'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-heading uppercase tracking-wider text-slate-300 mb-2">
                  {t.bestModesTitle}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {brawler.bestModes.map((mode) => (
                    <span
                      key={mode}
                      className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-heading text-slate-200"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'synergies' && (
            <div>
              <h4 className="text-xs font-heading uppercase tracking-wider text-slate-300 mb-2">
                {t.recommendedComps}
              </h4>
              <p className="text-xs text-slate-400 mb-3">
                {lang === 'tr'
                  ? `${brawler.name} savaşçısını aşağıdaki uyumlu şampiyonlarla eşleştirmek koridor hakimiyetini ve süper döngülerini en üst düzeye çıkarır:`
                  : `Pairing ${brawler.name} with these complementary brawlers maximizes lane control and Super recharge chains:`}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {brawler.synergies.map((partner) => (
                  <div
                    key={partner}
                    className="p-3 bg-[#151c28] border border-slate-700 rounded-xl flex items-center gap-3"
                  >
                    <BrawlerAvatar name={partner} size="sm" />
                    <div>
                      <div className="font-heading text-sm text-slate-200">{partner}</div>
                      <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {t.highSynergy}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
