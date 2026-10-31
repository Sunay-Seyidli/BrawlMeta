export type Language = 'en' | 'tr';

export interface Translations {
  nav: {
    home: string;
    brawlers: string;
    maps: string;
    tierlist: string;
    leaderboards: string;
    activeProfile: string;
    quickLookup: string;
    apiOnline: string;
    selectLanguage: string;
  };
  hero: {
    badge: string;
    titlePart1: string;
    titleHighlight1: string;
    titlePart2: string;
    titleHighlight2: string;
    subtitle: string;
    playerTagTab: string;
    clubTagTab: string;
    placeholderPlayer: string;
    placeholderClub: string;
    analyzeBtn: string;
    quickPresets: string;
    errorTagEmpty: string;
    errorTagShort: string;
  };
  events: {
    liveTitle: string;
    liveSubtitle: string;
    liveBadge: string;
    upcomingBadge: string;
    viewAllMaps: string;
    bestBrawlers: string;
    byWinRate: string;
    endsIn: string;
    startsIn: string;
    viewGuide: string;
    upcomingTab: string;
    activeTab: string;
    environment: string;
  };
  profile: {
    backOverview: string;
    lookingUp: string;
    changeTag: string;
    level: string;
    noClub: string;
    members: string;
    currentTrophies: string;
    highest: string;
    winRate: string;
    win: string;
    loss: string;
    victories3v3: string;
    victoriesSolo: string;
    victoriesDuo: string;
    roboRumble: string;
    bossFight: string;
    experience: string;
    competitiveWins: string;
    firstPlaceWins: string;
    partnerWins: string;
    survivalRecord: string;
    highestDefeated: string;
    accountProgress: string;
    brawlersDashboard: string;
    battleLogTitle: string;
    searchBrawler: string;
    sortBy: string;
    sortTrophies: string;
    sortHighest: string;
    sortWinRate: string;
    sortRank: string;
    sortPower: string;
    last25Matches: string;
    clickToInspect: string;
    starPlayer: string;
    yourTeam: string;
    enemyTeam: string;
    trophies: string;
    victory: string;
    defeat: string;
    draw: string;
    duration: string;
  };
  tierlist: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    visualTiers: string;
    statsTable: string;
    filterMode: string;
    filterRange: string;
    allTrophies: string;
    findBrawler: string;
    tier: string;
    brawler: string;
    classRarity: string;
    winRate: string;
    pickRate: string;
    starPlayerRate: string;
    bestMode: string;
    guide: string;
    tierDescriptions: {
      sPlus: string;
      s: string;
      a: string;
      b: string;
      c: string;
      d: string;
    };
  };
  maps: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    allBlueprints: string;
    directorySubtitle: string;
    objective: string;
    legendWall: string;
    legendBush: string;
    legendWater: string;
    legendObjective: string;
    keyGuidelines: string;
    topBrawlersForMap: string;
    matchesAnalyzed: string;
  };
  brawlers: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    searchPlaceholder: string;
    rarity: string;
    class: string;
    sort: string;
    inspectPower: string;
    powerMax: string;
    health: string;
    attackDamage: string;
    superPower: string;
    speedRange: string;
    tabAbilities: string;
    tabMeta: string;
    tabSynergies: string;
    starPowers: string;
    gadgets: string;
    hypercharge: string;
    bestMapsTitle: string;
    bestModesTitle: string;
    recommendedComps: string;
    highSynergy: string;
  };
  leaderboards: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    searchPlaceholder: string;
    topPlayers: string;
    topClubs: string;
    rank: string;
    player: string;
    club: string;
    favoritePick: string;
    streak: string;
    trophies: string;
    inspect: string;
    clubName: string;
    tagline: string;
    members: string;
    type: string;
    clubTrophies: string;
  };
  apiModal: {
    title: string;
    howToTitle: string;
    allowIpTitle: string;
    allowIpExplanation: string;
    envTitle: string;
    envExplanation: string;
    closeBtn: string;
  };
  footer: {
    description: string;
    navigation: string;
    metaTools: string;
    disclaimer: string;
    disclaimerText: string;
    inspiredBy: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      brawlers: 'Brawlers',
      maps: 'Maps & Events',
      tierlist: 'Tier Lists',
      leaderboards: 'Leaderboards',
      activeProfile: 'Active Profile',
      quickLookup: 'Quick Lookup',
      apiOnline: 'API ONLINE',
      selectLanguage: 'Language',
    },
    hero: {
      badge: 'BRAWL STARS STATS & META COMPANION',
      titlePart1: 'Track Your',
      titleHighlight1: 'Trophies',
      titlePart2: '& Master The',
      titleHighlight2: 'Meta',
      subtitle: 'Lookup any player profile, inspect battle history with 3v3 team breakdowns, track active event timers, and master real-time win rates.',
      playerTagTab: 'Player Tag (#)',
      clubTagTab: 'Club Tag (#)',
      placeholderPlayer: '2PP0JYVY (Player Tag)',
      placeholderClub: '98L00PP (Club Tag)',
      analyzeBtn: 'ANALYZE STATS',
      quickPresets: 'Quick Presets:',
      errorTagEmpty: 'Please enter a valid Brawl Stars Player or Club tag (e.g. #2PP0JYVY)',
      errorTagShort: 'Tag must be at least 3 characters long after #.',
    },
    events: {
      liveTitle: 'Live Active',
      liveSubtitle: 'Live competitive events with dynamic countdown timers and top winning brawlers.',
      liveBadge: 'LIVE NOW',
      upcomingBadge: 'UPCOMING',
      viewAllMaps: 'All Maps & Blueprints',
      bestBrawlers: 'Best Meta Brawlers',
      byWinRate: 'By Win Rate %',
      endsIn: 'Ends in:',
      startsIn: 'Starts in:',
      viewGuide: 'Guide',
      upcomingTab: 'Upcoming Rotations',
      activeTab: 'Live Now (Active Slots)',
      environment: 'Theme:',
    },
    profile: {
      backOverview: '← Back to Overview',
      lookingUp: 'Looking up:',
      changeTag: 'Change Tag',
      level: 'LVL',
      noClub: 'No Club',
      members: 'Members',
      currentTrophies: 'Current Trophies',
      highest: 'Highest:',
      winRate: 'Win Rate',
      win: 'Win',
      loss: 'Loss',
      victories3v3: '3v3 Victories',
      victoriesSolo: 'Solo Victories',
      victoriesDuo: 'Duo Victories',
      roboRumble: 'Robo Rumble',
      bossFight: 'Boss Fight',
      experience: 'Experience XP',
      competitiveWins: 'Competitive Wins',
      firstPlaceWins: '1st Place Finishes',
      partnerWins: 'Partner Wins',
      survivalRecord: 'Survival Record',
      highestDefeated: 'Highest Defeated',
      accountProgress: 'Account Progress',
      brawlersDashboard: 'Brawlers Dashboard',
      battleLogTitle: 'Battle Log (Last 25)',
      searchBrawler: 'Search brawlers...',
      sortBy: 'Sort:',
      sortTrophies: 'Current Trophies (High to Low)',
      sortHighest: 'Highest Trophies',
      sortWinRate: 'Win Rate %',
      sortRank: 'Rank Tier',
      sortPower: 'Power Level',
      last25Matches: 'Last 25 Ranked & Ladder Matches',
      clickToInspect: 'Click any match to inspect 3v3 rosters & star player details',
      starPlayer: 'STAR PLAYER',
      yourTeam: 'Your Team',
      enemyTeam: 'Enemy Team',
      trophies: 'Trophies',
      victory: 'VICTORY',
      defeat: 'DEFEAT',
      draw: 'DRAW',
      duration: 'duration',
    },
    tierlist: {
      badge: 'LIVE COMPETITIVE META TIER LIST',
      title: 'Brawler',
      highlight: 'Tier Lists',
      subtitle: 'Rankings updated daily based on high-ladder trophy matches, win rate percentages, and tournament pick frequencies.',
      visualTiers: 'Visual Tiers',
      statsTable: 'Stats Table',
      filterMode: 'Filter By Game Mode:',
      filterRange: 'Range:',
      allTrophies: 'All Trophies',
      findBrawler: 'Find brawler in meta...',
      tier: 'Tier',
      brawler: 'Brawler',
      classRarity: 'Class / Rarity',
      winRate: 'Win Rate %',
      pickRate: 'Pick Rate %',
      starPlayerRate: 'Star Player %',
      bestMode: 'Best Mode',
      guide: 'Guide',
      tierDescriptions: {
        sPlus: 'Meta defining picks. Overwhelming win rates across ladder & tournaments.',
        s: 'Extremely strong. Versatile core options with heavy carry potential.',
        a: 'Balanced high performers. Reliable picks on most standard maps.',
        b: 'Situational specialists. Viable with right team comps and counter picks.',
        c: 'Below average. Outclassed by higher tier meta alternatives.',
        d: 'Underpowered. In severe need of balance buffs.',
      },
    },
    maps: {
      badge: 'MAP ROTATION & TACTICAL BLUEPRINTS',
      title: 'Active Events &',
      highlight: 'Map Directory',
      subtitle: 'Monitor live event rotation countdowns, explore tactical grid blueprints, and discover the best brawlers for each arena.',
      allBlueprints: 'Complete Tactical Map Blueprint Directory',
      directorySubtitle: 'Click any map to examine obstacles, safe zones, bush clusters, and win-rate charts.',
      objective: 'Mode Objective:',
      legendWall: 'Wall',
      legendBush: 'Bush',
      legendWater: 'Water',
      legendObjective: 'Objective',
      keyGuidelines: 'Key Strategic Guidelines',
      topBrawlersForMap: 'Top Brawlers for this Map (Ranked Meta)',
      matchesAnalyzed: 'Min. 50,000 matches analyzed',
    },
    brawlers: {
      badge: 'BRAWLER DATABASE & STATS WIKI',
      title: 'Brawler',
      highlight: 'Encyclopedia',
      subtitle: 'Explore base stats, power 11 max attributes, star powers, gadgets, and tier placement for every brawler in the game.',
      searchPlaceholder: 'Search brawlers...',
      rarity: 'Rarity:',
      class: 'Class:',
      sort: 'Sort:',
      inspectPower: 'Inspect Stats at Power Level:',
      powerMax: '11 (Max)',
      health: 'Health',
      attackDamage: 'Attack Damage',
      superPower: 'Super Power',
      speedRange: 'Speed / Range',
      tabAbilities: 'Star Powers, Gadgets & Hypercharge',
      tabMeta: 'Best Maps & Modes',
      tabSynergies: 'Team Synergies',
      starPowers: 'Star Powers (Unlocked at Power 9)',
      gadgets: 'Gadgets (Unlocked at Power 7)',
      hypercharge: 'HYPERCHARGE',
      bestMapsTitle: 'Best Ranked & Ladder Maps',
      bestModesTitle: 'Top Performing Game Modes',
      recommendedComps: 'Recommended Comp Partners',
      highSynergy: 'High Synergy',
    },
    leaderboards: {
      badge: 'GLOBAL & REGIONAL RANKINGS',
      title: 'Hall of Fame',
      highlight: '& Leaderboards',
      subtitle: 'Top 200 global leaderboard tracking trophy peaks, world championship players, and powerhouse clubs.',
      searchPlaceholder: 'Search player or club...',
      topPlayers: 'Top Players',
      topClubs: 'Top Clubs',
      rank: 'Rank',
      player: 'Player',
      club: 'Club',
      favoritePick: 'Favorite Pick',
      streak: 'Streak',
      trophies: 'Trophies',
      inspect: 'Inspect',
      clubName: 'Club Name',
      tagline: 'Tagline & Description',
      members: 'Members',
      type: 'Type',
      clubTrophies: 'Club Trophies',
    },
    apiModal: {
      title: 'Official Brawl Stars API Key & Setup Guide',
      howToTitle: '1. What Environment Variables are required?',
      allowIpTitle: '2. What to write in "Allowed IP" (Allow IO / Allowed IPs)?',
      allowIpExplanation: 'On developer.brawlstars.com when creating an API Key token, Supercell strictly requires the public IPv4 address of the computer or server making requests. It prevents unauthorized key usage. Find your public IP with "curl ipinfo.io/ip" or "whatismyip.com" and paste it into the Allowed IP box. For cloud hosting (Cloud Run, Vercel, Railway), add your server outbound static IP.',
      envTitle: '3. Where to put your API Key in your project?',
      envExplanation: 'Create or edit your ".env" file in the root folder and add: BRAWL_STARS_API_KEY="YOUR_KEY_HERE". Our proxy server forwards requests to https://api.brawlstars.com/v1 using this Bearer token.',
      closeBtn: 'Got it / Close',
    },
    footer: {
      description: 'The premier competitive statistics companion for Brawl Stars. Track your trophy progress, dissect battle logs, follow active rotation countdowns, and master tier lists.',
      navigation: 'Navigation',
      metaTools: 'Meta Tools',
      disclaimer: 'Disclaimer',
      disclaimerText: 'This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it. For more information see Supercell\'s Fan Content Policy: supercell.com/fan-content-policy.',
      inspiredBy: 'Inspired by Brawlify',
    },
  },
  tr: {
    nav: {
      home: 'Ana Sayfa',
      brawlers: 'Savaşçılar',
      maps: 'Haritalar & Etkinlikler',
      tierlist: 'Kademe Listeleri',
      leaderboards: 'Lider Tabloları',
      activeProfile: 'Aktif Profil',
      quickLookup: 'Hızlı Arama',
      apiOnline: 'API ÇEVRİMİÇİ',
      selectLanguage: 'Dil Seçimi',
    },
    hero: {
      badge: 'BRAWL STARS İSTATİSTİK & META PLATFORMU',
      titlePart1: 'Kupalarını',
      titleHighlight1: 'Takip Et',
      titlePart2: '& Metaya',
      titleHighlight2: 'Hükmet',
      subtitle: 'Tüm oyuncu profillerini incele, 3v3 takım dizilimleriyle savaş geçmişini analiz et, aktif harita sayaçlarını izle ve kazanma oranlarını keşfet.',
      playerTagTab: 'Oyuncu Kodu (#)',
      clubTagTab: 'Kulüp Kodu (#)',
      placeholderPlayer: '2PP0JYVY (Oyuncu Kodu)',
      placeholderClub: '98L00PP (Kulüp Kodu)',
      analyzeBtn: 'İSTATİSTİKLERİ İNCELE',
      quickPresets: 'Hızlı Profiller:',
      errorTagEmpty: 'Lütfen geçerli bir Brawl Stars Oyuncu veya Kulüp kodu girin (Örn: #2PP0JYVY)',
      errorTagShort: 'Kod # işaretinden sonra en az 3 karakter olmalıdır.',
    },
    events: {
      liveTitle: 'Canlı Aktif',
      liveSubtitle: 'Canlı geri sayım sayaçları ve en çok kazanan meta savaşçıları içeren aktif etkinlikler.',
      liveBadge: 'ŞİMDİ CANLI',
      upcomingBadge: 'YAKINDA',
      viewAllMaps: 'Tüm Haritalar & Planlar',
      bestBrawlers: 'En İyi Meta Savaşçıları',
      byWinRate: 'Kazanma Oranına Göre',
      endsIn: 'Bitiş süresi:',
      startsIn: 'Başlangıç süresi:',
      viewGuide: 'Rehber',
      upcomingTab: 'Gelecek Rotasyonlar',
      activeTab: 'Şimdi Canlı (Aktif Odalar)',
      environment: 'Tema:',
    },
    profile: {
      backOverview: '← Genel Bakışa Dön',
      lookingUp: 'İncelenen:',
      changeTag: 'Kodu Değiştir',
      level: 'SVY',
      noClub: 'Kulüp Yok',
      members: 'Üye',
      currentTrophies: 'Mevcut Kupa',
      highest: 'En Yüksek:',
      winRate: 'Kazanma Oranı',
      win: 'Galibiyet',
      loss: 'Mağlubiyet',
      victories3v3: '3v3 Galibiyetleri',
      victoriesSolo: 'Tekli Zaferler',
      victoriesDuo: 'Çiftli Zaferler',
      roboRumble: 'Robot İşgali',
      bossFight: 'Büyük Savaş',
      experience: 'Deneyim Puanı',
      competitiveWins: 'Rekabetçi Zaferler',
      firstPlaceWins: '1. Sıra Bitirişler',
      partnerWins: 'Takımlı Zaferler',
      survivalRecord: 'Hayatta Kalma Rekoru',
      highestDefeated: 'Yenilen En Zor Seviye',
      accountProgress: 'Hesap İlerlemesi',
      brawlersDashboard: 'Savaşçı Paneli',
      battleLogTitle: 'Savaş Günlüğü (Son 25)',
      searchBrawler: 'Savaşçı ara...',
      sortBy: 'Sırala:',
      sortTrophies: 'Mevcut Kupa (Yüksekten Düşüğe)',
      sortHighest: 'En Yüksek Kupa',
      sortWinRate: 'Kazanma Oranı %',
      sortRank: 'Rütbe Kademesi',
      sortPower: 'Güç Seviyesi',
      last25Matches: 'Son 25 Dereceli ve Kupa Karşılaşması',
      clickToInspect: '3v3 kadrolarını ve yıldız oyuncuyu görmek için maça tıkla',
      starPlayer: 'YILDIZ OYUNCU',
      yourTeam: 'Senin Takımın',
      enemyTeam: 'Rakip Takım',
      trophies: 'Kupa',
      victory: 'ZAFER',
      defeat: 'BOZGUN',
      draw: 'BERABERE',
      duration: 'süre',
    },
    tierlist: {
      badge: 'CANLI REKABETÇİ META LİSTESİ',
      title: 'Savaşçı',
      highlight: 'Kademe Listeleri',
      subtitle: 'Yüksek kupa maçları, kazanma yüzdeleri ve turnuva tercihlerine göre günlük güncellenen meta sıralaması.',
      visualTiers: 'Görsel Kademeler',
      statsTable: 'İstatistik Tablosu',
      filterMode: 'Oyun Moduna Göre Filtrele:',
      filterRange: 'Kupa Aralığı:',
      allTrophies: 'Tüm Kupalar',
      findBrawler: 'Metada savaşçı ara...',
      tier: 'Kademe',
      brawler: 'Savaşçı',
      classRarity: 'Sınıf / Enderlik',
      winRate: 'Kazanma %',
      pickRate: 'Seçilme %',
      starPlayerRate: 'Yıldız Oyuncu %',
      bestMode: 'En İyi Mod',
      guide: 'Rehber',
      tierDescriptions: {
        sPlus: 'Metanın zirvesi (Tanrı Kademe). Turnuva ve yüksek kupada karşı konulamaz kazanma oranları.',
        s: 'Son derece güçlü. Takımı tek başına sırtlayabilen çok yönlü temel tercihler.',
        a: 'Dengeli ve üst düzey performans. Standart haritaların çoğunda güvenilir seçimler.',
        b: 'Durumsal uzmanlar. Doğru takım sinerjisi ve karşı seçimlerle oldukça etkili.',
        c: 'Ortalamanın altında. Üst kademe meta alternatiflerinin gerisinde kalıyor.',
        d: 'Zayıf tercihler. Acil dengeleme ve güçlendirme (buff) ihtiyacı bulunuyor.',
      },
    },
    maps: {
      badge: 'HARİTA ROTASYONU & TAKTİKSEL KROKİLER',
      title: 'Aktif Etkinlikler &',
      highlight: 'Harita Dizini',
      subtitle: 'Canlı harita rotasyon sayaçlarını takip et, 10x10 taktiksel ızgara krokilerini incele ve en iyi savaşçıları gör.',
      allBlueprints: 'Kapsamlı Taktiksel Harita Planı Dizini',
      directorySubtitle: 'Engelleri, güvenli alanları, çalı öbeklerini ve kazanma oranlarını görmek için haritaya tıkla.',
      objective: 'Mod Amacı:',
      legendWall: 'Duvar',
      legendBush: 'Çalı',
      legendWater: 'Su',
      legendObjective: 'Hedef / Kasa / Maden',
      keyGuidelines: 'Önemli Taktik İpuçları',
      topBrawlersForMap: 'Bu Harita İçin En İyi Savaşçılar (Dereceli Meta)',
      matchesAnalyzed: 'En az 50.000 maç baz alınmıştır',
    },
    brawlers: {
      badge: 'SAVAŞÇI VERİTABANI & İSTATİSTİK VİKİSİ',
      title: 'Savaşçı',
      highlight: 'Ansiklopedisi',
      subtitle: 'Oyundaki tüm savaşçıların temel değerlerini, 11. Seviye maksimum özelliklerini, yıldız güçlerini ve aksesuarlarını keşfet.',
      searchPlaceholder: 'Savaşçı ara...',
      rarity: 'Enderlik:',
      class: 'Sınıf:',
      sort: 'Sırala:',
      inspectPower: 'Seviyeye Göre Özellikleri İncele:',
      powerMax: '11 (Maks)',
      health: 'Sağlık',
      attackDamage: 'Saldırı Hasarı',
      superPower: 'Süper Gücü',
      speedRange: 'Hız / Menzil',
      tabAbilities: 'Yıldız Güçleri, Aksesuarlar & Hiperşarj',
      tabMeta: 'En İyi Haritalar & Modlar',
      tabSynergies: 'Takım Sinerjileri',
      starPowers: 'Yıldız Güçleri (9. Seviyede Açılır)',
      gadgets: 'Aksesuarlar (7. Seviyede Açılır)',
      hypercharge: 'HİPERŞARJ',
      bestMapsTitle: 'En İyi Dereceli ve Kupa Haritaları',
      bestModesTitle: 'En Başarılı Oyun Modları',
      recommendedComps: 'Tavsiye Edilen Takım Arkadaşları',
      highSynergy: 'Yüksek Sinerji',
    },
    leaderboards: {
      badge: 'DÜNYA & BÖLGESEL SIRALAMA',
      title: 'Şöhretler Salonu',
      highlight: '& Lider Tablosu',
      subtitle: 'Kupa rekorlarını, dünya şampiyonlarını ve en güçlü kulüpleri takip eden küresel ilk 200 sıralaması.',
      searchPlaceholder: 'Oyuncu veya kulüp ara...',
      topPlayers: 'En İyi Oyuncular',
      topClubs: 'En İyi Kulüpler',
      rank: 'Sıra',
      player: 'Oyuncu',
      club: 'Kulüp',
      favoritePick: 'Favori Tercih',
      streak: 'Seri',
      trophies: 'Kupa',
      inspect: 'İncele',
      clubName: 'Kulüp Adı',
      tagline: 'Slogan & Açıklama',
      members: 'Üyeler',
      type: 'Tür',
      clubTrophies: 'Kulüp Kupası',
    },
    apiModal: {
      title: 'Resmi Brawl Stars API Anahtarı & Kurulum Rehberi',
      howToTitle: '1. Hangi Environment Değişkenleri Gerekli?',
      allowIpTitle: '2. "Allow IP" (Allowed IP Addresses) Kısmına Ne Yazacaksın?',
      allowIpExplanation: 'developer.brawlstars.com sitesinde API Key oluştururken Supercell güvenlik için istek yapacak bilgisayarın veya sunucunun doğrudan IPv4 (dış IP) adresini ister. Buraya kendi genel IP adresini yazmalısın. Kendi IP adresini öğrenmek için tarayıcında "whatismyip.com" açabilir veya komut satırında "curl ipinfo.io/ip" çalıştırıp çıkan IP adresini Allowed IP kutusuna yapıştırabilirsin. Cloud Run, Vercel veya sunucuya koyduğunda ise o sunucunun çıkış IP adresini yazmalısın.',
      envTitle: '3. API Anahtarını Projede Nereye Ekleyeceksin?',
      envExplanation: 'Projenin ana dizinindeki .env dosyasına BRAWL_STARS_API_KEY="senin_api_anahtarin" şeklinde ekleyebilirsin. Brawl Stars resmi API\'si doğrudan tarayıcıdan gelen istekleri CORS yüzünden engeller, bu nedenle backend sunucu proxy rotası üzerinden yetkilendirme (Bearer Token) ile çalışır.',
      closeBtn: 'Anladım / Kapat',
    },
    footer: {
      description: 'Brawl Stars için geliştirilmiş en kapsamlı istatistik ve meta platformu. Kupa ilerlemeni takip et, savaş geçmişini incele, aktif rotasyonları gör ve kademe listelerinde ustalaş.',
      navigation: 'Gezinme',
      metaTools: 'Meta Araçları',
      disclaimer: 'Yasal Uyarı',
      disclaimerText: 'Bu içerik Supercell ile ilişkili değildir, Supercell tarafından desteklenmemekte veya onaylanmamaktadır ve Supercell bundan sorumlu değildir. Detaylı bilgi için Supercell Hayran İçeriği İlkesi\'ne göz atın: supercell.com/fan-content-policy.',
      inspiredBy: 'Brawlify İlhamıyla Geliştirilmiştir',
    },
  },
};

/**
 * Detect user's preferred language automatically based on browser locale, timezone, or location.
 * Turkish locales / Turkey timezones default to 'tr', others default to 'en'.
 */
export function detectDefaultLanguage(): Language {
  // Check stored preference first
  try {
    const saved = localStorage.getItem('brawlmeta_lang');
    if (saved === 'en' || saved === 'tr') {
      return saved;
    }
  } catch (e) {
    // ignore
  }

  // Detect via browser languages
  const navLanguages = navigator.languages || [navigator.language || ''];
  const hasTurkish = navLanguages.some((lang) => lang.toLowerCase().startsWith('tr'));
  if (hasTurkish) return 'tr';

  // Detect via timezone
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (timeZone.toLowerCase().includes('istanbul') || timeZone.toLowerCase().includes('turkey')) {
      return 'tr';
    }
  } catch (e) {
    // ignore
  }

  return 'en';
}
