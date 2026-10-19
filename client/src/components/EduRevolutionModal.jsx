import React, { useState, useEffect } from 'react';
import { X, GraduationCap, Download, Video, FileText, BookOpen, Search } from 'lucide-react';
import { fetchEduResources } from '../services/api';

export default function EduRevolutionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchEduResources().then(res => {
      if (res && res.resources) setResources(res.resources);
    });
  }, [isOpen]);

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.courseCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Edu Revolution Hub</h3>
              <p className="text-xs text-slate-400">Digital Lecture Notes, PYQs & Video Lectures</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 py-2 border-b border-slate-800 bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by course code or topic (e.g. MTH165, AutoCAD)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
            />
          </div>
        </div>

        {/* Resources list */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-750 flex items-center justify-between"
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                  item.type === 'VIDEO' ? 'bg-rose-500/20 text-rose-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.type === 'VIDEO' ? <Video className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-mono text-[10px] font-bold text-orange-400 bg-orange-500/10 px-1.5 py-0.2 rounded">
                      {item.courseCode}
                    </span>
                    <span className="text-[10px] text-slate-400">{item.size}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{item.title}</h4>
                  <span className="text-[10px] text-slate-400">{item.downloads} students downloaded</span>
                </div>
              </div>

              <button
                onClick={() => alert(`Downloading "${item.title}"... Saved to local device.`)}
                className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow"
                title="Download Resource"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
