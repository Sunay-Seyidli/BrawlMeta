import React, { useState } from 'react';
import { Search, X, User, Users } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (tag: string, type: 'player' | 'club') => void;
  lang?: Language;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSearch,
  lang = 'en',
}) => {
  const [tagInput, setTagInput] = useState('');
  const [searchType, setSearchType] = useState<'player' | 'club'>('player');

  const tHero = TRANSLATIONS[lang].hero;
  const tNav = TRANSLATIONS[lang].nav;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagInput.trim()) return;
    onSearch(tagInput.trim(), searchType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-24 p-4">
      <div className="w-full max-w-lg bg-[#111722] border-2 border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 bg-[#0d121a] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-amber-400" />
            <span className="font-heading text-sm text-white uppercase tracking-wider">
              {tNav.quickLookup}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchType('player')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-heading uppercase transition-all cursor-pointer ${
                searchType === 'player'
                  ? 'bg-amber-500 text-black font-black'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tHero.playerTagTab}
            </button>
            <button
              type="button"
              onClick={() => setSearchType('club')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-heading uppercase transition-all cursor-pointer ${
                searchType === 'club'
                  ? 'bg-purple-600 text-white font-black'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {tHero.clubTagTab}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-mono font-bold">
              #
            </div>
            <input
              type="text"
              autoFocus
              value={tagInput.startsWith('#') ? tagInput.slice(1) : tagInput}
              onChange={(e) => setTagInput(e.target.value.toUpperCase().replace(/[^#0-9A-Z]/g, ''))}
              placeholder={searchType === 'player' ? tHero.placeholderPlayer : tHero.placeholderClub}
              className="w-full pl-8 pr-4 py-3 bg-[#0a0e14] border-2 border-slate-700 focus:border-amber-400 rounded-xl text-white font-mono font-bold text-base focus:outline-none tracking-wider uppercase"
              maxLength={12}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-heading font-black text-sm rounded-xl transition-all shadow-md cursor-pointer"
          >
            {tHero.analyzeBtn}
          </button>
        </form>
      </div>
    </div>
  );
};
