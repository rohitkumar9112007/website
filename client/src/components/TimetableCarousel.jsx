import React from 'react';
import { Clock, MapPin, CheckCircle2, XCircle, AlertCircle, Radio, Sparkles, ChevronRight } from 'lucide-react';

export default function TimetableCarousel({ slots, onSelectSlot, isFaculty }) {
  const getAttendanceChip = (status) => {
    switch (status) {
      case 'PRESENT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Present
          </span>
        );
      case 'ABSENT':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <XCircle className="w-3 h-3 text-rose-400" />
            Absent
          </span>
        );
      case 'NOT_MARKED':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <AlertCircle className="w-3 h-3 text-amber-400" />
            Not marked
          </span>
        );
    }
  };

  return (
    <section className="mt-3 px-4">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-orange-500"></div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Today's Timetable</h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
            {slots?.length || 0} Slots
          </span>
        </div>
        <button className="text-[11px] font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-0.5">
          Full Schedule <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Horizontally Scrollable Class Tiles */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1.5 pt-0.5 snap-x snap-mandatory">
        {slots && slots.map((slot) => {
          const isLive = slot.isLive;
          const isBreak = slot.type === 'Break';

          return (
            <div
              key={slot.id}
              onClick={() => onSelectSlot && onSelectSlot(slot)}
              className={`min-w-[245px] max-w-[260px] flex-shrink-0 snap-start rounded-2xl p-3.5 transition-all duration-200 cursor-pointer relative overflow-hidden border ${
                isLive
                  ? 'bg-gradient-to-br from-slate-900 via-orange-950/30 to-slate-900 border-orange-500/80 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500/40'
                  : isBreak
                  ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Highlight badge for active class */}
              {isLive && (
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-[10px] font-bold text-orange-400">
                  <span className="w-2 h-2 rounded-full bg-orange-500 live-beacon"></span>
                  LIVE NOW
                </div>
              )}

              {/* Course code & type */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs font-black tracking-tight font-mono px-2 py-0.5 rounded-md ${
                  slot.courseCode === 'MTH165'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : slot.courseCode === 'MEC136'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : isBreak
                    ? 'bg-slate-700/40 text-slate-400 border border-slate-600/30'
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}>
                  {slot.courseCode}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{slot.type}</span>
              </div>

              {/* Course Title */}
              <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1 mb-2">
                {slot.courseTitle}
              </h4>

              {/* Time slot & Room */}
              <div className="space-y-1 mb-3 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-semibold text-slate-200">{slot.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-300">
                    Room: <strong className="text-white font-mono">{slot.room}</strong>
                  </span>
                </div>
              </div>

              {/* Bottom footer: live attendance chip and faculty */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[10px] text-slate-400 truncate max-w-[120px]">
                  {slot.faculty}
                </div>
                <div>
                  {!isBreak && getAttendanceChip(slot.attendanceStatus)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
