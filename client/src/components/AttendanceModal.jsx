import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, AlertOctagon, Calculator, TrendingUp } from 'lucide-react';
import { fetchAttendanceSummary } from '../services/api';

export default function AttendanceModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [data, setData] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    fetchAttendanceSummary().then(res => {
      if (res && res.courses) {
        setData(res);
        setSelectedCourse(res.courses[0]);
      }
    });
  }, [isOpen]);

  const overall = data?.overall || { percentage: 84.8, status: 'safe', canSkip: 12, mustAttend: 0 };
  const courses = data?.courses || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Attendance & 75% Tracker
            </h3>
            <p className="text-xs text-slate-400">LPU Mandatory Attendance Policy (75%)</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 overflow-y-auto space-y-4">
          {/* Overall Attendance Card with Donut representation */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800/60 to-slate-900 border border-slate-700/80 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overall Attendance</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-white tracking-tight">{overall.percentage}%</span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  overall.percentage >= 80
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : overall.percentage >= 75
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  {overall.percentage >= 80 ? 'SAFE (>80%)' : overall.percentage >= 75 ? 'WARNING (75-80%)' : 'DETAINED RISK (<75%)'}
                </span>
              </div>
              <div className="text-[11px] text-slate-300 mt-2 flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-orange-400" />
                <span>
                  Total Safe Skips: <strong className="text-orange-400 font-bold">{overall.canSkip} classes</strong>
                </span>
              </div>
            </div>

            {/* Circular Donut Gauge */}
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.8"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className={overall.percentage >= 80 ? 'text-emerald-500' : overall.percentage >= 75 ? 'text-amber-500' : 'text-rose-500'}
                  strokeDasharray={`${overall.percentage}, 100`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xs font-bold text-white">{overall.percentage}%</span>
              </div>
            </div>
          </div>

          {/* Course-wise Breakup & Skip Limit Calculator */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Course-wise Status & Skip Allowance
            </div>

            <div className="space-y-2.5">
              {courses.map((course) => {
                const metrics = course.metrics;
                const isSelected = selectedCourse?.id === course.id;

                return (
                  <div
                    key={course.id}
                    onClick={() => setSelectedCourse(course)}
                    className={`p-3 rounded-2xl border cursor-pointer transition ${
                      isSelected
                        ? 'bg-slate-800/90 border-orange-500/60 ring-1 ring-orange-500/30'
                        : 'bg-slate-800/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-900 text-orange-400 border border-slate-700">
                          {course.code}
                        </span>
                        <span className="text-xs font-bold text-white line-clamp-1">{course.title}</span>
                      </div>
                      <span className={`text-xs font-extrabold ${
                        metrics.percentage >= 80 ? 'text-emerald-400' : metrics.percentage >= 75 ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {metrics.percentage}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden my-2 border border-slate-800">
                      <div
                        className={`h-full ${
                          metrics.percentage >= 80 ? 'bg-emerald-500' : metrics.percentage >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${Math.min(100, metrics.percentage)}%` }}
                      ></div>
                    </div>

                    {/* Skip / Attend recommendation text */}
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{course.attendedLectures} / {course.totalLectures} lectures</span>
                      <div>
                        {metrics.canSkip > 0 ? (
                          <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Can skip {metrics.canSkip} classes
                          </span>
                        ) : metrics.mustAttend > 0 ? (
                          <span className="text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                            Must attend {metrics.mustAttend} classes
                          </span>
                        ) : (
                          <span className="text-amber-400 font-semibold">On the boundary (0 skips)</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
