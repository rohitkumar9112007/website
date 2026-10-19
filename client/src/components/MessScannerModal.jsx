import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ScanLine,
  Camera,
  CheckCircle2,
  Utensils,
  RefreshCw,
  Flashlight,
  SwitchCamera,
  AlertCircle,
  History,
  ShieldCheck,
  Ban
} from 'lucide-react';
import { scanMessQR, fetchMessHistory } from '../services/api';

export default function MessScannerModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('scanner'); // 'scanner' | 'history'
  const [mealType, setActiveMeal] = useState('Lunch');
  const [cameraActive, setCameraActive] = useState(true);
  const [scannedResult, setScannedResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize camera stream
  useEffect(() => {
    if (isOpen && activeTab === 'scanner') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, activeTab]);

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = async () => {
    const res = await fetchMessHistory();
    if (res && res.history) setHistory(res.history);
  };

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        setCameraError('Camera access not supported in this browser. Use simulated scanner below.');
      }
    } catch (err) {
      console.warn('Camera stream error:', err);
      setCameraError('Camera unavailable or permission denied. Using high-precision laser viewfinder simulator.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handlePerformScan = async (counterCode) => {
    setLoading(true);
    const code = counterCode || `LPU-MESS-${user?.hostelBlock ? user.hostelBlock.replace(/\s+/g, '') : 'BH4'}-CTR2`;
    const res = await scanMessQR(code, mealType);
    setLoading(false);
    if (res && res.success) {
      setScannedResult(res);
      loadHistory();
    }
  };

  const handleSkipMeal = () => {
    alert(`Diet rebate applied! Today's ${mealType} marked as skipped. ₹45 rebate credited to mess account.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-lg md:max-w-2xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-orange-600 to-amber-600 text-white">
          <div className="flex items-center gap-2">
            <ScanLine className="w-5 h-5 text-amber-200" />
            <div>
              <h3 className="text-sm font-bold tracking-tight">Mess QR Scanner</h3>
              <p className="text-[10px] text-orange-100">{user?.hostelBlock || 'BH-4'} Mess Gate Scanner</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch: Scanner vs Meal History */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1">
          <button
            onClick={() => { setActiveTab('scanner'); setScannedResult(null); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'scanner' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ScanLine className="w-3.5 h-3.5" />
            Live QR Scanner
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'history' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            Meal History ({history.length})
          </button>
        </div>

        {/* BODY */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'scanner' && (
            <>
              {/* Meal Selector */}
              <div className="flex gap-1.5">
                {['Breakfast', 'Lunch', 'Snacks', 'Dinner'].map((m) => (
                  <button
                    key={m}
                    onClick={() => { setActiveMeal(m); setScannedResult(null); }}
                    className={`flex-1 py-1 rounded-lg text-[10px] font-bold transition ${
                      mealType === m
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>

              {/* SUCCESS BADGE IF SCANNED */}
              {scannedResult ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-center animate-fadeIn space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white uppercase tracking-wider">
                      MEAL TOKEN VERIFIED
                    </span>
                    <h4 className="text-base font-black text-white mt-1.5">
                      {scannedResult.message}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Student: <strong>{user?.name}</strong> ({user?.regNo})
                    </p>
                    <p className="text-[11px] font-mono text-orange-400 mt-0.5">
                      {user?.hostelBlock} • Room {user?.roomNo || '412-B'}
                    </p>
                    <div className="text-[10px] text-slate-400 mt-2">
                      Logged at: {scannedResult.scan?.time}
                    </div>
                  </div>

                  <button
                    onClick={() => setScannedResult(null)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs shadow-md"
                  >
                    Scan Next Counter QR
                  </button>
                </div>
              ) : (
                /* CAMERA VIEWFINDER / SCANNER HUD */
                <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 aspect-square max-h-[260px] flex items-center justify-center shadow-inner">
                  {/* Real video stream */}
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                  />

                  {/* Aiming Reticle Frame */}
                  <div className="relative w-48 h-48 border-2 border-orange-500/40 rounded-2xl z-10 flex items-center justify-center">
                    {/* Corner notches */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-lg"></div>

                    {/* Animated Scanning Laser Line */}
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_12px_#f97316] animate-bounce"></div>

                    <div className="absolute -bottom-7 text-[10px] text-orange-400 font-mono font-bold bg-slate-950/80 px-2 py-0.5 rounded border border-orange-500/30">
                      POINT CAMERA AT MESS COUNTER
                    </div>
                  </div>

                  {/* Fallback Notice */}
                  {cameraError && (
                    <div className="absolute bottom-1 left-2 right-2 text-[9px] text-slate-400 bg-slate-900/90 p-1.5 rounded-lg border border-slate-800 text-center z-20">
                      {cameraError}
                    </div>
                  )}
                </div>
              )}

              {/* SIMULATED SCAN BUTTONS FOR INSTANT 1-TAP TESTING */}
              {!scannedResult && (
                <div className="space-y-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>1-Tap Test Scan Counter</span>
                    <span className="text-orange-400">Simulation Enabled</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handlePerformScan('LPU-MESS-BH4-CTR2')}
                      disabled={loading}
                      className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition flex items-center gap-2"
                    >
                      <Utensils className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">BH-4 Counter 2</div>
                        <div className="text-[9px] text-slate-400">Scan Lunch / Dinner</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handlePerformScan('LPU-MESS-BH1-MAIN')}
                      disabled={loading}
                      className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition flex items-center gap-2"
                    >
                      <ScanLine className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-bold text-white">BH-1 Central Mess</div>
                        <div className="text-[9px] text-slate-400">Scan Breakfast Gate</div>
                      </div>
                    </button>
                  </div>

                  {/* Skip Meal Option */}
                  <button
                    onClick={handleSkipMeal}
                    className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-[11px] font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition mt-1"
                  >
                    <Ban className="w-3.5 h-3.5 text-rose-400" />
                    Skip Today's {mealType} (Claim Diet Rebate)
                  </button>
                </div>
              )}
            </>
          )}

          {/* TAB 2: MEAL HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Recent Mess Gate Scans
              </div>
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                      <Utensils className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{item.meal} Entry</div>
                      <div className="text-[10px] text-slate-400">{item.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {item.status}
                    </span>
                    <div className="text-[9px] text-slate-400 mt-1">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
