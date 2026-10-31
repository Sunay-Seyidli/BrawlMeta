import React, { useState } from 'react';
import { GameModeType, GameMap, EventSlot } from '../types/brawl';
import { MAPS_DATA } from '../data/mapsData';
import { INITIAL_EVENT_SLOTS, UPCOMING_EVENT_SLOTS } from '../data/eventsData';
import { EventCard } from './EventCard';
import { MapBlueprint } from './MapBlueprint';
import { MODE_CONFIG } from '../utils/rarityColors';
import { Language, TRANSLATIONS } from '../i18n/translations';
import { Sparkles, Clock, Compass, Zap, Trophy, ChevronRight } from 'lucide-react';

interface MapsViewProps {
  onSelectMap: (mapId: string) => void;
  onSelectBrawler: (brawlerId: string) => void;
  lang?: Language;
}

export const MapsView: React.FC<MapsViewProps> = ({ onSelectMap, onSelectBrawler, lang = 'en' }) => {
  const [selectedModeFilter, setSelectedModeFilter] = useState<GameModeType | 'All'>('All');
  const [rotationTab, setRotationTab] = useState<'live' | 'upcoming'>('live');

  const t = TRANSLATIONS[lang].maps;
  const tEvents = TRANSLATIONS[lang].events;

  const ALL_MODES: Array<GameModeType | 'All'> = [
    'All',
    'Gem Grab',
    'Brawl Ball',
    'Knockout',
    'Heist',
    'Hot Zone',
    'Solo Showdown',
  ];

  const filteredMaps = MAPS_DATA.filter(
    (m) => selectedModeFilter === 'All' || m.mode === selectedModeFilter
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* 1. Header Section */}
      <div className="bg-[#111722] border-2 border-slate-700/80 rounded-3xl p-6 shadow-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-heading text-white tracking-wide uppercase">
          {t.title} <span className="text-amber-400">{t.highlight}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-medium">
          {t.subtitle}
        </p>

        {/* Live vs Upcoming Switcher */}
        <div className="mt-6 flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setRotationTab('live')}
            className={`px-4 py-2 rounded-xl text-xs font-heading uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              rotationTab === 'live'
                ? 'bg-amber-500 text-black font-black shadow-md'
                : 'bg-[#182130] text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Clock className="w-4 h-4 text-emerald-500" />
            {tEvents.activeTab}
          </button>
          <button
            onClick={() => setRotationTab('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-heading uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              rotationTab === 'upcoming'
                ? 'bg-amber-500 text-black font-black shadow-md'
                : 'bg-[#182130] text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            {tEvents.upcomingTab}
          </button>
        </div>

        {/* Event Cards Grid */}
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(rotationTab === 'live' ? INITIAL_EVENT_SLOTS : UPCOMING_EVENT_SLOTS).map((slot) => (
            <EventCard key={slot.slotId} event={slot} onSelectMap={onSelectMap} lang={lang} />
          ))}
        </div>
      </div>

      {/* 2. Comprehensive Map Blueprint Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-2xl font-heading text-white uppercase tracking-wide">
              {t.allBlueprints}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {t.directorySubtitle}
            </p>
          </div>

          {/* Mode Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {ALL_MODES.map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedModeFilter(mode)}
                className={`px-3 py-1 rounded-xl text-xs font-heading uppercase transition-all cursor-pointer ${
                  selectedModeFilter === mode
                    ? 'bg-amber-500 text-black font-black'
                    : 'bg-[#111722] text-slate-300 hover:bg-slate-700 border border-slate-700/60'
                }`}
              >
                {mode === 'All' && lang === 'tr' ? 'Tümü' : mode}
              </button>
            ))}
          </div>
        </div>

        {/* Maps Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMaps.map((map) => {
            const modeConfig = MODE_CONFIG[map.mode] || { color: '#3b82f6', iconBg: 'bg-blue-600' };

            return (
              <div
                key={map.id}
                onClick={() => onSelectMap(map.id)}
                className="bg-[#121924] hover:bg-[#182333] border border-slate-800 hover:border-amber-400/80 rounded-2xl p-4 transition-all duration-200 cursor-pointer group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-heading uppercase text-white shadow-xs"
                      style={{ backgroundColor: modeConfig.color }}
                    >
                      {map.mode}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {map.environment}
                    </span>
                  </div>

                  <h4 className="font-heading text-lg text-white group-hover:text-amber-400 transition-colors">
                    {map.name}
                  </h4>
                  <p className="text-xs text-slate-300 line-clamp-2 mt-1">{map.description}</p>

                  {/* Compact mini-grid preview */}
                  <div className="mt-3 bg-[#0a0f16] border border-slate-800 rounded-xl p-2 flex items-center justify-center">
                    <div className="grid grid-cols-10 gap-0.5 w-36 h-36">
                      {map.layoutGrid.map((row, r) =>
                        row.map((cell, c) => (
                          <div
                            key={`${r}-${c}`}
                            className={`w-full h-full rounded-xs ${
                              cell === 1
                                ? 'bg-slate-600'
                                : cell === 2
                                ? 'bg-emerald-700'
                                : cell === 3
                                ? 'bg-cyan-600'
                                : cell === 4
                                ? 'bg-amber-400'
                                : 'bg-slate-900'
                            }`}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer preview: #1 Brawler */}
                <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Trophy className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {lang === 'tr' ? '1. Tercih:' : '#1 Pick:'}{' '}
                      <strong className="text-slate-200 font-heading">{map.topBrawlers[0]?.name}</strong>
                    </span>
                  </div>
                  <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">
                    {lang === 'tr' ? 'Rehber →' : 'Guide →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
