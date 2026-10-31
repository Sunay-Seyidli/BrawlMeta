import React, { useState } from 'react';
import { LEADERBOARD_PLAYERS, LEADERBOARD_CLUBS, COUNTRIES } from '../data/leaderboardsData';
import { LeaderboardPlayer, LeaderboardClub } from '../types/brawl';
import { BrawlerAvatar } from './BrawlerAvatar';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Trophy, Shield, Users, Crown, Flame, Search, ArrowRight, ExternalLink } from 'lucide-react';

interface LeaderboardsViewProps {
  onSearchTag: (tag: string, type: 'player' | 'club') => void;
  onSelectBrawler?: (brawlerId: string) => void;
  lang?: Language;
}

export const LeaderboardsView: React.FC<LeaderboardsViewProps> = ({
  onSearchTag,
  onSelectBrawler,
  lang = 'en',
}) => {
  const [boardType, setBoardType] = useState<'players' | 'clubs'>('players');
  const [selectedCountry, setSelectedCountry] = useState('GLOBAL');
  const [searchFilter, setSearchFilter] = useState('');

  const t = TRANSLATIONS[lang].leaderboards;

  const filteredPlayers = LEADERBOARD_PLAYERS.filter((p) => {
    const matchesCountry = selectedCountry === 'GLOBAL' || p.country === selectedCountry;
    const matchesSearch = p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      p.tag.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (p.clubName && p.clubName.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCountry && matchesSearch;
  });

  const filteredClubs = LEADERBOARD_CLUBS.filter((c) => {
    return c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      c.tag.toLowerCase().includes(searchFilter.toLowerCase());
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-[#111722] border-2 border-slate-700/80 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
              <Crown className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading text-white tracking-wide uppercase">
              {t.title} <span className="text-amber-400">{t.highlight}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Quick search input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#0a0e14] border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        {/* Tab Switcher: Players vs Clubs */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-800 pt-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBoardType('players')}
              className={`px-4 py-2 rounded-xl text-xs font-heading uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                boardType === 'players'
                  ? 'bg-amber-500 text-black font-black shadow-md'
                  : 'bg-[#182130] text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Trophy className="w-4 h-4" />
              {t.topPlayers}
            </button>
            <button
              onClick={() => setBoardType('clubs')}
              className={`px-4 py-2 rounded-xl text-xs font-heading uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                boardType === 'clubs'
                  ? 'bg-purple-600 text-white font-black shadow-md'
                  : 'bg-[#182130] text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Shield className="w-4 h-4" />
              {t.topClubs}
            </button>
          </div>

          {/* Country Filter (when players tab active) */}
          {boardType === 'players' && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {COUNTRIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => setSelectedCountry(c.code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    selectedCountry === c.code
                      ? 'bg-slate-700 text-white font-bold border border-amber-400/50'
                      : 'bg-[#151c27] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{c.flag}</span>
                  <span>{c.code === 'GLOBAL' && lang === 'tr' ? 'Küresel' : c.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Players Leaderboard Table */}
      {boardType === 'players' && (
        <div className="bg-[#111722] border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0c1017] text-slate-400 font-heading uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4 w-16 text-center">{t.rank}</th>
                  <th className="p-4">{t.player}</th>
                  <th className="p-4">{t.club}</th>
                  <th className="p-4">{t.favoritePick}</th>
                  <th className="p-4">{t.streak}</th>
                  <th className="p-4 text-right">{t.trophies}</th>
                  <th className="p-4 text-right">{t.inspect}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredPlayers.map((player) => (
                  <tr
                    key={player.tag}
                    onClick={() => onSearchTag(player.tag, 'player')}
                    className="hover:bg-[#151c28] transition-colors cursor-pointer group"
                  >
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block w-7 h-7 leading-7 rounded-full font-heading text-xs font-black ${
                          player.rank === 1
                            ? 'bg-amber-400 text-black shadow-md'
                            : player.rank === 2
                            ? 'bg-slate-300 text-black'
                            : player.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {player.rank}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm text-white group-hover:text-amber-400 transition-colors">
                          {player.name}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded">
                          {player.tag}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300 font-medium">
                      {player.clubName ? (
                        <span className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5 text-purple-400" />
                          {player.clubName}
                        </span>
                      ) : (
                        <span className="text-slate-600 italic">No Club</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <BrawlerAvatar
                          name={player.brawlerFavorite}
                          size="xs"
                          showBorder={false}
                        />
                        <span className="text-slate-200 font-medium">{player.brawlerFavorite}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="flex items-center gap-1 text-rose-400 font-heading">
                        <Flame className="w-3.5 h-3.5 fill-rose-500" />
                        {player.winStreak} {lang === 'tr' ? 'Zafer Serisi' : 'Win Streak'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-heading text-sm text-amber-400 font-bold">
                        <Trophy className="w-4 h-4 fill-amber-400" />
                        {player.trophies.toLocaleString()}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <button className="px-3 py-1 bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-heading rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer">
                        <span>{lang === 'tr' ? 'Profil' : 'Profile'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Clubs Leaderboard Table */}
      {boardType === 'clubs' && (
        <div className="bg-[#111722] border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0c1017] text-slate-400 font-heading uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4 w-16 text-center">{t.rank}</th>
                  <th className="p-4">{t.clubName}</th>
                  <th className="p-4">{t.tagline}</th>
                  <th className="p-4">{t.members}</th>
                  <th className="p-4">{t.type}</th>
                  <th className="p-4 text-right">{t.clubTrophies}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredClubs.map((club) => (
                  <tr
                    key={club.tag}
                    className="hover:bg-[#151c28] transition-colors"
                  >
                    <td className="p-4 text-center">
                      <span
                        className={`inline-block w-7 h-7 leading-7 rounded-full font-heading text-xs font-black ${
                          club.rank === 1
                            ? 'bg-amber-400 text-black shadow-md'
                            : club.rank === 2
                            ? 'bg-slate-300 text-black'
                            : club.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {club.rank}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-900 border border-purple-500 flex items-center justify-center text-purple-300 font-bold">
                          🛡️
                        </div>
                        <div>
                          <div className="font-heading text-sm text-white">{club.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{club.tag}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-300 max-w-xs truncate">
                      {club.tagline}
                    </td>
                    <td className="p-4 font-mono text-slate-300">
                      {club.members}/30
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                        {club.type} ({lang === 'tr' ? 'Gereken:' : 'Req:'} {club.requiredTrophies.toLocaleString()})
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5 font-heading text-sm text-purple-400 font-bold">
                        <Trophy className="w-4 h-4 fill-purple-400" />
                        {club.trophies.toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
