import React, { useState, useEffect } from 'react';
import { X, Megaphone, Pin, Tag, Calendar, Bell } from 'lucide-react';

export default function AnnouncementsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [announcements, setAnnouncements] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetch('/api/announcements')
      .then(res => res.json())
      .then(data => {
        if (data && data.announcements) setAnnouncements(data.announcements);
      })
      .catch(() => {});
  }, [isOpen]);

  const filtered = announcements.filter(a => filter === 'ALL' || a.category === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Campus Announcements</h3>
              <p className="text-xs text-slate-400">Official circulars & urgent notices</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter chips */}
        <div className="px-4 py-2 border-b border-slate-800/80 flex gap-2 overflow-x-auto no-scrollbar">
          {['ALL', 'EXAM', 'ACADEMIC', 'EVENTS'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                filter === f
                  ? 'bg-orange-500 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition ${
                item.pinned
                  ? 'bg-slate-800/80 border-orange-500/50 shadow-sm'
                  : 'bg-slate-800/40 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.category === 'EXAM' ? 'bg-rose-500/20 text-rose-400' :
                  item.category === 'EVENTS' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.category}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  {item.pinned && <Pin className="w-3 h-3 text-orange-400 fill-orange-400" />}
                  {item.date}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug mt-1">{item.title}</h4>
              <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{item.summary}</p>
              <div className="mt-2 text-[10px] text-orange-400/90 font-medium">{item.author}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
