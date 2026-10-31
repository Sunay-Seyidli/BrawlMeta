import React, { useState } from 'react';
import { Search, Sparkles, User, Users, AlertCircle } from 'lucide-react';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface HeroSearchProps {
  onSearch: (tag: string, type: 'player' | 'club') => void;
  isLoading?: boolean;
  lang?: Language;
}

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  isLoading = false,
  lang = 'en',
}) => {
  const [searchType, setSearchType] = useState<'player' | 'club'>('player');
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const t = TRANSLATIONS[lang].hero;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase();
    if (val.length > 0 && !val.startsWith('#')) {
      val = '#' + val;
    }
    val = val.replace(/[^#0-9A-Z]/g, '');
    setTagInput(val);
    if (error) setError(null);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanTag = tagInput.trim();

    if (!cleanTag || cleanTag === '#') {
      setError(t.errorTagEmpty);
      return;
    }

    if (cleanTag.length < 4) {
      setError(t.errorTagShort);
      return;
    }

    onSearch(cleanTag, searchType);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8 sm:py-12 px-4 text-center">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800/80 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-4 shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>{t.badge}</span>
      </div>

      {/* Massive Clean Title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading text-white tracking-tight uppercase drop-shadow-md leading-tight">
        {t.titlePart1} <span className="text-amber-400">{t.titleHighlight1}</span> {t.titlePart2} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">{t.titleHighlight2}</span>
      </h1>
      <p className="mt-3 text-xs sm:text-base text-slate-300 max-w-2xl mx-auto font-medium">
        {t.subtitle}
      </p>

      {/* Main Search Container */}
      <div className="mt-8 bg-[#111722]/90 backdrop-blur-md p-3 sm:p-5 rounded-3xl border-2 border-slate-700/80 shadow-2xl">
        {/* Search Type Selector Tabs */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => setSearchType('player')}
            className={`px-4 py-1.5 rounded-xl text-xs font-heading tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              searchType === 'player'
                ? 'bg-amber-500 text-black shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            {t.playerTagTab}
          </button>
          <button
            type="button"
            onClick={() => setSearchType('club')}
            className={`px-4 py-1.5 rounded-xl text-xs font-heading tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
              searchType === 'club'
                ? 'bg-purple-600 text-white shadow-md font-black'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            {t.clubTagTab}
          </button>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row items-center gap-2">
          <div className="relative w-full flex-1">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 font-mono font-bold text-lg">
              #
            </div>
            <input
              type="text"
              value={tagInput.startsWith('#') ? tagInput.slice(1) : tagInput}
              onChange={handleInputChange}
              placeholder={searchType === 'player' ? t.placeholderPlayer : t.placeholderClub}
              className="w-full pl-9 pr-4 py-3.5 sm:py-4 bg-[#0a0e14] border-2 border-slate-700 focus:border-amber-400 rounded-2xl text-slate-100 placeholder-slate-500 font-mono font-bold text-base sm:text-lg focus:outline-none transition-all shadow-inner tracking-wider uppercase"
              maxLength={12}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-heading font-black tracking-wider text-sm sm:text-base rounded-2xl transition-all shadow-lg hover:shadow-amber-500/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-95 shrink-0"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <Search className="w-5 h-5 stroke-[2.5]" />
            )}
            <span>{t.analyzeBtn}</span>
          </button>
        </form>

        {error && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-400 font-medium">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};
