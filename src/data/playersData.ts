import { PlayerProfile, BattleLogEntry, PlayerBrawlerStats } from '../types/brawl';
import { BRAWLERS } from './brawlersData';

// Helper to generate 25 realistic match logs
function generateBattleLog(playerName: string, playerTag: string): BattleLogEntry[] {
  const modesAndMaps = [
    { mode: 'Brawl Ball' as const, map: 'Sneaky Fields' },
    { mode: 'Knockout' as const, map: 'Goldarm Gulch' },
    { mode: 'Gem Grab' as const, map: 'Hard Rock Mine' },
    { mode: 'Heist' as const, map: 'Safe Zone' },
    { mode: 'Hot Zone' as const, map: 'Ring of Fire' },
    { mode: 'Brawl Ball' as const, map: 'Backyard Bowl' },
    { mode: 'Knockout' as const, map: 'Goldarm Gulch' },
    { mode: 'Solo Showdown' as const, map: 'Skull Creek' },
    { mode: 'Gem Grab' as const, map: 'Hard Rock Mine' },
  ];

  const opponents = [
    { name: 'Sitetampo', tag: '#9Y208CRV', brawler: 'Kenji', power: 11, trophies: 1120 },
    { name: 'Achapi', tag: '#2LLG90UP', brawler: 'Piper', power: 11, trophies: 1080 },
    { name: 'Moya', tag: '#8YVVC201', brawler: 'Fang', power: 11, trophies: 1150 },
    { name: 'BobbyBS', tag: '#2CRU0988', brawler: 'Colt', power: 11, trophies: 1040 },
    { name: 'GeRo', tag: '#9PUCV812', brawler: 'Draco', power: 11, trophies: 1090 },
    { name: 'Symantec', tag: '#8LPLQ881', brawler: 'Clancy', power: 11, trophies: 1160 },
    { name: 'Tyrant', tag: '#2YQL890A', brawler: 'Frank', power: 11, trophies: 1110 },
    { name: 'Lenain', tag: '#98LL218V', brawler: 'Angelo', power: 11, trophies: 1070 },
  ];

  const allies = [
    { name: 'CryingMan', tag: '#8G9LV028', brawler: 'Spike', power: 11, trophies: 1140 },
    { name: 'SpenLC', tag: '#8LL9V02Q', brawler: 'Berry', power: 11, trophies: 1090 },
    { name: 'Hyra', tag: '#222VLG08', brawler: 'Mortis', power: 11, trophies: 1200 },
    { name: 'SecondBest', tag: '#9YULVC11', brawler: 'Lily', power: 11, trophies: 1050 },
    { name: 'KaKa', tag: '#809LCVQ2', brawler: 'Melodie', power: 11, trophies: 1130 },
  ];

  const playerBrawlersList = ['kenji', 'draco', 'piper', 'fang', 'melodie', 'clancy', 'cordelius', 'colt', 'frank', 'surge'];

  const logs: BattleLogEntry[] = [];

  for (let i = 0; i < 25; i++) {
    const mm = modesAndMaps[i % modesAndMaps.length];
    const isWin = i % 4 !== 3; // 75% win rate
    const isDraw = i === 18;
    const result = isDraw ? 'draw' : (isWin ? 'victory' : 'defeat');
    const trophyChange = isDraw ? 0 : (isWin ? 8 : -8);
    const duration = 75 + ((i * 17) % 110);
    const myBrawlerId = playerBrawlersList[i % playerBrawlersList.length];
    const brawlerObj = BRAWLERS.find(b => b.id === myBrawlerId) || BRAWLERS[0];

    const isStar = isWin && (i % 3 === 0);

    const team1 = [
      {
        tag: playerTag,
        name: playerName,
        brawler: brawlerObj.name,
        brawlerId: brawlerObj.id,
        power: 11,
        trophies: 1000 + ((i * 19) % 300),
        isStarPlayer: isStar,
      },
      {
        ...allies[i % allies.length],
        brawlerId: allies[i % allies.length].brawler.toLowerCase(),
      },
      {
        ...allies[(i + 2) % allies.length],
        brawlerId: allies[(i + 2) % allies.length].brawler.toLowerCase(),
      },
    ];

    const team2 = [
      {
        ...opponents[i % opponents.length],
        brawlerId: opponents[i % opponents.length].brawler.toLowerCase(),
        isStarPlayer: !isWin && !isDraw && (i % 2 === 0),
      },
      {
        ...opponents[(i + 3) % opponents.length],
        brawlerId: opponents[(i + 3) % opponents.length].brawler.toLowerCase(),
      },
      {
        ...opponents[(i + 5) % opponents.length],
        brawlerId: opponents[(i + 5) % opponents.length].brawler.toLowerCase(),
      },
    ];

    const minutesAgo = i === 0 ? 4 : (i * 18 + 12);
    const timeString = minutesAgo < 60 ? `${minutesAgo}m ago` : `${Math.floor(minutesAgo / 60)}h ${minutesAgo % 60}m ago`;

    logs.push({
      id: `battle-${i}-${Date.now()}`,
      battleTime: timeString,
      mode: mm.mode,
      map: mm.map,
      result,
      trophyChange,
      durationSeconds: duration,
      starPlayer: isStar
        ? { tag: playerTag, name: playerName, brawler: brawlerObj.name }
        : { tag: team2[0].tag, name: team2[0].name, brawler: team2[0].brawler },
      teams: [team1, team2],
    });
  }

  return logs;
}

