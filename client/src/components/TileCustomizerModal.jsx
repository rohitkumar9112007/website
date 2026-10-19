import React, { useState } from 'react';
import { X, Check, ArrowUp, ArrowDown, RotateCcw, Save, Sparkles } from 'lucide-react';

export default function TileCustomizerModal({
  isOpen,
  onClose,
  allTiles,
  enabledTiles,
  onSave
}) {
  if (!isOpen) return null;

  // Local state for customized ordering and active tiles
  const [currentEnabled, setCurrentEnabled] = useState([...enabledTiles]);

  const isTileActive = (id) => currentEnabled.includes(id);

  const toggleTile = (id) => {
    if (currentEnabled.includes(id)) {
      if (currentEnabled.length <= 4) {
        alert("Please keep at least 4 quick-access tiles enabled.");
        return;
      }
      setCurrentEnabled(currentEnabled.filter(t => t !== id));
    } else {
      setCurrentEnabled([...currentEnabled, id]);
    }
  };

  const moveTile = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= currentEnabled.length) return;
    const copy = [...currentEnabled];
    const [moved] = copy.splice(index, 1);
    copy.splice(newIndex, 0, moved);
    setCurrentEnabled(copy);
  };

  const handleReset = () => {
    const defaults = allTiles.slice(0, 10).map(t => t.id);
    setCurrentEnabled(defaults);
  };

  const handleSave = () => {
    onSave(currentEnabled);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn p-0 sm:p-4">
      <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Customize Quick Tiles
            </h3>
            <p className="text-xs text-slate-400">Toggle & arrange your personal home tiles</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Active tiles section with ordering */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Active on Home Screen ({currentEnabled.length})
              </span>
              <span className="text-[10px] text-slate-400">Use arrows to reorder</span>
            </div>

            <div className="space-y-1.5">
              {currentEnabled.map((id, index) => {
                const tile = allTiles.find(t => t.id === id);
                if (!tile) return null;

                return (
                  <div
                    key={tile.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/70"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xs font-mono text-slate-400 w-4">{index + 1}</span>
                      <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${tile.color || 'from-orange-500 to-amber-600'} flex items-center justify-center text-white text-xs font-bold`}>
                        {tile.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">{tile.name}</div>
                        <div className="text-[10px] text-slate-400">{tile.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveTile(index, -1)}
                        disabled={index === 0}
                        className="w-7 h-7 rounded bg-slate-700 disabled:opacity-30 hover:bg-slate-600 flex items-center justify-center text-slate-200"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveTile(index, 1)}
                        disabled={index === currentEnabled.length - 1}
                        className="w-7 h-7 rounded bg-slate-700 disabled:opacity-30 hover:bg-slate-600 flex items-center justify-center text-slate-200"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleTile(tile.id)}
                        className="ml-1 px-2 py-1 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-semibold hover:bg-rose-500/30"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Available tiles not currently active */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Available to Add
            </div>
            <div className="grid grid-cols-2 gap-2">
              {allTiles.map((tile) => {
                const active = isTileActive(tile.id);
                if (active) return null;

                return (
                  <button
                    key={tile.id}
                    onClick={() => toggleTile(tile.id)}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 text-left transition"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <div className={`w-6 h-6 rounded-md bg-gradient-to-tr ${tile.color} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                        +
                      </div>
                      <span className="text-xs font-medium text-slate-300 truncate">{tile.name}</span>
                    </div>
                    <span className="text-[10px] text-orange-400 font-bold ml-1">+ Add</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-bold text-white px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 shadow-md shadow-orange-500/20 transition"
          >
            <Save className="w-3.5 h-3.5" />
            Save & Persist Changes
          </button>
        </div>
      </div>
    </div>
  );
}
