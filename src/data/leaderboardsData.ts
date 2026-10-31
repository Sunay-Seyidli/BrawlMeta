import { LeaderboardPlayer, LeaderboardClub } from '../types/brawl';

export const LEADERBOARD_PLAYERS: LeaderboardPlayer[] = [
  { rank: 1, tag: '#9Y208CRV', name: 'Sitetampo', clubName: 'CRAZY RACCOON', trophies: 84210, country: 'JP', brawlerFavorite: 'Piper', winStreak: 32 },
  { rank: 2, tag: '#2PP0JYVY', name: 'Tensai [ZETA]', clubName: 'ZETA DIVISION', trophies: 78540, country: 'JP', brawlerFavorite: 'Kenji', winStreak: 24 },
  { rank: 3, tag: '#2LLG90UP', name: 'Achapi', clubName: 'CRAZY RACCOON', trophies: 76800, country: 'JP', brawlerFavorite: 'Draco', winStreak: 18 },
  { rank: 4, tag: '#8YVVC201', name: 'Moya', clubName: 'CRAZY RACCOON', trophies: 75200, country: 'JP', brawlerFavorite: 'Melodie', winStreak: 15 },
  { rank: 5, tag: '#8G9LV028', name: 'CryingMan', clubName: 'TRIBE GAMING', trophies: 71290, country: 'US', brawlerFavorite: 'Spike', winStreak: 12 },
  { rank: 6, tag: '#2CRU0988', name: 'BobbyBS', clubName: 'STMN Esports', trophies: 70800, country: 'US', brawlerFavorite: 'Colt', winStreak: 14 },
  { rank: 7, tag: '#9PUCV812', name: 'GeRo', clubName: 'SK Gaming', trophies: 69940, country: 'DE', brawlerFavorite: 'Fang', winStreak: 21 },
  { rank: 8, tag: '#8LPLQ881', name: 'Symantec', clubName: 'Reply Totem', trophies: 69400, country: 'DE', brawlerFavorite: 'Clancy', winStreak: 11 },
  { rank: 9, tag: '#2YQL890A', name: 'Tyrant', clubName: 'STMN Esports', trophies: 68900, country: 'US', brawlerFavorite: 'Frank', winStreak: 9 },
  { rank: 10, tag: '#98LL218V', name: 'Lenain', clubName: 'HMBLE', trophies: 68150, country: 'FR', brawlerFavorite: 'Angelo', winStreak: 16 },
  { rank: 11, tag: '#TR990812', name: 'VanguardTR', clubName: 'Futbolist Esports', trophies: 67800, country: 'TR', brawlerFavorite: 'Mortis', winStreak: 19 },
  { rank: 12, tag: '#222VLG08', name: 'Hyra', clubName: 'Hyra Army', trophies: 67400, country: 'TR', brawlerFavorite: 'Kenji', winStreak: 10 },
  { rank: 13, tag: '#889PLQ11', name: 'Lukii', clubName: 'HMBLE', trophies: 66950, country: 'DE', brawlerFavorite: 'Berry', winStreak: 14 },
  { rank: 14, tag: '#77VC9981', name: 'KaKa', clubName: 'ZETA DIVISION', trophies: 66400, country: 'KR', brawlerFavorite: 'Chester', winStreak: 8 },
  { rank: 15, tag: '#BR771092', name: 'FireCrow_BR', clubName: 'Luminosity Gaming', trophies: 65900, country: 'BR', brawlerFavorite: 'Crow', winStreak: 13 },
];

export const LEADERBOARD_CLUBS: LeaderboardClub[] = [
  { rank: 1, tag: '#98L00PP', name: 'CRAZY RACCOON', tagline: 'World Champions 2024. Only top 100 global players.', trophies: 1298400, members: 30, type: 'Invite Only', requiredTrophies: 65000, badgeId: 12 },
  { rank: 2, tag: '#20UG98LC', name: 'ZETA DIVISION', tagline: 'Brawl Stars Championship Powerhouse. Respect & Grinding.', trophies: 1240500, members: 30, type: 'Invite Only', requiredTrophies: 65000, badgeId: 8 },
  { rank: 3, tag: '#80LG99P', name: 'TRIBE GAMING', tagline: 'We run the meta. Push everyday.', trophies: 1198200, members: 30, type: 'Invite Only', requiredTrophies: 60000, badgeId: 4 },
  { rank: 4, tag: '#SK992100', name: 'SK Gaming', tagline: 'European Masters. Active in club league & ranked.', trophies: 1175000, members: 30, type: 'Invite Only', requiredTrophies: 55000, badgeId: 7 },
  { rank: 5, tag: '#HMB88910', name: 'HMBLE Esports', tagline: 'World Finalists. Aim high, never surrender.', trophies: 1162400, members: 30, type: 'Invite Only', requiredTrophies: 55000, badgeId: 15 },
  { rank: 6, tag: '#STM88123', name: 'STMN Esports', tagline: 'North American Dominance.', trophies: 1145000, members: 29, type: 'Invite Only', requiredTrophies: 50000, badgeId: 2 },
  { rank: 7, tag: '#FUT77890', name: 'Futbolist', tagline: 'Turkiyenin en iyi Brawl Stars kulubu!', trophies: 1120000, members: 30, type: 'Invite Only', requiredTrophies: 50000, badgeId: 9 },
  { rank: 8, tag: '#NOV66190', name: 'Nova Esports Pro', tagline: 'Legendary global legacy club.', trophies: 1095000, members: 28, type: 'Open', requiredTrophies: 45000, badgeId: 1 },
];

export const COUNTRIES = [
  { code: 'GLOBAL', name: 'Global', flag: '🌐' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
];
