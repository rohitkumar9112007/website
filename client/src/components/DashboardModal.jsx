import React from 'react';
import {
  X,
  LayoutDashboard,
  UserCheck,
  Award,
  Receipt,
  Calendar,
  CheckSquare,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

export default function DashboardModal({
  isOpen,
  onClose,
  user,
  onNavigateAction
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Student 360 Analytics</h3>
              <p className="text-xs text-slate-400">{user?.name} ({user?.regNo})</p>
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
        <div className="p-4 md:p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* Key Metric Tiles: 2 cols on mobile, 4 cols on PC */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-750">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Attendance</span>
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">84.8%</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-0.5">Above 75% rule (Safe)</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-750">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>CGPA</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-white mt-1">{user?.cgpa || '8.42'}</div>
              <div className="text-[10px] text-amber-400 font-semibold mt-0.5">Sem 5 SGPA: 8.62</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-750">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Fee Dues</span>
                <Receipt className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-1">₹0</div>
              <div className="text-[10px] text-slate-400 mt-0.5">All Sem Fees Paid</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-750">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Next Exam</span>
                <Calendar className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-xl font-black text-white mt-1">MTH165</div>
              <div className="text-[10px] text-rose-400 mt-0.5">Nov 3 • Block 38</div>
            </div>
          </div>

          {/* "What Needs My Attention Today" Checklist */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-slate-900 to-orange-950/30 border border-orange-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                What Needs Your Attention Today
              </h4>
            </div>

            <div className="space-y-2">
              <div
                onClick={() => { onClose(); onNavigateAction('attendance'); }}
                className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-orange-500/50 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                  <div>
                    <div className="text-xs font-bold text-white">INT219 Attendance Warning (71%)</div>
                    <div className="text-[10px] text-slate-400">Must attend next 5 lectures to cross 75%</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => { onClose(); onNavigateAction('assignment'); }}
                className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-orange-500/50 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  <div>
                    <div className="text-xs font-bold text-white">MTH165 Assignment 4 Due Tomorrow</div>
                    <div className="text-[10px] text-slate-400">Laplace Transforms Problem Set</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => { onClose(); onNavigateAction('mess-scanner'); }}
                className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-orange-500/50 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <div>
                    <div className="text-xs font-bold text-white">Mess Scanner Active for Lunch</div>
                    <div className="text-[10px] text-slate-400">Scan at BH-4 Mess counter before 2:30 PM</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
