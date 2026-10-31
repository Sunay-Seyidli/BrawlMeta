import React, { useState } from 'react';
import { NavTab, Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { PlayerProfileView } from './components/PlayerProfileView';
import { BrawlersView } from './components/BrawlersView';
import { MapsView } from './components/MapsView';
import { TierListView } from './components/TierListView';
import { LeaderboardsView } from './components/LeaderboardsView';
import { BrawlerWikiModal } from './components/BrawlerWikiModal';
import { MapDetailModal } from './components/MapDetailModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { fetchPlayerProfile } from './services/brawlApi';
import { PRESET_PLAYERS } from './data/playersData';
import { BRAWLERS } from './data/brawlersData';
import { MAPS_DATA } from './data/mapsData';
import { PlayerProfile, Brawler, GameMap } from './types/brawl';
import { Language, detectDefaultLanguage, TRANSLATIONS } from './i18n/translations';
import { AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [currentProfile, setCurrentProfile] = useState<PlayerProfile>(PRESET_PLAYERS['#2PP0JYVY']);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [apiNotice, setApiNotice] = useState<{ isLive: boolean; message: string } | null>(null);

  // Auto location/locale detection for language
  const [lang, setLang] = useState<Language>(() => detectDefaultLanguage());

  // Modals state
  const [selectedBrawlerId, setSelectedBrawlerId] = useState<string | null>(null);
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = useState<boolean>(false);

  const tProfile = TRANSLATIONS[lang].profile;

  // Persist language changes
  const handleToggleLanguage = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('brawlmeta_lang', newLang);
    } catch (e) {
      // ignore
    }
  };

  // Search handler with real official API proxy fetch & automatic fallback
  const handleSearch = async (tag: string, _type: 'player' | 'club') => {
    setIsLoadingProfile(true);
    setCurrentTab('profile');
    setApiNotice(null);

    try {
      const result = await fetchPlayerProfile(tag);
      setCurrentProfile(result.profile);

      if (result.isLiveOfficialApi) {
        setApiNotice({
          isLive: true,
          message:
            lang === 'tr'
              ? 'Canlı Resmi Supercell Brawl Stars API Verileri Başarıyla Yüklendi!'
              : 'Live Official Supercell API Data Loaded Successfully!',
        });
      } else if (result.errorCode) {
        setApiNotice({
          isLive: false,
          message:
            result.errorCode === 'HTTP_403'
              ? lang === 'tr'
                ? '403 Forbidden: Dış IP adresiniz developer.brawlstars.com panelinde "Allowed IP Addresses" kısmına eklenmemiş. Doğrulanmış simülatör verileri gösteriliyor.'
                : '403 Forbidden: Your public IP is not in "Allowed IP Addresses" on developer.brawlstars.com. Showing verified meta data.'
              : result.apiStatusMessage || 'API offline, displaying verified meta data.',
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingProfile(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectBrawler = (brawlerId: string) => {
    setSelectedBrawlerId(brawlerId);
  };

  const handleSelectMap = (mapIdentifier: string) => {
    const found = MAPS_DATA.find(
      (m) => m.id === mapIdentifier || m.name.toLowerCase() === mapIdentifier.toLowerCase()
    );
    if (found) {
      setSelectedMapId(found.id);
    } else {
      setSelectedMapId(MAPS_DATA[0].id);
    }
  };

  const activeBrawler: Brawler | null = selectedBrawlerId
    ? BRAWLERS.find((b) => b.id === selectedBrawlerId) || null
    : null;

  const activeMap: GameMap | null = selectedMapId
    ? MAPS_DATA.find((m) => m.id === selectedMapId) || null
    : null;

  return (
    <div className="min-h-screen bg-[#0B0C10] text-slate-100 flex flex-col font-sans selection:bg-[#F5A623] selection:text-black">
      {/* Global Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenQuickSearch={() => setIsQuickSearchOpen(true)}
        activePlayerTag={currentProfile.tag}
        lang={lang}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 py-6 px-3 sm:px-6">
        {currentTab === 'home' && (
          <HomeView
            onSearch={handleSearch}
            onSelectTab={setCurrentTab}
            onSelectBrawler={handleSelectBrawler}
            onSelectMap={handleSelectMap}
            isLoading={isLoadingProfile}
            lang={lang}
          />
        )}

        {currentTab === 'profile' && (
          <div className="space-y-4">
            {/* Live API Notice / IP status if present */}
            {apiNotice && (
              <div
                className={`max-w-6xl mx-auto p-3.5 rounded-2xl border flex items-center justify-between gap-3 text-xs font-medium animate-in fade-in duration-200 ${
                  apiNotice.isLive
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                    : 'bg-amber-950/70 border-amber-500/40 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {apiNotice.isLive ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span>{apiNotice.message}</span>
                </div>
                <button
                  onClick={() => setApiNotice(null)}
                  className="text-slate-400 hover:text-white cursor-pointer px-2 py-0.5 rounded"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Tag search bar above profile for quick switches */}
            <div className="max-w-6xl mx-auto flex items-center justify-between text-xs text-slate-400">
              <button
                onClick={() => setCurrentTab('home')}
                className="hover:text-amber-400 transition-colors flex items-center gap-1 font-heading cursor-pointer"
              >
                {tProfile.backOverview}
              </button>
              <div className="flex items-center gap-2">
                <span>{tProfile.lookingUp}</span>
                <span className="font-mono text-amber-400 font-bold bg-[#141c28] px-2 py-0.5 rounded border border-slate-700">
                  {currentProfile.tag}
                </span>
                <button
                  onClick={() => setIsQuickSearchOpen(true)}
                  className="text-amber-400 underline hover:text-amber-300 font-medium ml-1 cursor-pointer"
                >
                  {tProfile.changeTag}
                </button>
              </div>
            </div>

            <PlayerProfileView
              profile={currentProfile}
              isLoading={isLoadingProfile}
              onSelectBrawler={handleSelectBrawler}
              onSelectMap={handleSelectMap}
              onSearchTag={(tag) => handleSearch(tag, 'player')}
              lang={lang}
            />
          </div>
        )}

        {currentTab === 'brawlers' && (
          <BrawlersView onSelectBrawler={handleSelectBrawler} lang={lang} />
        )}

        {currentTab === 'maps' && (
          <MapsView onSelectMap={handleSelectMap} onSelectBrawler={handleSelectBrawler} lang={lang} />
        )}

        {currentTab === 'tierlist' && (
          <TierListView onSelectBrawler={handleSelectBrawler} onSelectMap={handleSelectMap} lang={lang} />
        )}

        {currentTab === 'leaderboards' && (
          <LeaderboardsView
            onSearchTag={handleSearch}
            onSelectBrawler={handleSelectBrawler}
            lang={lang}
          />
        )}
      </main>

      {/* Brawler Deep-Dive Wiki Modal */}
      <BrawlerWikiModal
        brawler={activeBrawler}
        onClose={() => setSelectedBrawlerId(null)}
        onSelectMap={handleSelectMap}
        lang={lang}
      />

      {/* Tactical Map Detail Modal */}
      <MapDetailModal
        map={activeMap}
        onClose={() => setSelectedMapId(null)}
        onSelectBrawler={handleSelectBrawler}
        lang={lang}
      />

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isQuickSearchOpen}
        onClose={() => setIsQuickSearchOpen(false)}
        onSearch={handleSearch}
        lang={lang}
      />

      {/* Global Footer */}
      <Footer onSelectTab={setCurrentTab} lang={lang} />
    </div>
  );
}
