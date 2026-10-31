import React, { useState } from 'react';
import { PlayerProfile, PlayerBrawlerStats } from '../types/brawl';
import { BRAWLERS } from '../data/brawlersData';
import { BrawlerAvatar } from './BrawlerAvatar';
import { getRankBadge, MODE_CONFIG } from '../utils/rarityColors';
import { Language, TRANSLATIONS } from '../i18n/translations';
import {
  Trophy,
  Award,
  Crown,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  Flame,
  Swords,
  Timer,
  Clock,
  Sparkles,
  Users,
  Search,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

interface PlayerProfileViewProps {
  profile: PlayerProfile;
  isLoading?: boolean;
  onSelectBrawler?: (brawlerId: string) => void;
  onSelectMap?: (mapName: string) => void;
  onSearchTag?: (tag: string) => void;
  lang?: Language;
}

export const PlayerProfileView: React.FC<PlayerProfileViewProps> = ({
  profile,
  isLoading = false,
  onSelectBrawler,
  onSelectMap,
  onSearchTag,
  lang = 'en',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'brawlers' | 'battles'>('brawlers');
  const [brawlerSearch, setBrawlerSearch] = useState('');
  const [sortBy, setSortBy] = useState<'trophies' | 'highestTrophies' | 'power' | 'winRate' | 'rank'>('trophies');
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(profile.battleLog[0]?.id || null);

  const t = TRANSLATIONS[lang].profile;

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto p-4 space-y-6 animate-pulse">
        {/* Header Skeleton */}
        <div className="h-48 bg-[#131b26] rounded-3xl border border-slate-800" />
        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-[#131b26] rounded-2xl border border-slate-800" />
          ))}
        </div>
        {/* Content Skeleton */}
        <div className="h-96 bg-[#131b26] rounded-3xl border border-slate-800" />
      </div>
    );
  }

  // Filter and sort player brawlers
  const filteredBrawlers = profile.brawlers
    .filter((b) => b.name.toLowerCase().includes(brawlerSearch.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'trophies') return b.trophies - a.trophies;
      if (sortBy === 'highestTrophies') return b.highestTrophies - a.highestTrophies;
      if (sortBy === 'power') return b.power - a.power;
      if (sortBy === 'winRate') return b.winRate - a.winRate;
      if (sortBy === 'rank') return b.rank - a.rank;
      return 0;
    });

  const toggleMatch = (id: string) => {
    setExpandedMatchId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* 1. PROFILE HEADER CARD */}
      <div className="relative bg-[#111723] border-2 border-slate-700/80 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-48 bg-gradient-to-l from-amber-500/10 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 relative z-10">
          {/* Avatar & Identifiers */}
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            {/* Animated Profile Frame */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-1 shadow-lg animate-gradient">
                <div className="w-full h-full bg-[#0d121a] rounded-[14px] flex items-center justify-center overflow-hidden">
                  <BrawlerAvatar id={profile.avatarId} name={profile.name} size="lg" showBorder={false} />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-red-600 to-amber-500 text-white font-heading text-xs px-2 py-0.5 rounded-full border border-amber-300 shadow">
                {t.level} {profile.expLevel}
              </div>
            </div>

            {/* Name, Tag, Club */}
            <div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2
                  className="text-2xl sm:text-3xl font-heading tracking-wide uppercase drop-shadow"
                  style={{ color: profile.nameColor }}
                >
                  {profile.name}
                </h2>
                <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 font-mono text-xs font-bold rounded-lg border border-slate-700">
                  {profile.tag}
                </span>
              </div>

              {/* Club Info */}
              {profile.club ? (
                <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#182130] rounded-lg border border-slate-700/80">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span className="font-heading text-white">{profile.club.name}</span>
                    <span className="text-[10px] text-amber-400 font-bold px-1.5 py-0.2 bg-amber-950/70 rounded">
                      {profile.club.role}
                    </span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="font-mono text-slate-400">{profile.club.memberCount}/30 {t.members}</span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-500 italic">{t.noClub}</div>
              )}

              {/* Ranked Tier Badge */}
              <div className="mt-2.5 flex items-center justify-center sm:justify-start gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-900 to-indigo-900 text-purple-200 border border-purple-500/50 rounded-lg text-xs font-heading flex items-center gap-1.5 shadow-sm">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  {profile.rankedTier} ({profile.rankedScore} pts)
                </span>
              </div>
            </div>
          </div>

          {/* Trophy & Win Rate Visual Gauge */}
          <div className="flex flex-wrap items-center justify-center gap-4 w-full lg:w-auto">
            {/* Current Trophies Badge */}
            <div className="bg-[#151d2a] border border-slate-700/80 p-4 rounded-2xl flex items-center gap-3.5 min-w-[170px] shadow-md">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Trophy className="w-6 h-6 fill-amber-400 text-amber-500" />
              </div>
              <div>
                <div className="text-[11px] text-slate-400 uppercase font-heading">{t.currentTrophies}</div>
                <div className="text-2xl font-heading text-white tracking-wider">
                  {profile.trophies.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {t.highest} {profile.highestTrophies.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Win/Loss Ratio Visual Gauge */}
            <div className="bg-[#151d2a] border border-slate-700/80 p-4 rounded-2xl min-w-[170px] shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[11px] text-slate-400 uppercase font-heading">{t.winRate}</span>
                <span className="text-sm font-heading text-emerald-400">{profile.winRatePercentage}%</span>
              </div>
              {/* Circular Gauge / Segmented Bar */}
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden flex">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full"
                  style={{ width: `${profile.winRatePercentage}%` }}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{ width: `${100 - profile.winRatePercentage}%` }}
                />
              </div>
              <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>{profile.winRatePercentage}% {t.win}</span>
                <span>{(100 - profile.winRatePercentage).toFixed(1)}% {t.loss}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ANALYTICAL STATS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#111722] border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow">
          <div className="flex items-center gap-1.5 text-xs text-purple-400 font-heading">
            <Swords className="w-3.5 h-3.5" />
            <span>{t.victories3v3}</span>
          </div>
          <div className="text-xl font-heading text-white mt-1">
            {profile.victories3v3.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">{t.competitiveWins}</div>
        </div>

        <div className="bg-[#111722] border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-heading">
            <Crown className="w-3.5 h-3.5" />
            <span>{t.victoriesSolo}</span>
          </div>
          <div className="text-xl font-heading text-white mt-1">
            {profile.soloVictories.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">{t.firstPlaceWins}</div>
        </div>

        <div className="bg-[#111722] border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow">
          <div className="flex items-center gap-1.5 text-xs text-blue-400 font-heading">
            <Users className="w-3.5 h-3.5" />
            <span>{t.victoriesDuo}</span>
          </div>
          <div className="text-xl font-heading text-white mt-1">
            {profile.duoVictories.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">{t.partnerWins}</div>
        </div>

        <div className="bg-[#111722] border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow">
          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-heading">
            <Timer className="w-3.5 h-3.5" />
            <span>{t.roboRumble}</span>
          </div>
          <div className="text-sm font-heading text-white mt-1 truncate">
            {profile.bestRoboRumbleTime}
          </div>
          <div className="text-[10px] text-slate-500">{t.survivalRecord}</div>
        </div>

        <div className="bg-[#111722] border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow">
          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-heading">
            <Flame className="w-3.5 h-3.5" />
            <span>{t.bossFight}</span>
          </div>
          <div className="text-sm font-heading text-white mt-1 truncate">
            {profile.bestBossFightLevel}
          </div>
          <div className="text-[10px] text-slate-500">{t.highestDefeated}</div>
        </div>

        <div className="bg-[#111722] border border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between hover:border-slate-700 transition-colors shadow">
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.experience}</span>
          </div>
          <div className="text-base font-heading text-white mt-1">
            {(profile.expPoints / 1000).toFixed(0)}k XP
          </div>
          <div className="text-[10px] text-slate-500">{t.accountProgress}</div>
        </div>
      </div>

      {/* 3. TABS: Brawlers Dashboard vs Battle Log */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('brawlers')}
            className={`px-4 py-2 rounded-xl text-xs font-heading uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'brawlers'
                ? 'bg-amber-500 text-black shadow-lg font-black'
                : 'bg-[#131b26] text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" />
            {t.brawlersDashboard} ({profile.brawlers.length})
          </button>
          <button
            onClick={() => setActiveSubTab('battles')}
            className={`px-4 py-2 rounded-xl text-xs font-heading uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'battles'
                ? 'bg-amber-500 text-black shadow-lg font-black'
                : 'bg-[#131b26] text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            {t.battleLogTitle}
          </button>
        </div>
      </div>

      {/* 4. TAB 1: BRAWLERS DASHBOARD */}
      {activeSubTab === 'brawlers' && (
        <div className="space-y-4">
          {/* Dashboard Filters & Sort Bar */}
          <div className="bg-[#111722] p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={t.searchBrawler}
                value={brawlerSearch}
                onChange={(e) => setBrawlerSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#0c1017] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Multi-Sorting System */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5" />
                {t.sortBy}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#0c1017] border border-slate-700 text-xs text-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-amber-400 font-medium cursor-pointer"
              >
                <option value="trophies">{t.sortTrophies}</option>
                <option value="highestTrophies">{t.sortHighest}</option>
                <option value="winRate">{t.sortWinRate}</option>
                <option value="rank">{t.sortRank}</option>
                <option value="power">{t.sortPower}</option>
              </select>
            </div>
          </div>

          {/* Brawlers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {filteredBrawlers.map((brawler) => {
              const fullBrawler = BRAWLERS.find((b) => b.id === brawler.id) || BRAWLERS[0];
              const rankInfo = getRankBadge(brawler.rank);

              return (
                <div
                  key={brawler.id}
                  onClick={() => onSelectBrawler?.(brawler.id)}
                  className="bg-[#121924] hover:bg-[#172130] border border-slate-800 hover:border-amber-400/50 rounded-2xl p-4 transition-all duration-200 shadow-md flex flex-col justify-between cursor-pointer group hover:-translate-y-1"
                >
                  {/* Top info */}
                  <div className="flex items-start gap-3">
                    <BrawlerAvatar
                      id={brawler.id}
                      name={brawler.name}
                      rarity={fullBrawler.rarity}
                      size="md"
                      power={brawler.power}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-heading text-base text-white group-hover:text-amber-400 transition-colors truncate">
                          {brawler.name}
                        </h4>
                        <span className="text-[11px] font-heading text-emerald-400">
                          {brawler.winRate}% WR
                        </span>
                      </div>

                      {/* Rank badge */}
                      <div className="mt-0.5 flex items-center gap-1.5">
                        <span
                          className={`px-1.5 py-0.2 rounded text-[10px] font-heading text-white ${rankInfo.badgeColor}`}
                        >
                          R{brawler.rank}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">{rankInfo.tierName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trophies Bar */}
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400 flex items-center gap-1 font-mono">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <strong className="text-white font-heading">{brawler.trophies}</strong>
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {t.highest} {brawler.highestTrophies}
                      </span>
                    </div>

                    {/* Build badges: SP, Gadget, Gears, Hypercharge */}
                    <div className="flex items-center gap-1.5 mt-2">
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-950/70 text-amber-300 border border-amber-600/40 truncate max-w-[85px]"
                        title={brawler.starPower}
                      >
                        ⭐ {brawler.starPower}
                      </span>
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-950/70 text-emerald-300 border border-emerald-600/40 truncate max-w-[85px]"
                        title={brawler.gadget}
                      >
                        ⚡ {brawler.gadget}
                      </span>
                      {brawler.hasHypercharge && (
                        <span className="px-1 py-0.5 rounded text-[9px] font-black bg-purple-900 text-purple-200 border border-purple-500 shadow-sm">
                          HC
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB 2: DETAILED BATTLE LOG (25 Matches with Expandable 3v3 breakdown) */}
      {activeSubTab === 'battles' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-medium">
            <span>{t.last25Matches}</span>
            <span className="hidden sm:inline">{t.clickToInspect}</span>
          </div>

          {profile.battleLog.map((match) => {
            const isExpanded = expandedMatchId === match.id;
            const modeConfig = MODE_CONFIG[match.mode] || { color: '#3b82f6', iconBg: 'bg-blue-600' };

            const isVictory = match.result === 'victory';
            const isDefeat = match.result === 'defeat';

            return (
              <div
                key={match.id}
                className="bg-[#121924] border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-md"
              >
                {/* Match Row Bar */}
                <div
                  onClick={() => toggleMatch(match.id)}
                  className="p-3.5 sm:p-4 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 cursor-pointer hover:bg-[#16202e] transition-colors"
                >
                  {/* Left: Result pill & Mode */}
                  <div className="flex items-center gap-3">
                    {/* Result Badge */}
                    <div
                      className={`w-20 sm:w-24 py-1.5 rounded-xl font-heading text-xs uppercase text-center shadow-sm ${
                        isVictory
                          ? 'bg-emerald-500 text-black font-black'
                          : isDefeat
                          ? 'bg-rose-600 text-white font-bold'
                          : 'bg-slate-600 text-white font-bold'
                      }`}
                    >
                      {isVictory ? t.victory : isDefeat ? t.defeat : t.draw}
                      <span className="block text-[10px] font-mono opacity-90">
                        {match.trophyChange > 0 ? `+${match.trophyChange}` : match.trophyChange}
                      </span>
                    </div>

                    {/* Mode & Map */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-heading uppercase text-white shadow-xs"
                          style={{ backgroundColor: modeConfig.color }}
                        >
                          {match.mode}
                        </span>
                        <span className="font-heading text-sm sm:text-base text-white">
                          {match.map}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                        <span>{match.battleTime}</span>
                        <span>•</span>
                        <span>{match.durationSeconds}s {t.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Star player preview & Expand Arrow */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {/* Star Player Badge */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#1a2333] border border-amber-500/30 rounded-xl">
                      <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <div className="text-left">
                        <span className="text-[10px] text-amber-400 font-heading block leading-none">
                          {t.starPlayer}
                        </span>
                        <span className="text-xs font-bold text-white leading-none">
                          {match.starPlayer.name}
                        </span>
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded 3v3 Team Breakdown Layout */}
                {isExpanded && (
                  <div className="p-4 bg-[#0a0e15] border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-150">
                    {/* Team 1 (Player's Team) */}
                    <div className="p-3 bg-[#111722] border border-blue-900/40 rounded-xl">
                      <div className="flex items-center justify-between text-xs font-heading uppercase text-blue-400 mb-2 pb-1 border-b border-slate-800">
                        <span>{t.yourTeam}</span>
                        <span>{t.trophies}</span>
                      </div>
                      <div className="space-y-2">
                        {match.teams[0].map((member, i) => (
                          <div
                            key={i}
                            className={`flex items-center justify-between p-2 rounded-lg ${
                              member.tag === profile.tag
                                ? 'bg-blue-950/40 border border-blue-500/40'
                                : 'bg-[#151c27]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <BrawlerAvatar
                                id={member.brawlerId}
                                name={member.brawler}
                                size="xs"
                                showBorder={false}
                              />
                              <div>
                                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                  <span>{member.name}</span>
                                  {member.isStarPlayer && (
                                    <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  {member.brawler} • P{member.power}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                              <Trophy className="w-3 h-3" />
                              {member.trophies}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Team 2 (Opponent Team) */}
                    <div className="p-3 bg-[#111722] border border-rose-900/40 rounded-xl">
                      <div className="flex items-center justify-between text-xs font-heading uppercase text-rose-400 mb-2 pb-1 border-b border-slate-800">
                        <span>{t.enemyTeam}</span>
                        <span>{t.trophies}</span>
                      </div>
                      <div className="space-y-2">
                        {match.teams[1].map((member, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-2 rounded-lg bg-[#151c27]"
                          >
                            <div className="flex items-center gap-2.5">
                              <BrawlerAvatar
                                id={member.brawlerId}
                                name={member.brawler}
                                size="xs"
                                showBorder={false}
                              />
                              <div>
                                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                  <span>{member.name}</span>
                                  {member.isStarPlayer && (
                                    <Crown className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  {member.brawler} • P{member.power}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                              <Trophy className="w-3 h-3" />
                              {member.trophies}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