// Generate brawlers for player
function generatePlayerBrawlers(scale: number = 1): PlayerBrawlerStats[] {
  return BRAWLERS.map((b, idx) => {
    const trophies = Math.min(1250, Math.floor((650 + (idx * 27) % 550) * scale));
    const highestTrophies = trophies + Math.floor(Math.random() * 80) + 10;
    const rank = trophies >= 1000 ? 35 : (trophies >= 850 ? 30 : (trophies >= 750 ? 25 : (trophies >= 600 ? 22 : 18)));
    
    return {
      id: b.id,
      name: b.name,
      power: 11,
      trophies,
      highestTrophies,
      rank,
      winRate: Number((54 + (idx * 1.7) % 22).toFixed(1)),
      gears: ['Damage', 'Shield'],
      starPower: b.starPowers[0]?.name || 'Standard',
      gadget: b.gadgets[0]?.name || 'Standard',
      hasHypercharge: Boolean(b.hypercharge),
    };
  });
}

// Preset verified profiles
export const PRESET_PLAYERS: Record<string, PlayerProfile> = {
  '#2PP0JYVY': {
    tag: '#2PP0JYVY',
    name: 'Tensai [ZETA]',
    nameColor: '#F5A623',
    avatarId: 'kenji',
    trophies: 78540,
    highestTrophies: 82190,
    expLevel: 412,
    expPoints: 2450890,
    victories3v3: 34120,
    soloVictories: 3890,
    duoVictories: 5120,
    bestRoboRumbleTime: 'Insane XVI (Mastered)',
    bestBossFightLevel: 'Insane XVI (Mastered)',
    rankedTier: 'Masters I',
    rankedScore: 9240,
    winRatePercentage: 78.6,
    club: {
      tag: '#20UG98LC',
      name: 'ZETA DIVISION',
      role: 'President',
      trophies: 1240500,
      badgeId: 8,
      memberCount: 30,
    },
    brawlers: generatePlayerBrawlers(1.1),
    battleLog: generateBattleLog('Tensai [ZETA]', '#2PP0JYVY'),
  },
  '#9Y208CRV': {
    tag: '#9Y208CRV',
    name: 'Sitetampo',
    nameColor: '#38BDF8',
    avatarId: 'piper',
    trophies: 84210,
    highestTrophies: 85900,
    expLevel: 440,
    expPoints: 2890120,
    victories3v3: 39820,
    soloVictories: 2450,
    duoVictories: 6780,
    bestRoboRumbleTime: 'Insane XVI',
    bestBossFightLevel: 'Insane XVI',
    rankedTier: 'Masters I',
    rankedScore: 9850,
    winRatePercentage: 81.2,
    club: {
      tag: '#98L00PP',
      name: 'CRAZY RACCOON',
      role: 'Vice President',
      trophies: 1298400,
      badgeId: 12,
      memberCount: 30,
    },
    brawlers: generatePlayerBrawlers(1.15),
    battleLog: generateBattleLog('Sitetampo', '#9Y208CRV'),
  },
  '#8G9LV028': {
    tag: '#8G9LV028',
    name: 'CryingMan',
    nameColor: '#A855F7',
    avatarId: 'spike',
    trophies: 71290,
    highestTrophies: 75400,
    expLevel: 368,
    expPoints: 1940320,
    victories3v3: 27900,
    soloVictories: 4890,
    duoVictories: 4120,
    bestRoboRumbleTime: 'Insane XVI',
    bestBossFightLevel: 'Insane XIV',
    rankedTier: 'Legendary III',
    rankedScore: 8450,
    winRatePercentage: 74.5,
    club: {
      tag: '#80LG99P',
      name: 'TRIBE GAMING',
      role: 'Senior',
      trophies: 1198200,
      badgeId: 4,
      memberCount: 30,
    },
    brawlers: generatePlayerBrawlers(0.98),
    battleLog: generateBattleLog('CryingMan', '#8G9LV028'),
  },
  '#2AAAA0AA': {
    tag: '#2AAAA0AA',
    name: 'BrawlChampion',
    nameColor: '#10B981',
    avatarId: 'fang',
    trophies: 42150,
    highestTrophies: 45600,
    expLevel: 240,
    expPoints: 940000,
    victories3v3: 14200,
    soloVictories: 1980,
    duoVictories: 2410,
    bestRoboRumbleTime: 'Insane X',
    bestBossFightLevel: 'Insane VIII',
    rankedTier: 'Mythic II',
    rankedScore: 6850,
    winRatePercentage: 66.8,
    club: {
      tag: '#CLB8889',
      name: 'Nova Esports EU',
      role: 'Member',
      trophies: 890400,
      badgeId: 1,
      memberCount: 28,
    },
    brawlers: generatePlayerBrawlers(0.72),
    battleLog: generateBattleLog('BrawlChampion', '#2AAAA0AA'),
  },
};

