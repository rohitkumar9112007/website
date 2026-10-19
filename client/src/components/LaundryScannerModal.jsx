import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  QrCode,
  Shirt,
  CheckCircle2,
  Package,
  Clock,
  ScanLine,
  Truck,
  ArrowRight,
  Plus,
  Minus,
  RotateCcw,
  Sparkles,
  Info
} from 'lucide-react';
import { scanLaundryQR, fetchLaundryOrders } from '../services/api';

const CLOTHES_CATEGORIES = [
  { id: 'jeans', name: 'Jeans', icon: '👖', defaultQty: 2 },
  { id: 'shirt', name: 'Shirt', icon: '👔', defaultQty: 2 },
  { id: 'tshirt', name: 'T-Shirt', icon: '👕', defaultQty: 2 },
  { id: 'lower', name: 'Lower / Track Pant', icon: '🩳', defaultQty: 1 },
  { id: 'towel', name: 'Towel', icon: '🧖‍♂️', defaultQty: 1 },
  { id: 'undergarments', name: 'Undergarments', icon: '🩲', defaultQty: 0 },
  { id: 'bedsheet', name: 'Bedsheet / Pillow Cover', icon: '🛏️', defaultQty: 0 },
  { id: 'jacket', name: 'Jacket / Hoodie', icon: '🧥', defaultQty: 0 },
  { id: 'other', name: 'Other Garments', icon: '📦', defaultQty: 0 }
];

