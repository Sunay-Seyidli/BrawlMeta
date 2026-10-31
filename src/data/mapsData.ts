import { GameMap } from '../types/brawl';

export const MAPS_DATA: GameMap[] = [
  {
    id: 'hard-rock-mine',
    name: 'Hard Rock Mine',
    mode: 'Gem Grab',
    environment: 'Mine Shaft',
    description: 'The definitive competitive Gem Grab arena. Two large side grass corridors frame a tight central gem well surrounded by indestructible cover.',
    layoutGrid: [
      [1, 1, 0, 0, 2, 2, 0, 0, 1, 1],
      [1, 0, 0, 2, 2, 2, 2, 0, 0, 1],
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 1, 2, 0],
      [0, 2, 0, 0, 4, 4, 0, 0, 2, 0],
      [0, 2, 0, 0, 4, 4, 0, 0, 2, 0],
      [0, 2, 1, 0, 0, 0, 0, 1, 2, 0],
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      [1, 0, 0, 2, 2, 2, 2, 0, 0, 1],
      [1, 1, 0, 0, 2, 2, 0, 0, 1, 1]
    ],
    tips: [
      'Control the side bushes early to prevent enemy flankers.',
      'A mid-gem carrier like Gene or Piper should collect gems while aggressive lane brawlers push up.',
      'Never retreat together with the countdown; stagger your positions to avoid multi-eliminations.'
    ],
    topBrawlers: [
      { brawlerId: 'kenji', name: 'Kenji', winRate: 61.4, pickRate: 8.2, starRate: 18.5 },
      { brawlerId: 'draco', name: 'Draco', winRate: 59.8, pickRate: 6.9, starRate: 15.2 },
      { brawlerId: 'cordelius', name: 'Cordelius', winRate: 58.7, pickRate: 7.1, starRate: 14.8 },
      { brawlerId: 'shelly', name: 'Shelly', winRate: 57.2, pickRate: 5.4, starRate: 11.2 },
      { brawlerId: 'spike', name: 'Spike', winRate: 56.4, pickRate: 6.0, starRate: 12.0 }
    ]
  },
  {
    id: 'sneaky-fields',
    name: 'Sneaky Fields',
    mode: 'Brawl Ball',
    environment: 'Starr Football Stadium',
    description: 'A dense grass field punctuated by scattered wall barriers in front of the goalposts. Bush vision and wall-breaking supers dominate this map.',
    layoutGrid: [
      [1, 1, 4, 4, 4, 4, 4, 4, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [2, 2, 0, 0, 0, 0, 0, 0, 2, 2],
      [2, 2, 2, 1, 0, 0, 1, 2, 2, 2],
      [0, 2, 2, 0, 0, 0, 0, 2, 2, 0],
      [0, 2, 2, 0, 0, 0, 0, 2, 2, 0],
      [2, 2, 2, 1, 0, 0, 1, 2, 2, 2],
      [2, 2, 0, 0, 0, 0, 0, 0, 2, 2],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 1, 4, 4, 4, 4, 4, 4, 1, 1]
    ],
    tips: [
      'Brawlers with Speed Gear in bushes dominate the mid-field skirmishes.',
      'Break open the goal defenses early with Frank or Colt to enable simple trick-shots.',
      'Assassins like Fang and Kenji can initiate instant team wipes in the cramped corridors.'
    ],
    topBrawlers: [
      { brawlerId: 'frank', name: 'Frank', winRate: 62.1, pickRate: 9.4, starRate: 19.8 },
      { brawlerId: 'fang', name: 'Fang', winRate: 60.5, pickRate: 8.8, starRate: 17.6 },
      { brawlerId: 'melodie', name: 'Melodie', winRate: 59.9, pickRate: 7.9, starRate: 16.4 },
      { brawlerId: 'draco', name: 'Draco', winRate: 58.4, pickRate: 6.5, starRate: 13.9 },
      { brawlerId: 'mortis', name: 'Mortis', winRate: 55.2, pickRate: 10.1, starRate: 14.1 }
    ]
  },
  {
    id: 'backyard-bowl',
    name: 'Backyard Bowl',
    mode: 'Brawl Ball',
    environment: 'Starr Football Stadium',
    description: 'An open Brawl Ball layout with wide lanes and spaced bushes. Long-range sharpshooters and mobile assassins thrive here.',
    layoutGrid: [
      [1, 1, 4, 4, 4, 4, 4, 4, 1, 1],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
      [0, 0, 2, 2, 0, 0, 2, 2, 0, 0],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [1, 1, 4, 4, 4, 4, 4, 4, 1, 1]
    ],
    tips: [
      'Maintain distance; do not bunch up against fast charging tanks.',
      'Control the ball around mid and wait for an enemy wipeout before walking in.',
      'Colt and Piper can exert suffocating pressure across the central sightlines.'
    ],
    topBrawlers: [
      { brawlerId: 'colt', name: 'Colt', winRate: 59.2, pickRate: 8.6, starRate: 17.2 },
      { brawlerId: 'melodie', name: 'Melodie', winRate: 58.7, pickRate: 7.4, starRate: 16.0 },
      { brawlerId: 'piper', name: 'Piper', winRate: 57.8, pickRate: 8.1, starRate: 15.5 },
      { brawlerId: 'kenji', name: 'Kenji', winRate: 56.9, pickRate: 6.8, starRate: 13.9 },
      { brawlerId: 'surge', name: 'Surge', winRate: 55.4, pickRate: 5.7, starRate: 11.8 }
    ]
  },
  {
    id: 'goldarm-gulch',
    name: 'Goldarm Gulch',
    mode: 'Knockout',
    environment: 'Gold Mine Canyon',
    description: 'The premiere tactical Knockout arena with central walls, safe choke corners, and unforgiving open crossfire zones.',
    layoutGrid: [
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 1, 2, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
      [0, 2, 1, 0, 0, 0, 0, 1, 2, 0],
      [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
      [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1]
    ],
    tips: [
      'Patience is key: never rush center without information on the enemy sharpshooter positions.',
      'Angelo and Piper can one-shot opponents when catching them swapping lanes.',
      'Lily and Kit can assassinate isolated snipers with well-timed shadow jumps.'
    ],
    topBrawlers: [
      { brawlerId: 'piper', name: 'Piper', winRate: 62.4, pickRate: 10.4, starRate: 21.3 },
      { brawlerId: 'angelo', name: 'Angelo', winRate: 61.7, pickRate: 8.9, starRate: 19.8 },
      { brawlerId: 'lily', name: 'Lily', winRate: 60.1, pickRate: 7.2, starRate: 17.5 },
      { brawlerId: 'leon', name: 'Leon', winRate: 58.3, pickRate: 6.8, starRate: 14.6 },
      { brawlerId: 'colt', name: 'Colt', winRate: 56.9, pickRate: 7.5, starRate: 13.9 }
    ]
  },
  {
    id: 'safe-zone',
    name: 'Safe Zone',
    mode: 'Heist',
    environment: 'Industrial Warehouse',
    description: 'Long corridor waterways line both sides, leaving a central choke with walls protecting the Heist safes at opposing ends.',
    layoutGrid: [
      [1, 1, 0, 4, 4, 4, 4, 0, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [3, 3, 0, 0, 0, 0, 0, 0, 3, 3],
      [3, 3, 1, 1, 0, 0, 1, 1, 3, 3],
      [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
      [3, 3, 1, 1, 0, 0, 1, 1, 3, 3],
      [3, 3, 0, 0, 0, 0, 0, 0, 3, 3],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 1, 0, 4, 4, 4, 4, 0, 1, 1]
    ],
    tips: [
      'Clancy at Stage 3 can melt the enemy safe in under 5 seconds.',
      'Colt and Spike provide continuous safe DPS while maintaining safe distance.',
      'Do not play purely defensive; Heist is won through offensive pace.'
    ],
    topBrawlers: [
      { brawlerId: 'clancy', name: 'Clancy', winRate: 65.2, pickRate: 11.2, starRate: 24.5 },
      { brawlerId: 'colt', name: 'Colt', winRate: 63.8, pickRate: 10.9, starRate: 22.0 },
      { brawlerId: 'spike', name: 'Spike', winRate: 60.5, pickRate: 8.4, starRate: 17.8 },
      { brawlerId: 'crow', name: 'Crow', winRate: 58.1, pickRate: 6.9, starRate: 14.3 },
      { brawlerId: 'melodie', name: 'Melodie', winRate: 57.4, pickRate: 7.1, starRate: 15.0 }
    ]
  },
  {
    id: 'ring-of-fire',
    name: 'Ring of Fire',
    mode: 'Hot Zone',
    environment: 'Starr Park Arcade',
    description: 'A single, large circular capture zone located squarely in the center of the map, flanked by long sightline side corridors.',
    layoutGrid: [
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [0, 2, 0, 4, 4, 4, 4, 0, 2, 0],
      [0, 2, 0, 4, 4, 4, 4, 0, 2, 0],
      [0, 2, 0, 4, 4, 4, 4, 0, 2, 0],
      [0, 2, 0, 4, 4, 4, 4, 0, 2, 0],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
      [1, 1, 0, 0, 0, 0, 0, 0, 1, 1]
    ],
    tips: [
      'Berry puddles create hazardous zones that force enemies off the point completely.',
      'Draco and Frank can anchor the center while absorbing enormous damage.',
      'Control the side chokes to trap enemies in their own respawn area.'
    ],
    topBrawlers: [
      { brawlerId: 'berry', name: 'Berry', winRate: 64.7, pickRate: 9.8, starRate: 20.4 },
      { brawlerId: 'draco', name: 'Draco', winRate: 62.5, pickRate: 8.6, starRate: 18.2 },
      { brawlerId: 'frank', name: 'Frank', winRate: 60.9, pickRate: 8.1, starRate: 16.7 },
      { brawlerId: 'clancy', name: 'Clancy', winRate: 59.4, pickRate: 7.7, starRate: 15.5 },
      { brawlerId: 'poco', name: 'Poco', winRate: 57.8, pickRate: 5.6, starRate: 12.3 }
    ]
  },
  {
    id: 'skull-creek',
    name: 'Skull Creek',
    mode: 'Solo Showdown',
    environment: 'Desert Badlands',
    description: 'Iconic Showdown battleground featuring a central island of power boxes surrounded by rocky spiral outcrops and ambush bushes.',
    layoutGrid: [
      [1, 1, 0, 2, 2, 2, 2, 0, 1, 1],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [2, 0, 0, 2, 1, 1, 2, 0, 0, 2],
      [2, 1, 0, 1, 4, 4, 1, 0, 1, 2],
      [2, 1, 0, 1, 4, 4, 1, 0, 1, 2],
      [2, 0, 0, 2, 1, 1, 2, 0, 0, 2],
      [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
      [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
      [1, 1, 0, 2, 2, 2, 2, 0, 1, 1]
    ],
    tips: [
      'Prioritize claiming 2-3 power boxes before engaging in extended 1v1 fights.',
      'Check bushes methodically with long-range pokes before walking in.',
      'Kit with Power Hungry scales extraordinarily fast in mid-game fights.'
    ],
    topBrawlers: [
      { brawlerId: 'kit', name: 'Kit', winRate: 63.4, pickRate: 11.5, starRate: 22.8 },
      { brawlerId: 'edgar', name: 'Edgar', winRate: 59.8, pickRate: 10.2, starRate: 18.0 },
      { brawlerId: 'cordelius', name: 'Cordelius', winRate: 58.7, pickRate: 7.9, starRate: 16.2 },
      { brawlerId: 'surge', name: 'Surge', winRate: 57.6, pickRate: 7.4, starRate: 14.8 },
      { brawlerId: 'leon', name: 'Leon', winRate: 56.9, pickRate: 8.0, starRate: 14.1 }
    ]
  }
];
