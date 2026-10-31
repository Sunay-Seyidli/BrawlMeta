import React, { useState, useEffect } from 'react';
import { EventSlot } from '../types/brawl';
import { MODE_CONFIG } from '../utils/rarityColors';
import { BrawlerAvatar } from './BrawlerAvatar';
import { Clock, Zap, ChevronRight, ShieldAlert } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface EventCardProps {
  event: EventSlot;
  onSelectMap?: (mapId: string) => void;
  lang?: Language;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelectMap, lang = 'en' }) => {
  const [secondsLeft, setSecondsLeft] = useState(event.durationLeftSeconds);
  const t = TRANSLATIONS[lang].events;

  // Active countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : event.totalDurationSeconds));
    }, 1000);
    return () => clearInterval(interval);
  }, [event.totalDurationSeconds]);

  const formatTimer = (totalSecs: number) => {
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hours}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const modeConfig = MODE_CONFIG[event.mode] || {
    color: '#3b82f6',
    iconBg: 'bg-blue-600',
    borderColor: 'border-blue-500',
    objective: 'Battle for victory!',
  };

  const progressPercent = Math.min(100, Math.max(0, (secondsLeft / event.totalDurationSeconds) * 100));

  return (
    <div className="relative group bg-[#131B26] hover:bg-[#182332] border border-slate-800 hover:border-slate-700 transition-all duration-300 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between">
      {/* Top Banner with Game Mode glow */}
      <div className={`p-4 bg-gradient-to-r ${event.bannerColor} border-b border-slate-800/80 relative`}>
        <div className="flex items-center justify-between gap-2">
          {/* Mode Pill */}
          <div className="flex items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-heading tracking-wider uppercase text-white shadow-sm flex items-center gap-1.5"
              style={{ backgroundColor: modeConfig.color }}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              {event.mode}
            </span>
            {event.status === 'live' ? (
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                {t.liveBadge}
              </span>
            ) : (
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">
                {t.upcomingBadge}
              </span>
            )}
          </div>

          {/* Modifier if active */}
          {event.modifier && (
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-black/40 px-2 py-0.5 rounded-md border border-amber-500/30">
              <ShieldAlert className="w-3 h-3 text-amber-400" />
              <span className="hidden sm:inline">{event.modifier}</span>
            </div>
          )}
        </div>

        {/* Map Name & Environment */}
        <div className="mt-2.5">
          <h3 className="text-xl font-heading text-white tracking-wide group-hover:text-amber-400 transition-colors">
            {event.mapName}
          </h3>
          <p className="text-xs text-slate-300 font-medium">{t.environment} {event.environment}</p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* Top Brawlers for this Map */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
            <span>{t.bestBrawlers}</span>
            <span className="text-[11px] text-slate-500">{t.byWinRate}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {event.topBrawlers.map((b) => (
              <div
                key={b.brawlerId}
                className="bg-[#0b1017] border border-slate-800/80 hover:border-slate-700 p-2 rounded-xl flex items-center gap-2 transition-transform hover:-translate-y-0.5"
              >
                <BrawlerAvatar id={b.brawlerId} name={b.name} size="sm" showBorder={false} />
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-200 truncate">{b.name}</div>
                  <div className="text-[11px] font-heading text-emerald-400">{b.winRate}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown & Action */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{event.status === 'live' ? t.endsIn : t.startsIn}</span>
            <span className="font-bold text-amber-400">{formatTimer(secondsLeft)}</span>
          </div>

          {onSelectMap && (
            <button
              onClick={() => onSelectMap(event.mapId)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-amber-500 hover:text-black text-slate-200 text-xs font-heading rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>{t.viewGuide}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden mt-2">
          <div
            className="bg-gradient-to-r from-amber-500 to-rose-500 h-full transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};
