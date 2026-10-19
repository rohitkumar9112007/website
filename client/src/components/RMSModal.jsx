import React, { useState, useEffect } from 'react';
import { X, HelpCircle, Plus, Clock, CheckCircle2, AlertCircle, MessageSquare, Star } from 'lucide-react';
import { fetchRMSRequests, createRMSRequest } from '../services/api';

export default function RMSModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [requests, setRequests] = useState([]);
  const [showNewForm, setShowNewForm] = useState(false);
  const [category, setCategory] = useState('Hostel Maintenance');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadRequests();
  }, [isOpen]);

  const loadRequests = async () => {
    const res = await fetchRMSRequests();
    if (res && res.requests) setRequests(res.requests);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await createRMSRequest(category, subject, description, priority);
    setSubmitting(false);
    if (res && res.success) {
      alert("RMS Grievance Ticket logged successfully! SLA countdown started.");
      setShowNewForm(false);
      setSubject('');
      setDescription('');
      loadRequests();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">RMS Support & Status</h3>
              <p className="text-xs text-slate-400">Request Management System & SLA Tracking</p>
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
          
          {/* Action button */}
          <button
            onClick={() => setShowNewForm(!showNewForm)}
            className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" />
            Raise New RMS Grievance / Query
          </button>

          {/* Form */}
          {showNewForm && (
            <form onSubmit={handleCreate} className="p-4 rounded-2xl bg-slate-800/80 border border-violet-500/40 space-y-3 animate-fadeIn">
              <div className="text-xs font-bold text-white uppercase tracking-wider">New Ticket Form</div>
              
              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                >
                  <option value="Hostel Maintenance">Hostel Maintenance (Electricity/Plumbing)</option>
                  <option value="IT & Wi-Fi">IT & Campus Wi-Fi</option>
                  <option value="Academic Cell">Academic Cell & Electives</option>
                  <option value="Mess Food Quality">Mess & Dining Quality</option>
                  <option value="Fee & Accounts">Fee & Accounts Queries</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Brief summary of problem"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-300 font-semibold mb-1">Detailed Description</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide room number, specific error or details..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs"
              >
                {submitting ? 'Submitting Ticket...' : 'File Ticket with SLA'}
              </button>
            </form>
          )}

          {/* Tickets List */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Filed RMS Tickets ({requests.length})
            </div>

            {requests.map((r) => (
              <div
                key={r.id}
                className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-750 hover:border-slate-700 space-y-2 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                      {r.id}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{r.category}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    r.status === 'RESOLVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                    r.status === 'IN_PROGRESS' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {r.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-white">{r.subject}</h4>
                <p className="text-[11px] text-slate-300 leading-snug">{r.description}</p>

                {/* Timeline & Updates */}
                {r.updates && r.updates.length > 0 && (
                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-750 text-[10px] space-y-1">
                    <div className="font-bold text-slate-400 uppercase">Latest Action:</div>
                    <div className="text-slate-200">
                      <strong className="text-violet-400">{r.updates[r.updates.length - 1].by}:</strong>{' '}
                      {r.updates[r.updates.length - 1].text}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-750">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    SLA: <strong className="text-orange-400">{r.slaDate}</strong>
                  </span>
                  <span>Created: {r.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
