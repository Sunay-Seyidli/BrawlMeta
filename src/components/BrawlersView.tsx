import React, { useState } from 'react';
import { Brawler, Rarity, BrawlerClass } from '../types/brawl';
import { BRAWLERS, BRAWLER_CLASSES, BRAWLER_RARITIES } from '../data/brawlersData';
import { BrawlerAvatar } from './BrawlerAvatar';
import { RARITY_COLORS } from '../utils/rarityColors';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Search, Sparkles, Filter, ArrowUpDown, Swords, Shield, Zap } from 'lucide-react';

interface BrawlersViewProps {
  onSelectBrawler: (brawlerId: string) => void;
  lang?: Language;
}

export const BrawlersView: React.FC<BrawlersViewProps> = ({ onSelectBrawler, lang = 'en' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<string>('All');
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'winRate' | 'pickRate' | 'name' | 'releaseYear'>('winRate');

  const t = TRANSLATIONS[lang].brawlers;

  const filteredBrawlers = BRAWLERS.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = selectedRarity === 'All' || b.rarity === selectedRarity;
    const matchesClass = selectedClass === 'All' || b.class === selectedClass;
    return matchesSearch && matchesRarity && matchesClass;
  }).sort((a, b) => {
    if (sortBy === 'winRate') return b.winRate - a.winRate;
    if (sortBy === 'pickRate') return b.pickRate - a.pickRate;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'releaseYear') return b.releaseYear - a.releaseYear;
    return 0;
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#111722] border-2 border-slate-700/80 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Swords className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading text-white tracking-wide uppercase">
              {t.title} <span className="text-amber-400">{t.highlight}</span> ({BRAWLERS.length})
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0a0e14] border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Filter & Sort Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
          {/* Rarity filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-heading mr-1">{t.rarity}</span>
            {BRAWLER_RARITIES.map((rarity) => (
              <button
                key={rarity}
                onClick={() => setSelectedRarity(rarity)}
                className={`px-3 py-1 rounded-xl text-xs font-heading uppercase transition-all cursor-pointer ${
                  selectedRarity === rarity
                    ? 'bg-amber-500 text-black font-black shadow-md'
                    : 'bg-[#182130] text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {rarity === 'All' && lang === 'tr' ? 'Tümü' : rarity}
              </button>
            ))}
          </div>

          {/* Class filter & sort row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 font-heading mr-1">{t.class}</span>
              {BRAWLER_CLASSES.map((cls) => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-[#141b27] text-slate-400 hover:text-white'
                  }`}
                >
                  {cls === 'All' && lang === 'tr' ? 'Tümü' : cls}
                </button>
              ))}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                {t.sort}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0a0e14] border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-400 font-medium cursor-pointer"
              >
                <option value="winRate">{lang === 'tr' ? 'Kazanma Oranı % (Yüksekten Düşüğe)' : 'Win Rate % (High to Low)'}</option>
                <option value="pickRate">{lang === 'tr' ? 'Seçilme Oranı % (Popülerlik)' : 'Pick Rate % (Popularity)'}</option>
                <option value="releaseYear">{lang === 'tr' ? 'Çıkış Yılı (En Yeni)' : 'Release Year (Newest)'}</option>
                <option value="name">{lang === 'tr' ? 'Alfabetik (A - Z)' : 'Alphabetical (A - Z)'}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Brawlers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
        {filteredBrawlers.map((brawler) => {
          const rarityConfig = RARITY_COLORS[brawler.rarity];

          return (
            <div
              key={brawler.id}
              onClick={() => onSelectBrawler(brawler.id)}
              className="bg-[#121924] hover:bg-[#182333] border border-slate-800 hover:border-amber-400/80 rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-200 cursor-pointer group shadow-lg hover:-translate-y-1"
            >
              {/* Rarity & Tier indicator */}
              <div className="w-full flex items-center justify-between text-[10px] mb-2 px-1">
                <span
                  className="px-1.5 py-0.2 rounded font-heading text-white"
                  style={{ backgroundColor: rarityConfig.badge }}
                >
                  {brawler.rarity}
                </span>
                <span className="font-heading text-amber-400 font-bold bg-amber-950/60 px-1.5 py-0.2 rounded border border-amber-500/30">
                  {brawler.tier}
                </span>
              </div>

              {/* Avatar */}
              <BrawlerAvatar id={brawler.id} name={brawler.name} rarity={brawler.rarity} size="lg" />

              {/* Name & Title */}
              <h4 className="mt-2.5 font-heading text-base text-white group-hover:text-amber-400 transition-colors truncate w-full">
                {brawler.name}
              </h4>
              <p className="text-[10px] text-slate-400 font-medium truncate w-full">{brawler.class}</p>

              {/* Stats Bar */}
              <div className="w-full mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-bold">{brawler.winRate}% WR</span>
                <span className="text-slate-500 text-[11px]">{brawler.pickRate}% PR</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
