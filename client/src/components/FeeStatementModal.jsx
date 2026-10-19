import React, { useState, useEffect } from 'react';
import { X, Receipt, CheckCircle2, Download, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { fetchFeeStatement, payFee } from '../services/api';

export default function FeeStatementModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  const [statement, setStatement] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState(null);

  useEffect(() => {
    fetchFeeStatement().then(res => {
      if (res && res.statement) setStatement(res.statement);
    });
  }, [isOpen]);

  const items = statement?.items || [];
  const transactions = statement?.transactions || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Fee Statement & Receipts</h3>
              <p className="text-xs text-slate-400">Lovely Professional University Finance Cell</p>
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
          
          {/* Status banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Outstanding Dues</div>
              <div className="text-3xl font-black text-white mt-0.5">₹0.00</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                No Dues Pending • Registration Active
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                All Paid
              </span>
              <div className="text-[10px] text-slate-400 mt-1">Spring 2026</div>
            </div>
          </div>

          {/* Breakdown items */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Semester Fee Itemization
            </div>
            <div className="space-y-2">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-800/60 border border-slate-750 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-semibold text-white">{item.title}</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">Payment Cleared</div>
                  </div>
                  <div className="text-right">
                    <strong className="text-white font-mono">₹{item.amount.toLocaleString()}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Paid Transactions with Downloadable Receipts */}
          <div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Payment Receipts & Invoices
            </div>
            <div className="space-y-2">
              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-750 flex items-center justify-between"
                >
                  <div>
                    <div className="text-xs font-bold text-white font-mono">{txn.id}</div>
                    <div className="text-[10px] text-slate-400">{txn.mode} • {txn.date}</div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{txn.refNo}</div>
                  </div>

                  <div className="text-right space-y-1.5">
                    <div className="text-sm font-bold text-white font-mono">₹{txn.amount.toLocaleString()}</div>
                    <button
                      onClick={() => { setSelectedTxn(txn); setShowReceipt(true); }}
                      className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-sm"
                    >
                      <Download className="w-3 h-3" />
                      E-Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* E-RECEIPT MODAL PREVIEW */}
        {showReceipt && selectedTxn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
            <div className="w-full max-w-sm bg-white text-slate-900 rounded-3xl p-5 shadow-2xl space-y-3 relative border-4 border-emerald-500">
              <button
                onClick={() => setShowReceipt(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center font-bold"
              >
                ✕
              </button>

              <div className="border-b-2 border-slate-200 pb-2 text-center">
                <h3 className="text-sm font-extrabold text-emerald-700 uppercase">
                  LOVELY PROFESSIONAL UNIVERSITY
                </h3>
                <p className="text-[10px] text-slate-600 font-bold">OFFICIAL ELECTRONIC FEE RECEIPT</p>
              </div>

              <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-200 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Receipt No:</span>
                  <strong className="font-mono">{selectedTxn.id}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Student Name:</span>
                  <strong>{user?.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reg Number:</span>
                  <strong className="font-mono">{user?.regNo}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Txn Reference:</span>
                  <span className="font-mono text-emerald-700">{selectedTxn.refNo}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 font-bold">
                  <span>Amount Paid:</span>
                  <span className="text-emerald-700 font-mono">₹{selectedTxn.amount.toLocaleString()}</span>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 inline mr-1" />
                Digitally verified by LPU Accounts Division
              </div>

              <button
                onClick={() => {
                  alert("Official Fee Receipt downloaded as PDF!");
                  setShowReceipt(false);
                }}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
              >
                <Download className="w-4 h-4" />
                Download PDF Receipt
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
