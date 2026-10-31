import React, { useState } from 'react';
import {
  Trophy,
  Swords,
  Compass,
  BarChart3,
  Users,
  Search,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

export type NavTab = 'home' | 'brawlers' | 'maps' | 'tierlist' | 'leaderboards' | 'profile';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenQuickSearch?: () => void;
  activePlayerTag?: string;
  lang: Language;
  onToggleLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenQuickSearch,
  activePlayerTag,
  lang,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[lang].nav;

  const NAV_ITEMS: Array<{ id: NavTab; label: string; icon: React.ReactNode }> = [
    { id: 'home', label: t.home, icon: <Sparkles className="w-4 h-4" /> },
    { id: 'brawlers', label: t.brawlers, icon: <Swords className="w-4 h-4" /> },
    { id: 'maps', label: t.maps, icon: <Compass className="w-4 h-4" /> },
    { id: 'tierlist', label: t.tierlist, icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'leaderboards', label: t.leaderboards, icon: <Users className="w-4 h-4" /> },
  ];

  const handleTabClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const handleToggleLangClick = () => {
    onToggleLanguage(lang === 'tr' ? 'en' : 'tr');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0c10]/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleTabClick('home')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group select-none shrink-0"
        >
          {/* Stylized Brawl Trophy / Gem Icon */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 p-0.5 shadow-md group-hover:shadow-amber-500/40 transition-shadow">
            <div className="w-full h-full bg-[#0a0f16] rounded-[14px] flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-lg sm:text-2xl text-white tracking-wider">
                BRAWL<span className="text-amber-400">META</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-heading px-1.5 py-0.2 bg-gradient-to-r from-red-600 to-amber-500 text-white rounded shadow-xs">
                PRO
              </span>
            </div>
            <div className="text-[10px] font-mono text-slate-400 -mt-0.5 hidden sm:block">
              {lang === 'tr' ? 'Brawl Stars İstatistik & Meta' : 'Brawlify Stats & Tier Lists'}
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#121924]/80 p-1.5 rounded-2xl border border-slate-800">
          {NAV_ITEMS.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-3 py-2 rounded-xl text-xs font-heading uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-black font-black shadow-md'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}

          {activePlayerTag && (
            <button
              onClick={() => handleTabClick('profile')}
              className={`px-3 py-2 rounded-xl text-xs font-heading uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'profile'
                  ? 'bg-purple-600 text-white font-black shadow-md'
                  : 'text-purple-300 hover:text-white hover:bg-purple-950/50'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{t.activeProfile}</span>
            </button>
          )}
        </nav>

        {/* Right Action: Ultra-compact Language Switcher & Quick Search */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Ultra-compact Single-Button Language Toggle (Takes minimal space on mobile) */}
          <button
            onClick={handleToggleLangClick}
            className="px-2 sm:px-2.5 py-1.5 rounded-xl bg-[#131b27] hover:bg-slate-800 border border-slate-700/80 text-white text-xs font-heading flex items-center gap-1.5 transition-all shadow-sm cursor-pointer active:scale-95"
            title={lang === 'tr' ? "Switch to English" : "Türkçe'ye Geç"}
          >
            <span className="text-sm">{lang === 'tr' ? '🇹🇷' : '🇬🇧'}</span>
            <span className="text-[11px] font-bold tracking-wider">{lang === 'tr' ? 'TR' : 'EN'}</span>
          </button>

          {/* Quick Search trigger */}
          <button
            onClick={onOpenQuickSearch}
            className="p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-amber-300 text-xs font-heading flex items-center gap-1.5 transition-colors border border-slate-700 cursor-pointer"
            title={t.quickLookup}
          >
            <Search className="w-4 h-4 text-amber-400" />
            <span className="hidden xl:inline">{t.quickLookup}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-300 hover:text-white bg-slate-800 rounded-xl cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e141e] border-b border-slate-800 p-4 space-y-2 animate-in slide-in-from-top-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-heading uppercase tracking-wider flex items-center gap-2.5 ${
                currentTab === item.id
                  ? 'bg-amber-500 text-black font-black'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          {activePlayerTag && (
            <button
              onClick={() => handleTabClick('profile')}
              className={`w-full py-2.5 px-3 rounded-xl text-xs font-heading uppercase tracking-wider flex items-center gap-2.5 ${
                currentTab === 'profile'
                  ? 'bg-purple-600 text-white font-black'
                  : 'text-purple-300 hover:bg-purple-950/50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.activeProfile} ({activePlayerTag})</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">{t.selectLanguage}:</span>
            <button
              onClick={handleToggleLangClick}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-heading flex items-center gap-1.5 border border-slate-700"
            >
              <span>{lang === 'tr' ? '🇹🇷 Türkçe (Aktif)' : '🇬🇧 English (Active)'}</span>
              <span className="text-[10px] text-amber-400 font-bold ml-1">
                {lang === 'tr' ? '→ EN' : '→ TR'}
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
