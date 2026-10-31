import React from 'react';
import { GameMap } from '../types/brawl';
import { MODE_CONFIG } from '../utils/rarityColors';
import { Language, TRANSLATIONS } from '../i18n/translations';

interface MapBlueprintProps {
  map: GameMap;
  size?: 'compact' | 'full';
  className?: string;
  lang?: Language;
}

export const MapBlueprint: React.FC<MapBlueprintProps> = ({
  map,
  size = 'full',
  className = '',
  lang = 'en',
}) => {
  const modeInfo = MODE_CONFIG[map.mode] || { color: '#3b82f6', iconBg: 'bg-blue-600' };
  const t = TRANSLATIONS[lang].maps;

  const renderCell = (cellValue: number, rowIdx: number, colIdx: number) => {
    switch (cellValue) {
      case 1:
        return (
          <div
            key={`${rowIdx}-${colIdx}`}
            className="w-full h-full bg-slate-700 border border-slate-600 rounded-sm shadow-inner flex items-center justify-center"
            title="Obstacle / Wall"
          >
            <div className="w-1.5 h-1.5 bg-slate-500 rounded-xs opacity-60"></div>
          </div>
        );
      case 2:
        return (
          <div
            key={`${rowIdx}-${colIdx}`}
            className="w-full h-full bg-emerald-800/80 border border-emerald-600/40 rounded-sm flex items-center justify-center"
            title="Bush / Concealment"
          >
            <span className="text-[8px] text-emerald-400">🌿</span>
          </div>
        );
      case 3:
        return (
          <div
            key={`${rowIdx}-${colIdx}`}
            className="w-full h-full bg-cyan-700/70 border border-cyan-500/40 rounded-sm flex items-center justify-center animate-pulse"
            title="Water / River"
          >
            <div className="w-2 h-0.5 bg-cyan-300 rounded-full opacity-60"></div>
          </div>
        );
      case 4:
        return (
          <div
            key={`${rowIdx}-${colIdx}`}
            className="w-full h-full bg-amber-500/80 border-2 border-amber-300 rounded-sm flex items-center justify-center shadow-md animate-bounce"
            title="Objective / Goal / Safe / Gem Mine"
          >
            <span className="text-[10px] text-black font-black">★</span>
          </div>
        );
      default:
        return (
          <div
            key={`${rowIdx}-${colIdx}`}
            className="w-full h-full bg-[#16202c]/60 border border-slate-800/40 hover:bg-slate-800/50 transition-colors"
          />
        );
    }
  };

  return (
    <div className={`relative bg-[#0d1520] border border-slate-800 rounded-2xl p-4 overflow-hidden shadow-xl ${className}`}>
      {/* Background blueprint grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

      {/* Blueprint Header */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-heading text-white" style={{ backgroundColor: modeInfo.color }}>
            {map.mode}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {lang === 'tr' ? `Tema: ${map.environment}` : `Environment: ${map.environment}`}
          </span>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
          TAC-GRID v2.4
        </span>
      </div>

      {/* Tactical Canvas Grid */}
      <div className="relative mx-auto w-full max-w-[360px] aspect-square p-2 bg-[#0a0f16] border-2 border-slate-700/80 rounded-xl shadow-2xl flex flex-col justify-between">
        <div className="absolute top-1 left-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
          {lang === 'tr' ? 'ÜST DOĞUŞ' : 'TOP SPAWN'}
        </div>
        <div className="absolute bottom-1 right-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
          {lang === 'tr' ? 'ALT DOĞUŞ' : 'BOTTOM SPAWN'}
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-10 grid-rows-10 gap-0.5 w-full h-full p-1">
          {map.layoutGrid.map((row, rIdx) =>
            row.map((cell, cIdx) => renderCell(cell, rIdx, cIdx))
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-4 gap-2 text-[10px] text-slate-400 font-medium pt-2 border-t border-slate-800/80">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-slate-700 border border-slate-500 rounded-xs"></div>
          <span>{t.legendWall}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-emerald-800 border border-emerald-500 rounded-xs"></div>
          <span>{t.legendBush}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-cyan-700 border border-cyan-400 rounded-xs"></div>
          <span>{t.legendWater}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-amber-500 border border-amber-300 rounded-xs"></div>
          <span>{t.legendObjective}</span>
        </div>
      </div>
    </div>
  );
};
