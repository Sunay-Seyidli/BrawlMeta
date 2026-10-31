import React from 'react';
import { HeroSearch } from './HeroSearch';
import { EventCard } from './EventCard';
import { INITIAL_EVENT_SLOTS } from '../data/eventsData';
import { BRAWLERS } from '../data/brawlersData';
import { BrawlerAvatar } from './BrawlerAvatar';
import { NavTab } from './Header';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  Trophy,
  Swords,
  Compass,
  BarChart3,
  Clock,
  Sparkles,
  ChevronRight,
  Flame,
} from 'lucide-react';

interface HomeViewProps {
  onSearch: (tag: string, type: 'player' | 'club') => void;
  onSelectTab: (tab: NavTab) => void;
  onSelectBrawler: (brawlerId: string) => void;
  onSelectMap: (mapId: string) => void;
  isLoading?: boolean;
  lang: Language;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onSearch,
  onSelectTab,
  onSelectBrawler,
  onSelectMap,
  isLoading = false,
  lang,
}) => {
  const tEvents = TRANSLATIONS[lang].events;
  const tTier = TRANSLATIONS[lang].tierlist;
  const topMetaBrawlers = BRAWLERS.filter((b) => b.tier === 'S+' || b.tier === 'S').slice(0, 6);

  return (
    <div className="w-full space-y-12">
      {/* 1. Hero Search Section */}
      <HeroSearch onSearch={onSearch} isLoading={isLoading} lang={lang} />

      {/* 2. Real-Time Active Event Rotation ("Live Now" with live timers) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <h2 className="text-2xl sm:text-3xl font-heading text-white uppercase tracking-wide">
                {tEvents.liveTitle} <span className="text-amber-400">
                  {lang === 'tr' ? 'Etkinlik Rotasyonu' : 'Event Rotation'}
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
              {tEvents.liveSubtitle}
            </p>
          </div>

          <button
            onClick={() => onSelectTab('maps')}
            className="px-4 py-2 bg-[#141c28] hover:bg-amber-500 hover:text-black border border-slate-700/80 rounded-xl text-xs font-heading uppercase tracking-wider text-slate-200 transition-colors flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <span>{tEvents.viewAllMaps}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Active Live Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INITIAL_EVENT_SLOTS.slice(0, 3).map((slot) => (
            <EventCard key={slot.slotId} event={slot} onSelectMap={onSelectMap} lang={lang} />
          ))}
        </div>
      </section>

      {/* 3. Trending Meta Brawlers (S+ Tier Dominators) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-[#111722] border-2 border-slate-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-2">
                <Flame className="w-3.5 h-3.5 fill-rose-500" />
                <span>{lang === 'tr' ? 'GÜNCEL METADA ÇOK POPÜLER' : 'HOT IN THE CURRENT META'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading text-white uppercase tracking-wide">
                {lang === 'tr' ? 'Zirvedeki S+ Meta' : 'Dominating S+ Meta'}{' '}
                <span className="text-amber-400">
                  {lang === 'tr' ? 'Savaşçıları' : 'Picks'}
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                {lang === 'tr'
                  ? 'Yüksek kupa karşılaşmalarında ve turnuvalarda en yüksek kazanma oranına sahip savaşçılar.'
                  : 'Highest win-rate brawlers across high-ladder games and Brawl Stars Championship qualifiers.'}
              </p>
            </div>

            <button
              onClick={() => onSelectTab('tierlist')}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-heading text-xs uppercase tracking-wider rounded-xl transition-all shadow-md self-start sm:self-auto cursor-pointer flex items-center gap-1.5"
            >
              <span>{lang === 'tr' ? 'Tüm Kademe Listesini Gör' : 'View Full Tier List'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {topMetaBrawlers.map((brawler) => (
              <div
                key={brawler.id}
                onClick={() => onSelectBrawler(brawler.id)}
                className="bg-[#151d2a] hover:bg-[#1a2536] border border-slate-700/80 hover:border-amber-400/80 rounded-2xl p-3 flex flex-col items-center text-center transition-all duration-200 cursor-pointer group hover:-translate-y-1 shadow-md"
              >
                <div className="w-full flex justify-between items-center text-[10px] mb-2 px-1">
                  <span className="font-heading text-amber-400 font-bold bg-amber-950/70 px-1.5 py-0.2 rounded border border-amber-500/40">
                    TIER {brawler.tier}
                  </span>
                  <span className="font-heading text-emerald-400">{brawler.winRate}% WR</span>
                </div>

                <BrawlerAvatar id={brawler.id} name={brawler.name} rarity={brawler.rarity} size="lg" />

                <h4 className="mt-2.5 font-heading text-sm text-white group-hover:text-amber-400 transition-colors truncate w-full">
                  {brawler.name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate w-full">{brawler.class}</p>

                <div className="mt-2 w-full pt-2 border-t border-slate-800 text-[10px] text-amber-300 font-medium truncate">
                  {lang === 'tr' ? 'En İyi Mod:' : 'Best:'} {brawler.bestModes[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Core Features Quick Hub */}
      <section className="max-w-6xl mx-auto px-4">
        <h3 className="text-xl font-heading text-white uppercase tracking-wider mb-4">
          {lang === 'tr' ? 'Analiz Araçlarını Keşfet' : 'Explore The Analytics Suite'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onSelectTab('tierlist')}
            className="p-5 bg-[#121924] hover:bg-[#172130] border border-slate-800 hover:border-amber-400/60 rounded-2xl transition-all cursor-pointer group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg text-white group-hover:text-amber-400 transition-colors">
              {lang === 'tr' ? 'Meta Kademe Listesi' : 'Meta Tier Matrix'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'tr'
                ? 'Oyun moduna ve kupa aralığına göre filtrelenebilen dinamik S+ - D kademeleri.'
                : 'Dynamic S+ to D tier list filterable by game mode, map, and trophy bracket.'}
            </p>
          </div>

          <div
            onClick={() => onSelectTab('maps')}
            className="p-5 bg-[#121924] hover:bg-[#172130] border border-slate-800 hover:border-blue-400/60 rounded-2xl transition-all cursor-pointer group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg text-white group-hover:text-blue-400 transition-colors">
              {lang === 'tr' ? 'Harita Krokileri' : 'Map Blueprints'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'tr'
                ? '10x10 taktiksel harita planları, çalı kümeleri ve hedef noktaları.'
                : 'Interactive 10x10 tactical grid layouts detailing obstacles, bush clusters, and objectives.'}
            </p>
          </div>

          <div
            onClick={() => onSelectTab('brawlers')}
            className="p-5 bg-[#121924] hover:bg-[#172130] border border-slate-800 hover:border-purple-400/60 rounded-2xl transition-all cursor-pointer group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-110 transition-transform">
              <Swords className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg text-white group-hover:text-purple-400 transition-colors">
              {lang === 'tr' ? 'Savaşçı Ansiklopedisi' : 'Brawler Encyclopedia'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'tr'
                ? '1-11 seviye özelliği kaydırıcısı, yıldız güçleri, aksesuarlar ve takım sinerjileri.'
                : 'Power 1-11 stat sliders, star powers, gadgets, and synergistic team compositions.'}
            </p>
          </div>

          <div
            onClick={() => onSelectTab('leaderboards')}
            className="p-5 bg-[#121924] hover:bg-[#172130] border border-slate-800 hover:border-emerald-400/60 rounded-2xl transition-all cursor-pointer group shadow-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg text-white group-hover:text-emerald-400 transition-colors">
              {lang === 'tr' ? 'Dünya Lider Tablosu' : 'World Leaderboards'}
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'tr'
                ? 'Dünya ve ülke geneli en yüksek kupalı oyuncular ve espor kulüpleri.'
                : 'Global and country rankings for top trophy players and premier esports clubs.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
