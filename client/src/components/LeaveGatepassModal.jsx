import React, { useState, useEffect } from 'react';
import { X, LogOut, CheckCircle2, Clock, QrCode, Plus, Calendar, ShieldCheck } from 'lucide-react';
import { fetchLeaveRequests, applyLeave } from '../services/api';

export default function LeaveGatepassModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [leaves, setLeaves] = useState([]);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [reason, setReason] = useState('');
  const [fromDate, setFromDate] = useState('2026-10-24');
  const [toDate, setToDate] = useState('2026-10-26');
  const [submitting, setSubmitting] = useState(false);
  const [selectedPass, setSelectedPass] = useState(null);

  useEffect(() => {
    loadLeaves();
  }, [isOpen]);

  const loadLeaves = async () => {
    const res = await fetchLeaveRequests();
    if (res && res.requests) setLeaves(res.requests);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await applyLeave(reason, fromDate, toDate);
    setSubmitting(false);
    if (res && res.success) {
      alert("Leave application approved! Digital gatepass generated.");
      setShowApplyForm(false);
      setReason('');
      loadLeaves();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Leave & Digital Gatepass</h3>
              <p className="text-xs text-slate-400">Hostel Weekend Outing & Home Visits</p>
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
          
          {/* Apply button */}
          <button
            onClick={() => setShowApplyForm(!showApplyForm)}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            Apply New Hostel Leave / Gatepass
          </button>

          {/* New Leave Form */}
          {showApplyForm && (
            <form onSubmit={handleApply} className="p-4 rounded-2xl bg-slate-800/80 border border-emerald-500/40 space-y-3 animate-fadeIn">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Leave Details</div>
              
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Reason for Leave</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Weekend Family Visit to Ludhiana"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">Departure Date</label>
                  <input
                    type="date"
                    required
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">Return Date</label>
                  <input
                    type="date"
                    required
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                {submitting ? 'Submitting to Warden...' : 'Submit & Generate Gatepass'}
              </button>
            </form>
          )}

          {/* Active Leave Requests */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Leave & Gatepass History
            </div>

            {leaves.map((lv) => (
              <div
                key={lv.id}
                className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-750 hover:border-slate-700 space-y-2 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{lv.reason}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    lv.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {lv.status}
                  </span>
                </div>

                <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{lv.fromDate} ➔ {lv.toDate}</span>
                </div>

                {lv.gatepassCode && (
                  <div className="pt-2 border-t border-slate-750 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Gate Exit Code</span>
                      <strong className="font-mono text-emerald-400 text-sm tracking-wider">{lv.gatepassCode}</strong>
                    </div>

                    <button
                      onClick={() => setSelectedPass(lv)}
                      className="px-3 py-1.5 rounded-xl bg-slate-750 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1 border border-slate-700"
                    >
                      <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                      View Digital Pass
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DIGITAL GATEPASS MODAL */}
        {selectedPass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
            <div className="w-full max-w-xs bg-slate-900 border-2 border-emerald-500 rounded-3xl p-5 text-center shadow-2xl space-y-3 relative">
              <button
                onClick={() => setSelectedPass(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-sm font-black text-white uppercase">LPU Main Gate Exit Pass</h4>
                <p className="text-[10px] text-emerald-400 font-bold">{selectedPass.reason}</p>
              </div>

              {/* Simulated QR code */}
              <div className="p-3 bg-white rounded-2xl mx-auto w-40 h-40 flex items-center justify-center shadow-md">
                <QrCode className="w-32 h-32 text-slate-900" />
              </div>

              <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[9px] text-slate-400 uppercase">Verification PIN</div>
                <div className="text-lg font-mono font-black text-emerald-400 tracking-widest">{selectedPass.gatepassCode}</div>
              </div>

              <div className="text-[10px] text-slate-400">
                Show this QR to Main Gate Security Guard on departure
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
