import React, { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, MapPin, Ticket, CheckCircle2, QrCode } from 'lucide-react';
import { fetchEvents, rsvpEvent } from '../services/api';

export default function HappeningsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [events, setEvents] = useState([]);
  const [activePass, setActivePass] = useState(null);

  useEffect(() => {
    fetchEvents().then(res => {
      if (res && res.events) setEvents(res.events);
    });
  }, [isOpen]);

  const handleRSVP = async (evt) => {
    const res = await rsvpEvent(evt.id);
    if (res && res.success) {
      setActivePass({ ...evt, pass: res.ticketPass });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Happenings & Campus Life</h3>
              <p className="text-xs text-slate-400">One World, YouthVibe & University Events</p>
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
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="p-4 rounded-3xl bg-slate-800/70 border border-slate-750 hover:border-slate-700 space-y-2.5 transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  {evt.category}
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  {evt.date}
                </span>
              </div>

              <h4 className="text-sm font-bold text-white">{evt.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{evt.description}</p>

              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{evt.venue}</span>
              </div>

              <div className="pt-2 border-t border-slate-750 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">Entry: Student ID Valid</span>
                <button
                  onClick={() => handleRSVP(evt)}
                  className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs flex items-center gap-1 shadow"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  RSVP & Get Entry Pass
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PASS MODAL */}
        {activePass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
            <div className="w-full max-w-xs bg-slate-900 border-2 border-pink-500 rounded-3xl p-5 text-center shadow-2xl space-y-3 relative">
              <button
                onClick={() => setActivePass(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto border border-pink-500/30">
                <Ticket className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-sm font-black text-white">{activePass.title}</h4>
                <p className="text-[10px] text-pink-400 font-bold">DIGITAL AUDITORIUM ENTRY PASS</p>
              </div>

              <div className="p-3 bg-white rounded-2xl mx-auto w-36 h-36 flex items-center justify-center shadow-md">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Pass Code</div>
                <div className="text-base font-mono font-black text-pink-400 tracking-wider">{activePass.pass}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