export default function LaundryScannerModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('scan'); // 'scan' | 'orders'
  const [quantities, setQuantities] = useState({
    jeans: 2,
    shirt: 2,
    tshirt: 2,
    lower: 1,
    towel: 1,
    undergarments: 0,
    bedsheet: 0,
    jacket: 0,
    other: 0
  });

  const [orders, setOrders] = useState([]);
  const [lastScannedOrder, setLastScannedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const MAX_WASH_CAPACITY = 10;

  useEffect(() => {
    if (isOpen) {
      loadOrders();
      if (activeTab === 'scan') startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen, activeTab]);

  const loadOrders = async () => {
    const res = await fetchLaundryOrders();
    if (res && res.orders) setOrders(res.orders);
  };

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      }
    } catch (err) {
      // Graceful fallback to HUD
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  const updateQuantity = (id, delta) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Calculate total count
  const totalCount = Object.values(quantities).reduce((acc, qty) => acc + (qty || 0), 0);

  // Build human-readable breakdown
  const buildBreakdownString = () => {
    const parts = [];
    CLOTHES_CATEGORIES.forEach(cat => {
      const q = quantities[cat.id] || 0;
      if (q > 0) {
        parts.push(`${q} ${cat.name}${q > 1 && !cat.name.endsWith('s') ? 's' : ''}`);
      }
    });
    return parts.join(', ') || 'No clothes selected';
  };

  const handleStandardFill = () => {
    setQuantities({
      jeans: 2,
      shirt: 2,
      tshirt: 2,
      lower: 1,
      towel: 1,
      undergarments: 0,
      bedsheet: 0,
      jacket: 0,
      other: 0
    });
  };

  const handleReset = () => {
    setQuantities({
      jeans: 0,
      shirt: 0,
      tshirt: 0,
      lower: 0,
      towel: 0,
      undergarments: 0,
      bedsheet: 0,
      jacket: 0,
      other: 0
    });
  };

  const handleDropScan = async () => {
    if (totalCount === 0) {
      alert("Please add at least 1 clothing item before scanning.");
      return;
    }

    setLoading(true);
    const breakdown = buildBreakdownString();
    const res = await scanLaundryQR('DROP', totalCount, `LPU-BAG-${user?.roomNo || '412'}`, breakdown, quantities);
    setLoading(false);
    if (res && res.success) {
      setLastScannedOrder(res.order);
      loadOrders();
    }
  };

  const handleCollectScan = async () => {
    setLoading(true);
    const res = await scanLaundryQR('COLLECT');
    setLoading(false);
    if (res && res.success) {
      alert("Laundry bag verified and marked as collected!");
      loadOrders();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-sky-600 to-blue-700 text-white">
          <div className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-sky-200" />
            <div>
              <h3 className="text-sm font-bold tracking-tight">Hostel Laundry QR Scanner</h3>
              <p className="text-[10px] text-sky-100">{user?.hostelBlock || 'BH-4'} Laundry Counter</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 p-1">
          <button
            onClick={() => { setActiveTab('scan'); setLastScannedOrder(null); }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'scan' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ScanLine className="w-3.5 h-3.5" />
            Scan Clothes for Wash
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'orders' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            Laundry Orders ({orders.length})
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'scan' && (
            <>
              {lastScannedOrder ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-center animate-fadeIn space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white uppercase tracking-wider">
                      LAUNDRY BAG SCANNED & LOGGED
                    </span>
                    <h4 className="text-base font-black text-white mt-1.5">
                      Order {lastScannedOrder.id}
                    </h4>
                    <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 mt-2 text-left space-y-1">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Itemized Clothes Logged:</div>
                      <div className="font-semibold text-sky-400">{lastScannedOrder.breakdown}</div>
                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
                        <span>Total Quantity: <strong>{lastScannedOrder.garmentsCount} items</strong></span>
                        <span>{lastScannedOrder.counter}</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-sky-400 font-bold mt-2">
                      Ready for collection in 24 - 48 Hours
                    </div>
                  </div>
                  <button
                    onClick={() => setLastScannedOrder(null)}
                    className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md"
                  >
                    Scan Another Laundry Bag
                  </button>
                </div>
              ) : (
                /* Responsive Split Screen: Camera on left (md:col-span-5), Clothes selection on right (md:col-span-7) */
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                  
                  {/* Left Column: Camera Viewfinder & Actions */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-800 aspect-square max-h-[190px] md:max-h-[220px] flex items-center justify-center shadow-inner">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover opacity-80"
                      />

                      {/* Laser aiming reticle */}
                      <div className="relative w-36 h-36 border-2 border-sky-500/40 rounded-2xl z-10 flex items-center justify-center">
                        <div className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-sky-400 rounded-tl-lg"></div>
                        <div className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-sky-400 rounded-tr-lg"></div>
                        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-sky-400 rounded-bl-lg"></div>
                        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-sky-400 rounded-br-lg"></div>
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-bounce"></div>
                      </div>

                      <div className="absolute bottom-2 text-[10px] font-mono text-sky-400 bg-slate-950/80 px-2 py-0.5 rounded border border-sky-500/30">
                        POINT CAMERA AT BAG TAG / DESK QR
                      </div>
                    </div>

                    {/* Scan Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={handleDropScan}
                        disabled={loading || totalCount === 0}
                        className="p-3 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 shadow-md disabled:opacity-50 transition active:scale-95"
                      >
                        <Package className="w-4 h-4" />
                        Scan Bag & Drop ({totalCount})
                      </button>

                      <button
                        onClick={handleCollectScan}
                        disabled={loading}
                        className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-750 text-white font-bold text-xs flex flex-col items-center justify-center gap-1 transition active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Scan Desk & Collect
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Itemized Clothes Quantity Selection */}
                  <div className="md:col-span-7 space-y-3">
                    <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-white flex items-center gap-1.5">
                            <Shirt className="w-4 h-4 text-sky-400" />
                            Clothes Quantity by Category
                          </span>
                          <p className="text-[10px] text-slate-400">Fill categories for washing (Jeans, Shirt, Lower, Towel, etc.)</p>
                        </div>

                        <div className="text-right">
                          <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-full ${
                            totalCount > MAX_WASH_CAPACITY
                              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          }`}>
                            {totalCount} / {MAX_WASH_CAPACITY} Clothes
                          </span>
                        </div>
                      </div>

                      {/* Capacity bar */}
                      <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                        <div
                          className={`h-full transition-all duration-300 ${
                            totalCount > MAX_WASH_CAPACITY ? 'bg-rose-500' : 'bg-gradient-to-r from-sky-500 to-blue-500'
                          }`}
                          style={{ width: `${Math.min(100, (totalCount / MAX_WASH_CAPACITY) * 100)}%` }}
                        ></div>
                      </div>

                      {/* Quick fill preset chips */}
                      <div className="flex gap-1.5 pt-1">
                        <button
                          onClick={handleStandardFill}
                          className="text-[10px] px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 hover:bg-sky-500/20 border border-sky-500/20 transition"
                        >
                          ⚡ Standard Wash (8 items)
                        </button>
                        <button
                          onClick={handleReset}
                          className="text-[10px] px-2 py-1 rounded-lg bg-slate-700/60 text-slate-300 hover:bg-slate-700 border border-slate-600 transition"
                        >
                          Reset All
                        </button>
                      </div>
                    </div>

                    {/* ITEM-BY-NAME GRID: 1 col on phone, 2 cols on tablet/PC */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                      {CLOTHES_CATEGORIES.map((cat) => {
                        const qty = quantities[cat.id] || 0;

                        return (
                          <div
                            key={cat.id}
                            className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 border border-slate-750 hover:border-slate-700"
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-base">{cat.icon}</span>
                              <span className="text-xs font-semibold text-slate-200">{cat.name}</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => updateQuantity(cat.id, -1)}
                                disabled={qty <= 0}
                                className="w-6 h-6 rounded-lg bg-slate-700 hover:bg-slate-650 disabled:opacity-30 text-white flex items-center justify-center transition active:scale-95"
                              >
                                <Minus className="w-3 h-3" />
                              </button>

                              <span className="w-5 text-center text-xs font-mono font-bold text-white">
                                {qty}
                              </span>

                              <button
                                onClick={() => updateQuantity(cat.id, 1)}
                                disabled={totalCount >= MAX_WASH_CAPACITY}
                                className="w-6 h-6 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-30 text-white flex items-center justify-center transition active:scale-95"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Current Summary Preview */}
                    <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300">
                      <span className="text-slate-400 font-bold">Selected Breakdown: </span>
                      <strong className="text-sky-300">{buildBreakdownString()}</strong>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: LAUNDRY ORDERS HISTORY (Responsive 2-col on PC) */}
          {activeTab === 'orders' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-750 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-sky-400">{ord.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      ord.status === 'READY_FOR_PICKUP' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      ord.status === 'COLLECTED' ? 'bg-slate-700 text-slate-300' :
                      'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    <strong>{ord.garmentsCount} Clothes:</strong> {ord.breakdown}
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/60">
                    <span>Dropped: {ord.dropDate}</span>
                    <span>{ord.counter}</span>
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
