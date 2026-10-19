import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Award, Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { fetchExamsSchedule, fetchAdmitCard } from '../services/api';

export default function ExamsModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [schedule, setSchedule] = useState([]);
  const [showAdmitCard, setShowAdmitCard] = useState(false);
  const [admitCard, setAdmitCard] = useState(null);

  useEffect(() => {
    fetchExamsSchedule().then(res => {
      if (res && res.schedule) setSchedule(res.schedule);
    });
    fetchAdmitCard().then(res => {
      if (res && res.admitCard) setAdmitCard(res.admitCard);
    });
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Examinations & Datesheet</h3>
              <p className="text-xs text-slate-400">Mid-Term Examination (MTE) Spring 2026</p>
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
          
          {/* Action button for Admit Card */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white">Hall Ticket / Admit Card</div>
              <div className="text-[10px] text-slate-400">Verified for MTE & Practical Labs</div>
            </div>
            <button
              onClick={() => setShowAdmitCard(true)}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              View Admit Card
            </button>
          </div>

          {/* Datesheet Schedule List */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Official Examination Datesheet ({schedule.length} Papers)
            </div>

            {schedule.map((exam) => (
              <div
                key={exam.id}
                className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-750 hover:border-slate-700 space-y-2 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-rose-400 border border-slate-700">
                      {exam.courseCode}
                    </span>
                    <span className="text-xs font-bold text-white">{exam.courseTitle}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                    {exam.examType}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-rose-400" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>
                      {exam.room} • <strong className="text-orange-400 font-mono">Seat: {exam.seatNo}</strong>
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-750 flex items-center justify-between">
                  <span>Reporting: <strong>{exam.reportingTime}</strong></span>
                  <span className="text-emerald-400 font-semibold">Seating Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADMIT CARD MODAL PREVIEW */}
        {showAdmitCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
            <div className="w-full max-w-sm bg-white text-slate-900 rounded-3xl p-5 shadow-2xl space-y-3 relative border-4 border-orange-500">
              <button
                onClick={() => setShowAdmitCard(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>

              {/* Admit Card Header */}
              <div className="border-b-2 border-slate-200 pb-2 text-center">
                <h3 className="text-sm font-extrabold text-orange-600 uppercase tracking-tight">
                  LOVELY PROFESSIONAL UNIVERSITY
                </h3>
                <p className="text-[10px] text-slate-600 font-bold">OFFICIAL EXAMINATION ADMIT CARD (SPRING 2026)</p>
              </div>

              {/* Student Details */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Student Name</span>
                  <strong>{user?.name}</strong>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Registration No</span>
                  <strong className="font-mono text-orange-600">{user?.regNo}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-[9px] text-slate-500 uppercase block">Program</span>
                  <span>{user?.program}</span>
                </div>
              </div>

              {/* Subjects List */}
              <div className="text-[10px] space-y-1">
                <div className="font-bold text-slate-700 uppercase">Allocated Papers:</div>
                {schedule.map(s => (
                  <div key={s.id} className="flex justify-between border-b border-slate-100 py-0.5">
                    <span className="font-mono font-bold">{s.courseCode}</span>
                    <span>{s.date} ({s.room})</span>
                  </div>
                ))}
              </div>

              {/* Simulated Barcode */}
              <div className="p-2 bg-slate-100 rounded-xl text-center">
                <div className="font-mono font-black text-xs tracking-widest text-slate-800">
                  ||| | ||||| || |||| ||| |||| |
                </div>
                <span className="text-[9px] font-mono text-slate-500">LPU-EXAM-{user?.regNo}-2026</span>
              </div>

              <button
                onClick={() => {
                  alert("Admit Card downloaded successfully as PDF!");
                  setShowAdmitCard(false);
                }}
                className="w-full py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                Download / Print Admit Card
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
