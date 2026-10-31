import React from 'react';
import { Rarity } from '../types/brawl';
import { RARITY_COLORS } from '../utils/rarityColors';

interface BrawlerAvatarProps {
  id?: string;
  name: string;
  rarity?: Rarity;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showBorder?: boolean;
  power?: number;
  className?: string;
}

// Characteristic color schemes and emojis/symbols for each brawler
const BRAWLER_VISUALS: Record<string, { bg: string; color: string; initial: string; symbol: string }> = {
  shelly: { bg: 'from-purple-600 to-indigo-800', color: '#c084fc', initial: 'SH', symbol: '💥' },
  colt: { bg: 'from-amber-500 to-orange-700', color: '#f59e0b', initial: 'CO', symbol: '🔫' },
  piper: { bg: 'from-pink-500 to-rose-700', color: '#fb7185', initial: 'PI', symbol: '☂️' },
  fang: { bg: 'from-cyan-500 to-blue-800', color: '#38bdf8', initial: 'FA', symbol: '👟' },
  cordelius: { bg: 'from-violet-600 to-purple-950', color: '#a855f7', initial: 'CO', symbol: '🍄' },
  spike: { bg: 'from-emerald-500 to-green-800', color: '#34d399', initial: 'SP', symbol: '🌵' },
  melodie: { bg: 'from-fuchsia-500 to-pink-800', color: '#e879f9', initial: 'ME', symbol: '🎵' },
  draco: { bg: 'from-red-600 to-amber-900', color: '#f87171', initial: 'DR', symbol: '🎸' },
  kit: { bg: 'from-amber-400 to-yellow-600', color: '#facc15', initial: 'KI', symbol: '🐱' },
  kenji: { bg: 'from-rose-600 to-red-950', color: '#fb7185', initial: 'KE', symbol: '🍣' },
  clancy: { bg: 'from-red-500 to-orange-800', color: '#f97316', initial: 'CL', symbol: '🦞' },
  moe: { bg: 'from-stone-600 to-amber-900', color: '#d6d3d1', initial: 'MO', symbol: '⛏️' },
  mortis: { bg: 'from-indigo-800 to-purple-950', color: '#818cf8', initial: 'MO', symbol: '🦇' },
  leon: { bg: 'from-teal-500 to-emerald-900', color: '#2dd4bf', initial: 'LE', symbol: '🦎' },
  crow: { bg: 'from-slate-700 to-zinc-950', color: '#94a3b8', initial: 'CR', symbol: '🦅' },
  frank: { bg: 'from-blue-600 to-indigo-950', color: '#60a5fa', initial: 'FR', symbol: '🔨' },
  edgar: { bg: 'from-neutral-800 to-rose-950', color: '#f43f5e', initial: 'ED', symbol: '🧣' },
  poco: { bg: 'from-yellow-500 to-amber-800', color: '#fbbf24', initial: 'PO', symbol: '🪕' },
  surge: { bg: 'from-red-500 to-blue-700', color: '#ef4444', initial: 'SU', symbol: '⚡' },
  dynamike: { bg: 'from-amber-600 to-red-700', color: '#fb923c', initial: 'DY', symbol: '🧨' },
  angelo: { bg: 'from-lime-500 to-emerald-800', color: '#a3e635', initial: 'AN', symbol: '🏹' },
  berry: { bg: 'from-pink-400 to-purple-700', color: '#f472b6', initial: 'BE', symbol: '🍦' },
  lily: { bg: 'from-emerald-700 to-violet-950', color: '#34d399', initial: 'LI', symbol: '🌱' },
  chester: { bg: 'from-amber-500 to-fuchsia-800', color: '#fbbf24', initial: 'CH', symbol: '🃏' },
};

export const BrawlerAvatar: React.FC<BrawlerAvatarProps> = ({
  id,
  name,
  rarity = 'Common',
  size = 'md',
  showBorder = true,
  power,
  className = '',
}) => {
  const brawlerKey = (id || name || '').toLowerCase().replace(/[^a-z]/g, '');
  const visual = BRAWLER_VISUALS[brawlerKey] || {
    bg: 'from-slate-600 to-slate-800',
    color: '#38bdf8',
    initial: name.slice(0, 2).toUpperCase(),
    symbol: '⭐',
  };

  const rarityConfig = RARITY_COLORS[rarity];

  const sizeClasses = {
    xs: 'w-7 h-7 text-[10px]',
    sm: 'w-9 h-9 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-20 h-20 text-lg',
  }[size];

  return (
    <div className={`relative inline-flex flex-shrink-0 items-center justify-center font-bold select-none ${className}`}>
      <div
        className={`${sizeClasses} rounded-xl bg-gradient-to-br ${visual.bg} flex items-center justify-center overflow-hidden shadow-md ${
          showBorder ? `border-2 ${rarityConfig.border}` : ''
        }`}
        style={{
          boxShadow: showBorder ? `0 0 12px ${rarityConfig.glow}` : undefined,
        }}
      >
        <span className="font-heading tracking-wider text-white text-stroke-sm drop-shadow-md">
          {visual.initial}
        </span>
        <span className="absolute bottom-0 right-0 text-[10px] opacity-80 pointer-events-none p-0.5">
          {visual.symbol}
        </span>
      </div>

      {power !== undefined && (
        <div className="absolute -bottom-1 -right-1 px-1 py-0.2 bg-gradient-to-r from-red-600 to-amber-500 border border-amber-300 rounded text-[9px] font-heading text-white shadow-sm">
          P{power}
        </div>
      )}
    </div>
  );
};
