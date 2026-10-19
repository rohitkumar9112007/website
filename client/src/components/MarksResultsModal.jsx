import React, { useState, useEffect } from 'react';
import { X, Award, TrendingUp, Sparkles, BookOpen, Calculator } from 'lucide-react';
import { fetchMarksBreakdown } from '../services/api';

export default function MarksResultsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [data, setData] = useState(null);
  const [targetSgpa, setTargetSgpa] = useState(8.8);

  useEffect(() => {
    fetchMarksBreakdown().then(res => {
      if (res) setData(res);
    });
  }, [isOpen]);

  const breakdown = data?.breakdown || [];
  const semesterHistory = data?.semesterHistory || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Results & Marks Breakdown</h3>
              <p className="text-xs text-slate-400">Continuous Assessment, MTE & Grade Predictor</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          
          {/* CGPA Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-orange-950/40 border border-amber-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cumulative CGPA</div>
              <div className="text-3xl font-black text-white mt-0.5">{data?.cgpa || '8.42'}</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                Top 8% in Computer Science Department
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400">Total Credits</div>
              <div className="text-xl font-extrabold text-orange-400 mt-0.5">136</div>
              <span className="text-[9px] text-slate-500 block">Graduation: 160</span>
            </div>
          </div>

          {/* SGPA Semester Progression */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Semester SGPA Progression
            </div>
            <div className="grid grid-cols-3 gap-2">
              {semesterHistory.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-750 text-center">
                  <div className="text-[10px] text-slate-400">{s.sem}</div>
                  <div className="text-sm font-black text-amber-400 mt-0.5">{s.sgpa}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Internal Marks Breakup Table */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Current Semester Marks (CA & MTE)
            </div>
            <div className="space-y-2">
              {breakdown.map((item) => (
                <div
                  key={item.courseCode}
                  className="p-3 rounded-2xl bg-slate-800/60 border border-slate-750 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                      {item.courseCode}
                    </span>
                    <span className="text-xs font-bold text-white line-clamp-1 flex-1 mx-2">
                      {item.courseTitle}
                    </span>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {item.grade}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1 pt-1.5 border-t border-slate-750 text-[10px] text-center text-slate-300">
                    <div className="bg-slate-900/60 p-1 rounded">CA 1: <strong>{item.ca1}/30</strong></div>
                    <div className="bg-slate-900/60 p-1 rounded">CA 2: <strong>{item.ca2}/30</strong></div>
                    <div className="bg-slate-900/60 p-1 rounded">MTE: <strong>{item.mte}/50</strong></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Grade Predictor */}
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-orange-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-orange-400" />
                Target Grade Predictor
              </span>
              <span className="font-mono text-xs font-bold text-orange-400">{targetSgpa} SGPA</span>
            </div>

            <input
              type="range"
              min="7.5"
              max="10.0"
              step="0.1"
              value={targetSgpa}
              onChange={(e) => setTargetSgpa(parseFloat(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />

            <div className="text-[11px] text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-750">
              To secure <strong>{targetSgpa} SGPA</strong>, you need an average of{' '}
              <strong className="text-orange-400">{Math.min(96, Math.round(targetSgpa * 9.8))}%</strong> marks in upcoming End-Term Examinations (ETE).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
