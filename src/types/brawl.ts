export type Rarity = 'Common' | 'Rare' | 'Super Rare' | 'Epic' | 'Mythic' | 'Legendary';

export type BrawlerClass = 
  | 'Damage Dealer'
  | 'Assassin'
  | 'Tank'
  | 'Marksman'
  | 'Controller'
  | 'Support'
  | 'Artillery';

export type GameModeType = 
  | 'Gem Grab'
  | 'Brawl Ball'
  | 'Solo Showdown'
  | 'Duo Showdown'
  | 'Knockout'
  | 'Heist'
  | 'Bounty'
  | 'Hot Zone'
  | 'Wipeout'
  | 'Duels'
  | 'Robo Rumble'
  | 'Boss Fight';

export interface StarPower {
  id: string;
  name: string;
  description: string;
  icon?: string;
  winRate: number;
  pickRate: number;
}

export interface Gadget {
  id: string;
  name: string;
  description: string;
  icon?: string;
  winRate: number;
  pickRate: number;
}

export interface Gear {
  id: string;
  name: string;
  type: 'Super Rare' | 'Epic' | 'Mythic';
  description: string;
}

export interface Hypercharge {
  name: string;
  description: string;
  speedBoost: number;
  damageBoost: number;
  shieldBoost: number;
}

export interface Brawler {
  id: string;
  name: string;
  title: string;
  rarity: Rarity;
  class: BrawlerClass;
  avatarUrl: string;
  splashUrl?: string;
  description: string;
  stats: {
    healthBase: number;
    healthMax: number;
    damageBase: number;
    damageMax: number;
    superBase: number;
    superMax: number;
    movementSpeed: 'Slow' | 'Normal' | 'Fast' | 'Very Fast';
    reloadSpeed: 'Very Slow' | 'Slow' | 'Normal' | 'Fast' | 'Very Fast';
    range: 'Short' | 'Normal' | 'Long' | 'Very Long';
  };
  starPowers: StarPower[];
  gadgets: Gadget[];
  gears: Gear[];
  hypercharge?: Hypercharge;
  winRate: number;
  pickRate: number;
  starRate: number;
  tier: 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';
  bestMaps: string[];
  bestModes: GameModeType[];
  synergies: string[];
  releaseYear: number;
}

export interface EventSlot {
  slotId: number;
  mode: GameModeType;
  mapId: string;
  mapName: string;
  environment: string;
  durationLeftSeconds: number;
  totalDurationSeconds: number;
  status: 'live' | 'upcoming';
  modifier?: string;
  bannerColor: string;
  topBrawlers: Array<{
    brawlerId: string;
    name: string;
    winRate: number;
    pickRate: number;
  }>;
}

export interface PlayerBrawlerStats {
  id: string;
  name: string;
  power: number;
  trophies: number;
  highestTrophies: number;
  rank: number;
  winRate: number;
  gears: string[];
  starPower: string;
  gadget: string;
  hasHypercharge: boolean;
}

export interface BattleTeamMember {
  tag: string;
  name: string;
  brawler: string;
  brawlerId: string;
  power: number;
  trophies: number;
  isStarPlayer?: boolean;
}

export interface BattleLogEntry {
  id: string;
  battleTime: string; // e.g. "12m ago"
  mode: GameModeType;
  map: string;
  result: 'victory' | 'defeat' | 'draw';
  trophyChange: number;
  durationSeconds: number;
  starPlayer: {
    tag: string;
    name: string;
    brawler: string;
  };
  teams: [BattleTeamMember[], BattleTeamMember[]];
}

export interface PlayerProfile {
  tag: string;
  name: string;
  nameColor: string;
  avatarId: string;
  trophies: number;
  highestTrophies: number;
  expLevel: number;
  expPoints: number;
  victories3v3: number;
  soloVictories: number;
  duoVictories: number;
  bestRoboRumbleTime: string;
  bestBossFightLevel: string;
  rankedTier: string;
  rankedScore: number;
  winRatePercentage: number;
  club?: {
    tag: string;
    name: string;
    role: string;
    trophies: number;
    badgeId: number;
    memberCount: number;
  };
  brawlers: PlayerBrawlerStats[];
  battleLog: BattleLogEntry[];
}

export interface GameMap {
  id: string;
  name: string;
  mode: GameModeType;
  environment: string;
  description: string;
  layoutGrid: number[][]; // 0: empty, 1: wall, 2: bush, 3: water, 4: goal/objective/mine
  tips: string[];
  topBrawlers: Array<{
    brawlerId: string;
    name: string;
    winRate: number;
    pickRate: number;
    starRate: number;
  }>;
}

export interface LeaderboardPlayer {
  rank: number;
  tag: string;
  name: string;
  clubName?: string;
  trophies: number;
  country: string;
  brawlerFavorite: string;
  winStreak: number;
}

export interface LeaderboardClub {
  rank: number;
  tag: string;
  name: string;
  tagline: string;
  trophies: number;
  members: number;
  type: 'Open' | 'Invite Only' | 'Closed';
  requiredTrophies: number;
  badgeId: number;
}