// Generates dynamic profile for ANY custom player tag entered by user
export function getOrCreatePlayerProfile(rawTag: string): PlayerProfile {
  const formattedTag = rawTag.startsWith('#') ? rawTag.toUpperCase() : `#${rawTag.toUpperCase()}`;
  
  if (PRESET_PLAYERS[formattedTag]) {
    return PRESET_PLAYERS[formattedTag];
  }

  // Create hash-based custom profile
  let hash = 0;
  for (let i = 0; i < formattedTag.length; i++) {
    hash = (hash * 31 + formattedTag.charCodeAt(i)) % 1000000;
  }

  const trophies = 25000 + (hash % 45000);
  const highest = trophies + 1200 + (hash % 3000);
  const winRate = Number((58 + (hash % 24)).toFixed(1));
  const expLevel = 150 + (hash % 200);

  const customName = `Brawler_${formattedTag.replace('#', '').slice(0, 5)}`;

  return {
    tag: formattedTag,
    name: customName,
    nameColor: ['#F5A623', '#38BDF8', '#EC4899', '#10B981', '#A855F7'][hash % 5],
    avatarId: BRAWLERS[hash % BRAWLERS.length].id,
    trophies,
    highestTrophies: highest,
    expLevel,
    expPoints: expLevel * 5000 + (hash % 3000),
    victories3v3: Math.floor(trophies * 0.35),
    soloVictories: Math.floor(trophies * 0.06),
    duoVictories: Math.floor(trophies * 0.08),
    bestRoboRumbleTime: 'Insane XI',
    bestBossFightLevel: 'Insane IX',
    rankedTier: trophies > 50000 ? 'Legendary II' : (trophies > 35000 ? 'Mythic III' : 'Diamond I'),
    rankedScore: 5000 + (hash % 3500),
    winRatePercentage: winRate,
    club: {
      tag: `#CLB${(hash % 9000) + 1000}`,
      name: `Meta Titans ${(hash % 9) + 1}`,
      role: 'Member',
      trophies: 850000 + (hash % 300000),
      badgeId: (hash % 12) + 1,
      memberCount: 29,
    },
    brawlers: generatePlayerBrawlers(trophies / 65000),
    battleLog: generateBattleLog(customName, formattedTag),
  };
}
