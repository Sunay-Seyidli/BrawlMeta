import { Rarity, GameModeType } from '../types/brawl';

export const RARITY_COLORS: Record<Rarity, {
  bg: string;
  border: string;
  text: string;
  glow: string;
  badge: string;
}> = {
  'Common': {
    bg: 'bg-slate-700/80',
    border: 'border-slate-400',
    text: 'text-slate-300',
    glow: 'rgba(148, 163, 184, 0.4)',
    badge: '#94a3b8'
  },
  'Rare': {
    bg: 'bg-emerald-950/70',
    border: 'border-emerald-500',
    text: 'text-emerald-400',
    glow: 'rgba(16, 185, 129, 0.4)',
    badge: '#10b981'
  },
  'Super Rare': {
    bg: 'bg-blue-950/70',
    border: 'border-blue-500',
    text: 'text-blue-400',
    glow: 'rgba(59, 130, 246, 0.4)',
    badge: '#3b82f6'
  },
  'Epic': {
    bg: 'bg-purple-950/70',
    border: 'border-purple-500',
    text: 'text-purple-400',
    glow: 'rgba(168, 85, 247, 0.4)',
    badge: '#a855f7'
  },
  'Mythic': {
    bg: 'bg-rose-950/70',
    border: 'border-rose-500',
    text: 'text-rose-400',
    glow: 'rgba(244, 63, 94, 0.4)',
    badge: '#f43f5e'
  },
  'Legendary': {
    bg: 'bg-amber-950/70',
    border: 'border-amber-400',
    text: 'text-amber-400',
    glow: 'rgba(245, 158, 11, 0.5)',
    badge: '#f59e0b'
  }
};

export const MODE_CONFIG: Record<GameModeType, {
  color: string;
  iconBg: string;
  borderColor: string;
  objective: string;
}> = {
  'Gem Grab': {
    color: '#8b5cf6',
    iconBg: 'bg-purple-600',
    borderColor: 'border-purple-500',
    objective: 'Collect and hold 10 gems to trigger the countdown!'
  },
  'Brawl Ball': {
    color: '#3b82f6',
    iconBg: 'bg-blue-600',
    borderColor: 'border-blue-500',
    objective: 'Score 2 goals against the opposing team!'
  },
  'Solo Showdown': {
    color: '#10b981',
    iconBg: 'bg-emerald-600',
    borderColor: 'border-emerald-500',
    objective: 'Survive in a shrinking arena of poisonous gas!'
  },
  'Duo Showdown': {
    color: '#059669',
    iconBg: 'bg-teal-600',
    borderColor: 'border-teal-500',
    objective: 'Partner up and outlast 4 other duos to claim 1st place!'
  },
  'Knockout': {
    color: '#f97316',
    iconBg: 'bg-orange-600',
    borderColor: 'border-orange-500',
    objective: 'Eliminate the whole enemy team with no respawns!'
  },
  'Heist': {
    color: '#ef4444',
    iconBg: 'bg-red-600',
    borderColor: 'border-red-500',
    objective: 'Destroy the enemy safe while defending your own!'
  },
  'Bounty': {
    color: '#06b6d4',
    iconBg: 'bg-cyan-600',
    borderColor: 'border-cyan-500',
    objective: 'Collect stars by taking down enemies. Most stars wins!'
  },
  'Hot Zone': {
    color: '#e11d48',
    iconBg: 'bg-rose-600',
    borderColor: 'border-rose-500',
    objective: 'Control designated zones until your meter reaches 100%!'
  },
  'Wipeout': {
    color: '#d946ef',
    iconBg: 'bg-fuchsia-600',
    borderColor: 'border-fuchsia-500',
    objective: 'First team to achieve 10 eliminations wins the battle!'
  },
  'Duels': {
    color: '#eab308',
    iconBg: 'bg-yellow-600',
    borderColor: 'border-yellow-500',
    objective: 'Draft 3 brawlers in a 1v1 tactical showdown.'
  },
  'Robo Rumble': {
    color: '#6366f1',
    iconBg: 'bg-indigo-600',
    borderColor: 'border-indigo-500',
    objective: 'Defend the safe against increasing waves of bandit robots!'
  },
  'Boss Fight': {
    color: '#dc2626',
    iconBg: 'bg-red-700',
    borderColor: 'border-red-600',
    objective: 'Team up with 2 allies to defeat the enraged Megabot!'
  }
};

export function getRankBadge(rank: number): {
  tierName: string;
  badgeColor: string;
  textColor: string;
} {
  if (rank >= 35) return { tierName: 'Rank 35 (Titanium)', badgeColor: 'bg-gradient-to-r from-red-600 to-amber-500', textColor: 'text-amber-300' };
  if (rank >= 30) return { tierName: 'Rank 30 (Ruby)', badgeColor: 'bg-gradient-to-r from-red-500 to-rose-600', textColor: 'text-rose-200' };
  if (rank >= 25) return { tierName: 'Rank 25 (Emerald)', badgeColor: 'bg-gradient-to-r from-emerald-500 to-teal-600', textColor: 'text-emerald-200' };
  if (rank >= 20) return { tierName: 'Rank 20 (Diamond)', badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500', textColor: 'text-blue-100' };
  if (rank >= 15) return { tierName: 'Rank 15 (Gold)', badgeColor: 'bg-gradient-to-r from-yellow-500 to-amber-600', textColor: 'text-yellow-100' };
  if (rank >= 10) return { tierName: 'Rank 10 (Silver)', badgeColor: 'bg-gradient-to-r from-slate-400 to-slate-500', textColor: 'text-slate-100' };
  return { tierName: `Rank ${rank}`, badgeColor: 'bg-slate-700', textColor: 'text-slate-300' };
}
