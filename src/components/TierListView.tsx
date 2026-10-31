import React, { useState } from 'react';
import { Brawler, GameModeType } from '../types/brawl';
import { BRAWLERS } from '../data/brawlersData';
import { MAPS_DATA } from '../data/mapsData';
import { BrawlerAvatar } from './BrawlerAvatar';
import { MODE_CONFIG, RARITY_COLORS } from '../utils/rarityColors';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  Sparkles,
  Filter,
  Trophy,
  ArrowUpDown,
  Table,
  LayoutGrid,
  Zap,
  TrendingUp,
  Search,
} from 'lucide-react';

interface TierListViewProps {
  onSelectBrawler: (brawlerId: string) => void;
  onSelectMap?: (mapName: string) => void;
  lang?: Language;
}

type TrophyRange = 'all' | '0-500' | '500-750' | '750-1000' | '1000+';

export const TierListView: React.FC<TierListViewProps> = ({
  onSelectBrawler,
  onSelectMap,
  lang = 'en',
}) => {
  const [selectedMode, setSelectedMode] = useState<GameModeType | 'Overall'>('Overall');
  const [selectedMap, setSelectedMap] = useState<string>('All');
  const [trophyRange, setTrophyRange] = useState<TrophyRange>('all');
  const [viewMode, setViewMode] = useState<'tiers' | 'table'>('tiers');
  const [tableSort, setTableSort] = useState<'winRate' | 'pickRate' | 'starRate'>('winRate');
  const [searchQuery, setSearchQuery] = useState('');

  const t = TRANSLATIONS[lang].tierlist;

  const MODES_LIST: Array<GameModeType | 'Overall'> = [
    'Overall',
    'Gem Grab',
    'Brawl Ball',
    'Knockout',
    'Heist',
    'Hot Zone',
    'Solo Showdown',
  ];

  // Dynamic calculation of brawler win rate and tier based on mode and trophy range
  const calculateAdjustedStats = (brawler: Brawler) => {
    let wr = brawler.winRate;
    let pr = brawler.pickRate;

    // Mode synergy adjustments
    if (selectedMode !== 'Overall') {
      if (brawler.bestModes.includes(selectedMode as GameModeType)) {
        wr += 4.5;
        pr += 2.8;
      } else {
        wr -= 2.5;
        pr -= 1.2;
      }
    }

    // Trophy bracket adjustments
    if (trophyRange === '1000+') {
      if (['piper', 'angelo', 'kenji', 'draco', 'melodie'].includes(brawler.id)) wr += 2.0;
      if (['edgar', 'shelly'].includes(brawler.id)) wr -= 3.5;
    } else if (trophyRange === '0-500') {
      if (['edgar', 'shelly'].includes(brawler.id)) wr += 4.0;
    }

    // Recalculate Tier dynamically
    let calculatedTier: 'S+' | 'S' | 'A' | 'B' | 'C' | 'D' = 'B';
    if (wr >= 58) calculatedTier = 'S+';
    else if (wr >= 55) calculatedTier = 'S';
    else if (wr >= 52) calculatedTier = 'A';
    else if (wr >= 49) calculatedTier = 'B';
    else if (wr >= 46) calculatedTier = 'C';
    else calculatedTier = 'D';

    return {
      ...brawler,
      adjustedWinRate: Number(Math.min(68, Math.max(40, wr)).toFixed(1)),
      adjustedPickRate: Number(Math.max(1, pr).toFixed(1)),
      dynamicTier: calculatedTier,
    };
  };

  const processedBrawlers = BRAWLERS.map(calculateAdjustedStats).filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const TIERS: Array<{
    name: 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';
    label: string;
    bg: string;
    textColor: string;
    description: string;
  }> = [
    { name: 'S+', label: 'GOD TIER / S+', bg: 'from-amber-500 to-yellow-600', textColor: 'text-amber-300', description: t.tierDescriptions.sPlus },
    { name: 'S', label: 'TIER S', bg: 'from-purple-600 to-pink-600', textColor: 'text-purple-300', description: t.tierDescriptions.s },
    { name: 'A', label: 'TIER A', bg: 'from-blue-600 to-indigo-600', textColor: 'text-blue-300', description: t.tierDescriptions.a },
    { name: 'B', label: 'TIER B', bg: 'from-emerald-600 to-teal-600', textColor: 'text-emerald-300', description: t.tierDescriptions.b },
    { name: 'C', label: 'TIER C', bg: 'from-slate-600 to-slate-700', textColor: 'text-slate-300', description: t.tierDescriptions.c },
    { name: 'D', label: 'TIER D', bg: 'from-rose-900 to-red-950', textColor: 'text-rose-400', description: t.tierDescriptions.d },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Title & Filter Header */}
      <div className="bg-[#111722] border-2 border-slate-700/80 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading text-white tracking-wide uppercase">
              {t.title} <span className="text-amber-400">{t.highlight}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-2 bg-[#0a0e14] p-1.5 rounded-2xl border border-slate-800 self-start md:self-center">
            <button
              onClick={() => setViewMode('tiers')}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'tiers'
                  ? 'bg-amber-500 text-black font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              {t.visualTiers}
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-xl text-xs font-heading uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-amber-500 text-black font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              {t.statsTable}
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-4">
          {/* 1. Mode Filter Tabs */}
          <div>
            <div className="text-xs font-heading text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              {t.filterMode}
            </div>
            <div className="flex flex-wrap gap-2">
              {MODES_LIST.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-heading uppercase tracking-wider transition-all cursor-pointer ${
                    selectedMode === mode
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-black shadow-md'
                      : 'bg-[#182130] text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {mode === 'Overall' && lang === 'tr' ? 'Genel' : mode}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Trophy Range & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Trophy Ranges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-medium shrink-0 flex items-center gap-1 mr-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                {t.filterRange}
              </span>
              {(['all', '0-500', '500-750', '750-1000', '1000+'] as TrophyRange[]).map((range) => (
                <button
                  key={range}
                  onClick={() => setTrophyRange(range)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-heading tracking-wider uppercase transition-all cursor-pointer ${
                    trophyRange === range
                      ? 'bg-purple-600 text-white font-bold shadow'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {range === 'all' ? t.allTrophies : `${range} 🏆`}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-60">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={t.findBrawler}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#0a0e14] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* TIER MATRIX VIEW */}
      {viewMode === 'tiers' && (
        <div className="space-y-4">
          {TIERS.map((tier) => {
            const brawlersInTier = processedBrawlers.filter((b) => b.dynamicTier === tier.name);
            if (brawlersInTier.length === 0) return null;

            return (
              <div
                key={tier.name}
                className="bg-[#111722] border-2 border-slate-800 rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row items-stretch"
              >
                {/* Left Tier Header Banner */}
                <div
                  className={`w-full md:w-36 p-4 bg-gradient-to-br ${tier.bg} flex flex-col items-center justify-center text-center shrink-0 border-b md:border-b-0 md:border-r border-black/30`}
                >
                  <span className="text-3xl md:text-4xl font-heading text-black font-black drop-shadow-md">
                    {tier.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-black/90 tracking-widest mt-1">
                    {brawlersInTier.length} {lang === 'tr' ? 'Savaşçı' : 'Brawlers'}
                  </span>
                </div>

                {/* Right Brawler Cards Grid */}
                <div className="p-4 flex-1 bg-[#0c1119]">
                  <p className="text-[11px] text-slate-400 italic mb-3">{tier.description}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {brawlersInTier.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => onSelectBrawler(b.id)}
                        className="bg-[#141b27] hover:bg-[#1a2333] border border-slate-800 hover:border-amber-400/80 p-2.5 rounded-2xl flex flex-col items-center text-center transition-all duration-200 cursor-pointer group hover:-translate-y-1 shadow-md"
                      >
                        <BrawlerAvatar id={b.id} name={b.name} rarity={b.rarity} size="md" />
                        <h4 className="mt-2 font-heading text-sm text-white group-hover:text-amber-400 transition-colors truncate w-full">
                          {b.name}
                        </h4>
                        <div className="mt-1 flex items-center justify-between w-full px-1 text-[11px]">
                          <span className="font-heading text-emerald-400">{b.adjustedWinRate}%</span>
                          <span className="text-slate-400 font-mono text-[10px]">{b.adjustedPickRate}% PR</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAILED TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-[#111722] border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0c1017] text-slate-400 font-heading uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-3.5">{t.tier}</th>
                  <th className="p-3.5">{t.brawler}</th>
                  <th className="p-3.5">{t.classRarity}</th>
                  <th
                    className="p-3.5 cursor-pointer hover:text-white"
                    onClick={() => setTableSort('winRate')}
                  >
                    {t.winRate} {tableSort === 'winRate' && '▼'}
                  </th>
                  <th
                    className="p-3.5 cursor-pointer hover:text-white"
                    onClick={() => setTableSort('pickRate')}
                  >
                    {t.pickRate} {tableSort === 'pickRate' && '▼'}
                  </th>
                  <th className="p-3.5">{t.starPlayerRate}</th>
                  <th className="p-3.5">{t.bestMode}</th>
                  <th className="p-3.5 text-right">{t.guide}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {processedBrawlers
                  .sort((a, b) => {
                    if (tableSort === 'winRate') return b.adjustedWinRate - a.adjustedWinRate;
                    if (tableSort === 'pickRate') return b.adjustedPickRate - a.adjustedPickRate;
                    return b.starRate - a.starRate;
                  })
                  .map((b) => {
                    const rarityConfig = RARITY_COLORS[b.rarity];
                    return (
                      <tr
                        key={b.id}
                        className="hover:bg-[#151c28] transition-colors cursor-pointer"
                        onClick={() => onSelectBrawler(b.id)}
                      >
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-heading font-black bg-slate-800 text-amber-400 border border-amber-500/40">
                            {b.dynamicTier}
                          </span>
                        </td>
                        <td className="p-3.5 flex items-center gap-2.5">
                          <BrawlerAvatar id={b.id} name={b.name} rarity={b.rarity} size="xs" showBorder={false} />
                          <span className="font-heading text-sm text-white">{b.name}</span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-heading text-white mr-1.5"
                            style={{ backgroundColor: rarityConfig.badge }}
                          >
                            {b.rarity}
                          </span>
                          <span className="text-slate-400">{b.class}</span>
                        </td>
                        <td className="p-3.5 font-heading text-sm text-emerald-400 font-bold">
                          {b.adjustedWinRate}%
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">
                          {b.adjustedPickRate}%
                        </td>
                        <td className="p-3.5 font-mono text-amber-400">
                          {b.starRate}%
                        </td>
                        <td className="p-3.5 text-slate-300 font-medium">
                          {b.bestModes[0]}
                        </td>
                        <td className="p-3.5 text-right">
                          <button className="px-2.5 py-1 bg-slate-800 hover:bg-amber-500 hover:text-black rounded text-[11px] font-heading transition-colors cursor-pointer">
                            {t.guide}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
