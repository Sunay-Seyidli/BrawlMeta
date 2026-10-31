import React from 'react';
import { Trophy, Shield, Heart, Sparkles, Zap, ExternalLink } from 'lucide-react';
import { NavTab } from './Header';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  lang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, lang = 'en' }) => {
  const t = TRANSLATIONS[lang].footer;
  const tNav = TRANSLATIONS[lang].nav;

  return (
    <footer className="mt-16 bg-[#080a0e] border-t border-slate-800/80 pt-12 pb-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5">
                <div className="w-full h-full bg-[#0a0f16] rounded-[10px] flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
              </div>
              <span className="font-heading text-lg text-white">
                BRAWL<span className="text-amber-400">META</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {t.description}
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-heading text-white text-xs uppercase tracking-wider mb-3">
              {t.navigation}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {tNav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('brawlers')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {tNav.brawlers}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('maps')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {tNav.maps}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tierlist')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {tNav.tierlist}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('leaderboards')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {tNav.leaderboards}
                </button>
              </li>
            </ul>
          </div>

          {/* Meta Features */}
          <div>
            <h4 className="font-heading text-white text-xs uppercase tracking-wider mb-3">
              {t.metaTools}
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>{lang === 'tr' ? 'Oyuncu Profili & Savaş Geçmişi Analizi' : 'Player Profile & Battle Log Analyzer'}</li>
              <li>{lang === 'tr' ? '1 - 11 Güç Seviyesi Özellik Kaydırıcısı' : 'Power 1 to 11 Attribute Scaling Slider'}</li>
              <li>{lang === 'tr' ? 'Oyun Modu & Harita Kademe Filtreleme' : 'Dynamic Mode & Map Tier Filtration'}</li>
              <li>{lang === 'tr' ? '10x10 Taktiksel Harita Planları' : 'Tactical Map Blueprints & Grid Overlays'}</li>
              <li>{lang === 'tr' ? 'Kulüp Kupaları & Üye Kadroları' : 'Club Trophies & Member Rosters'}</li>
            </ul>
          </div>

          {/* Legal / Supercell Fan Policy */}
          <div>
            <h4 className="font-heading text-white text-xs uppercase tracking-wider mb-3">
              {t.disclaimer}
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-500">
              {t.disclaimerText}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} BrawlMeta. {lang === 'tr' ? 'Tüm Brawl Stars oyuncuları ve topluluğu için geliştirildi.' : 'Built with passion for Brawl Stars players and competitors worldwide.'}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> {t.inspiredBy}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
