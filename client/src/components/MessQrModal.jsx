import React, { useState, useEffect } from 'react';
import { X, RefreshCw, ShieldCheck, Utensils, AlertTriangle, CheckCircle } from 'lucide-react';
import { fetchSignedQR } from '../services/api';

export default function MessQrModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [qrToken, setQrToken] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [loading, setLoading] = useState(false);
  const [activeMeal, setActiveMeal] = useState('Lunch');

  const loadToken = async () => {
    setLoading(true);
    const data = await fetchSignedQR('MESS');
    setLoading(false);
    if (data && data.token) {
      setQrToken(data);
      setSecondsLeft(30);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadToken();
      const interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            loadToken();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  const progressPercent = (secondsLeft / 30) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Top banner */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-4 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="text-sm font-bold">LPU Mess Digital Pass</h3>
              <p className="text-[10px] text-orange-100">{user?.hostelBlock || 'BH-4'} Mess Counter</p>
            </div>
          </div>
        </div>

        {/* Meal Switcher */}
        <div className="px-4 pt-3 flex gap-1.5">
          {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((meal) => (
            <button
              key={meal}
              onClick={() => setActiveMeal(meal)}
              className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition ${
                activeMeal === meal
                  ? 'bg-orange-500 text-white shadow'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {meal}
            </button>
          ))}
        </div>

        {/* QR Body */}
        <div className="p-5 flex flex-col items-center text-center">
          {/* Real simulated QR container with rotating token signature */}
          <div className="relative p-4 rounded-2xl bg-white shadow-xl border-4 border-orange-500/30">
            {/* Visual SVG QR representation */}
            <div className="w-44 h-44 bg-slate-100 rounded-xl flex flex-col items-center justify-center relative overflow-hidden p-2">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                {/* Simulated high-density QR modules */}
                <rect x="5" y="5" width="28" height="28" rx="4" fill="#0B192C" />
                <rect x="10" y="10" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="14" y="14" width="10" height="10" rx="1" fill="#F37021" />

                <rect x="67" y="5" width="28" height="28" rx="4" fill="#0B192C" />
                <rect x="72" y="10" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="76" y="14" width="10" height="10" rx="1" fill="#F37021" />

                <rect x="5" y="67" width="28" height="28" rx="4" fill="#0B192C" />
                <rect x="10" y="72" width="18" height="18" rx="2" fill="#FFFFFF" />
                <rect x="14" y="76" width="10" height="10" rx="1" fill="#F37021" />

                {/* Random QR data points */}
                <circle cx="45" cy="15" r="3" fill="#0B192C" />
                <circle cx="55" cy="22" r="3" fill="#0B192C" />
                <circle cx="42" cy="35" r="3" fill="#0B192C" />
                <circle cx="55" cy="45" r="3" fill="#F37021" />
                <circle cx="48" cy="55" r="3" fill="#0B192C" />
                <circle cx="65" cy="55" r="3" fill="#0B192C" />
                <circle cx="45" cy="75" r="3" fill="#0B192C" />
                <circle cx="58" cy="82" r="3" fill="#0B192C" />
                <circle cx="75" cy="72" r="3" fill="#0B192C" />
                <circle cx="85" cy="85" r="3" fill="#0B192C" />
                <rect x="36" y="6" width="4" height="18" fill="#0B192C" />
                <rect x="6" y="38" width="24" height="4" fill="#0B192C" />
                <rect x="40" y="85" width="14" height="4" fill="#0B192C" />
                <rect x="72" y="42" width="20" height="4" fill="#0B192C" />
              </svg>

              {/* Student reg badge centered */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="px-2 py-0.5 rounded bg-white/95 border border-orange-500 shadow text-[9px] font-mono font-black text-orange-600">
                  {user?.regNo || '12109842'}
                </div>
              </div>
            </div>
          </div>

          {/* Student identifier */}
          <div className="mt-3">
            <h4 className="text-sm font-bold text-white">{user?.name || 'Rohit Kumar'}</h4>
            <div className="text-[11px] font-mono text-orange-400 mt-0.5">
              {user?.regNo} • Room {user?.roomNo || '412-B'}
            </div>
          </div>

          {/* 30-Second TTL Dynamic Countdown Bar */}
          <div className="w-full mt-3.5 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-1000 ${
                secondsLeft <= 5 ? 'bg-rose-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between w-full text-[10px] text-slate-400 mt-1.5 px-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Signed SHA-256 Token
            </span>
            <span className="font-mono text-slate-300">
              Refreshes in <strong className="text-orange-400 font-bold">{secondsLeft}s</strong>
            </span>
          </div>

          {/* Refresh button */}
          <button
            onClick={loadToken}
            disabled={loading}
            className="mt-3 w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 border border-slate-700 transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-orange-400 ${loading ? 'animate-spin' : ''}`} />
            Refresh Pass Now
          </button>
        </div>
      </div>
    </div>
  );
}
