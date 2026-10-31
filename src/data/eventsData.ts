import { EventSlot } from '../types/brawl';

export const INITIAL_EVENT_SLOTS: EventSlot[] = [
  {
    slotId: 1,
    mode: 'Gem Grab',
    mapId: 'hard-rock-mine',
    mapName: 'Hard Rock Mine',
    environment: 'Mine Shaft',
    durationLeftSeconds: 12480, // ~3h 28m
    totalDurationSeconds: 86400,
    status: 'live',
    modifier: undefined,
    bannerColor: 'from-purple-900/60 to-purple-950/90',
    topBrawlers: [
      { brawlerId: 'kenji', name: 'Kenji', winRate: 61.4, pickRate: 8.2 },
      { brawlerId: 'draco', name: 'Draco', winRate: 59.8, pickRate: 6.9 },
      { brawlerId: 'cordelius', name: 'Cordelius', winRate: 58.7, pickRate: 7.1 },
    ],
  },
  {
    slotId: 2,
    mode: 'Brawl Ball',
    mapId: 'sneaky-fields',
    mapName: 'Sneaky Fields',
    environment: 'Starr Football Stadium',
    durationLeftSeconds: 26140, // ~7h 15m
    totalDurationSeconds: 86400,
    status: 'live',
    modifier: 'Super Bush Vision',
    bannerColor: 'from-blue-900/60 to-blue-950/90',
    topBrawlers: [
      { brawlerId: 'frank', name: 'Frank', winRate: 62.1, pickRate: 9.4 },
      { brawlerId: 'fang', name: 'Fang', winRate: 60.5, pickRate: 8.8 },
      { brawlerId: 'melodie', name: 'Melodie', winRate: 59.9, pickRate: 7.9 },
    ],
  },
  {
    slotId: 3,
    mode: 'Solo Showdown',
    mapId: 'skull-creek',
    mapName: 'Skull Creek',
    environment: 'Desert Badlands',
    durationLeftSeconds: 6720, // ~1h 52m
    totalDurationSeconds: 86400,
    status: 'live',
    modifier: 'Energy Drink',
    bannerColor: 'from-emerald-900/60 to-emerald-950/90',
    topBrawlers: [
      { brawlerId: 'kit', name: 'Kit', winRate: 63.4, pickRate: 11.5 },
      { brawlerId: 'edgar', name: 'Edgar', winRate: 59.8, pickRate: 10.2 },
      { brawlerId: 'cordelius', name: 'Cordelius', winRate: 58.7, pickRate: 7.9 },
    ],
  },
  {
    slotId: 4,
    mode: 'Knockout',
    mapId: 'goldarm-gulch',
    mapName: 'Goldarm Gulch',
    environment: 'Gold Mine Canyon',
    durationLeftSeconds: 32900, // ~9h 08m
    totalDurationSeconds: 86400,
    status: 'live',
    modifier: undefined,
    bannerColor: 'from-orange-900/60 to-orange-950/90',
    topBrawlers: [
      { brawlerId: 'piper', name: 'Piper', winRate: 62.4, pickRate: 10.4 },
      { brawlerId: 'angelo', name: 'Angelo', winRate: 61.7, pickRate: 8.9 },
      { brawlerId: 'lily', name: 'Lily', winRate: 60.1, pickRate: 7.2 },
    ],
  },
  {
    slotId: 5,
    mode: 'Heist',
    mapId: 'safe-zone',
    mapName: 'Safe Zone',
    environment: 'Industrial Warehouse',
    durationLeftSeconds: 43200, // ~12h
    totalDurationSeconds: 86400,
    status: 'live',
    modifier: undefined,
    bannerColor: 'from-red-900/60 to-red-950/90',
    topBrawlers: [
      { brawlerId: 'clancy', name: 'Clancy', winRate: 65.2, pickRate: 11.2 },
      { brawlerId: 'colt', name: 'Colt', winRate: 63.8, pickRate: 10.9 },
      { brawlerId: 'spike', name: 'Spike', winRate: 60.5, pickRate: 8.4 },
    ],
  },
  {
    slotId: 6,
    mode: 'Hot Zone',
    mapId: 'ring-of-fire',
    mapName: 'Ring of Fire',
    environment: 'Starr Park Arcade',
    durationLeftSeconds: 58120, // ~16h 08m
    totalDurationSeconds: 86400,
    status: 'live',
    modifier: 'Speed Boost Tiles',
    bannerColor: 'from-rose-900/60 to-rose-950/90',
    topBrawlers: [
      { brawlerId: 'berry', name: 'Berry', winRate: 64.7, pickRate: 9.8 },
      { brawlerId: 'draco', name: 'Draco', winRate: 62.5, pickRate: 8.6 },
      { brawlerId: 'frank', name: 'Frank', winRate: 60.9, pickRate: 8.1 },
    ],
  },
];

export const UPCOMING_EVENT_SLOTS: EventSlot[] = [
  {
    slotId: 7,
    mode: 'Brawl Ball',
    mapId: 'backyard-bowl',
    mapName: 'Backyard Bowl',
    environment: 'Starr Football Stadium',
    durationLeftSeconds: 26140, // starts when slot 2 ends
    totalDurationSeconds: 86400,
    status: 'upcoming',
    bannerColor: 'from-blue-900/40 to-blue-950/80',
    topBrawlers: [
      { brawlerId: 'colt', name: 'Colt', winRate: 59.2, pickRate: 8.6 },
      { brawlerId: 'melodie', name: 'Melodie', winRate: 58.7, pickRate: 7.4 },
      { brawlerId: 'piper', name: 'Piper', winRate: 57.8, pickRate: 8.1 },
    ],
  },
  {
    slotId: 8,
    mode: 'Wipeout',
    mapId: 'flaring-phoenix',
    mapName: 'Flaring Phoenix',
    environment: 'Cyber Neon District',
    durationLeftSeconds: 32900,
    totalDurationSeconds: 86400,
    status: 'upcoming',
    bannerColor: 'from-fuchsia-900/40 to-fuchsia-950/80',
    topBrawlers: [
      { brawlerId: 'piper', name: 'Piper', winRate: 60.8, pickRate: 9.1 },
      { brawlerId: 'angelo', name: 'Angelo', winRate: 59.4, pickRate: 8.2 },
      { brawlerId: 'fang', name: 'Fang', winRate: 58.2, pickRate: 7.5 },
    ],
  },
  {
    slotId: 9,
    mode: 'Duo Showdown',
    mapId: 'double-swoosh',
    mapName: 'Double Swoosh',
    environment: 'Jungle Canopy',
    durationLeftSeconds: 6720,
    totalDurationSeconds: 86400,
    status: 'upcoming',
    bannerColor: 'from-teal-900/40 to-teal-950/80',
    topBrawlers: [
      { brawlerId: 'kit', name: 'Kit', winRate: 61.2, pickRate: 9.8 },
      { brawlerId: 'draco', name: 'Draco', winRate: 60.4, pickRate: 7.4 },
      { brawlerId: 'berry', name: 'Berry', winRate: 58.9, pickRate: 6.2 },
    ],
  },
];
