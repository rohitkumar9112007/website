import React from 'react';
import {
  Megaphone,
  GraduationCap,
  Receipt,
  UserCheck,
  FileText,
  CheckSquare,
  Award,
  Calendar,
  Clock,
  MessageSquareShare,
  LayoutDashboard,
  Sparkles,
  HelpCircle,
  TrendingUp,
  UtensilsCrossed,
  Shirt,
  LogOut,
  Search,
  Plus,
  SlidersHorizontal,
  ScanLine,
  QrCode
} from 'lucide-react';

const ICON_MAP = {
  Megaphone,
  GraduationCap,
  Receipt,
  UserCheck,
  FileText,
  CheckSquare,
  Award,
  Calendar,
  Clock,
  MessageSquareShare,
  LayoutDashboard,
  Sparkles,
  HelpCircle,
  TrendingUp,
  UtensilsCrossed,
  Shirt,
  LogOut,
  Search,
  ScanLine,
  QrCode
};

export default function QuickAccessGrid({
  enabledTiles,
  allTiles,
  onTileClick,
  onOpenCustomizer
}) {
  const visibleTiles = enabledTiles
    .map(id => allTiles.find(t => t.id === id))
    .filter(Boolean);

  return (
    <section className="mt-4 px-4 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Quick Access Services</h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
            {visibleTiles.length} active
          </span>
        </div>
        <button
          onClick={onOpenCustomizer}
          className="text-[11px] font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-orange-500/10 border border-orange-500/20 transition"
        >
          <SlidersHorizontal className="w-3 h-3" />
          Customize
        </button>
      </div>

      {/* Grid: 4 columns mobile-optimized, 6-8 columns on PC/tablet */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5 md:gap-3">
        {visibleTiles.map((tile) => {
          const IconComp = ICON_MAP[tile.icon] || FileText;

          return (
            <button
              key={tile.id}
              onClick={() => onTileClick(tile)}
              className="group flex flex-col items-center justify-start p-2 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 active:scale-95 transition-all border border-slate-800/80 hover:border-slate-700 relative text-center min-h-[88px]"
            >
              {tile.badge && (
                <span className="absolute -top-1.5 right-1 px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-orange-500 text-white shadow-sm border border-slate-950">
                  {tile.badge}
                </span>
              )}

              <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${tile.color || 'from-orange-500 to-amber-600'} flex items-center justify-center text-white shadow-md shadow-orange-500/10 mb-1.5 group-hover:scale-105 transition-transform`}>
                <IconComp className="w-5 h-5 text-white stroke-[2.2]" />
              </div>

              <span className="text-[11px] font-semibold text-slate-200 group-hover:text-white leading-tight line-clamp-2">
                {tile.name}
              </span>
            </button>
          );
        })}

        {/* Add More Tiles Button (+) */}
        <button
          onClick={onOpenCustomizer}
          className="flex flex-col items-center justify-center p-2 rounded-2xl border-2 border-dashed border-slate-700/80 hover:border-orange-500/60 bg-slate-900/30 hover:bg-orange-500/5 active:scale-95 transition text-center min-h-[88px] group"
        >
          <div className="w-11 h-11 rounded-xl bg-slate-800/80 group-hover:bg-orange-500/20 border border-slate-700/60 group-hover:border-orange-500/40 flex items-center justify-center text-slate-400 group-hover:text-orange-400 mb-1.5 transition">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-orange-400 leading-tight">
            Add Tiles
          </span>
          <span className="text-[8px] text-slate-400">(+)</span>
        </button>
      </div>
    </section>
  );
}
