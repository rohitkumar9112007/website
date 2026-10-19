import React, { useState, useEffect } from 'react';
import { X, Search, Plus, MapPin, Calendar, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { fetchLostFound, createLostFound } from '../services/api';

export default function LostFoundModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [showPostForm, setShowPostForm] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('LOST');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadItems();
  }, [isOpen]);

  const loadItems = async () => {
    const res = await fetchLostFound();
    if (res && res.items) setItems(res.items);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const res = await createLostFound(type, title, location, description);
    setSubmitting(false);
    if (res && res.success) {
      alert("Lost & Found notice published to campus network!");
      setShowPostForm(false);
      setTitle('');
      setLocation('');
      setDescription('');
      loadItems();
    }
  };

  const filtered = items.filter(i => filter === 'ALL' || i.type === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Lost & Found Portal</h3>
              <p className="text-xs text-slate-400">Campus-Wide Item Recovery Network</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Button & Filters */}
        <div className="p-4 border-b border-slate-800/80 space-y-2 bg-slate-950/40">
          <button
            onClick={() => setShowPostForm(!showPostForm)}
            className="w-full py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            Report Lost or Found Item
          </button>

          <div className="flex gap-1.5">
            {['ALL', 'LOST', 'FOUND'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 py-1 rounded-xl text-xs font-semibold transition ${
                  filter === f ? 'bg-purple-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {showPostForm && (
            <form onSubmit={handlePost} className="p-4 rounded-2xl bg-slate-800/90 border border-purple-500/40 space-y-2.5 animate-fadeIn">
              <div className="text-xs font-bold text-white uppercase tracking-wider">Report Item</div>
              
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setType('LOST')}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                    type === 'LOST' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  I Lost An Item
                </button>
                <button
                  type="button"
                  onClick={() => setType('FOUND')}
                  className={`flex-1 py-1 rounded-lg text-xs font-bold ${
                    type === 'FOUND' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  I Found An Item
                </button>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Item Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Blue Dell Laptop Charger"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Campus Location</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Central Library 3rd Floor"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-semibold mb-0.5">Description & Identifying Marks</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Type-C 65W charger with small white sticker..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2 rounded-xl bg-purple-600 text-white font-bold text-xs"
              >
                {submitting ? 'Publishing...' : 'Publish Notice'}
              </button>
            </form>
          )}

          {filtered.map(item => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-750 hover:border-slate-700 space-y-2 transition"
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.type === 'LOST' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {item.type} ITEM
                </span>
                <span className="text-[10px] text-slate-400">{item.date}</span>
              </div>

              <h4 className="text-xs font-bold text-white">{item.title}</h4>
              <p className="text-[11px] text-slate-300 leading-snug">{item.description}</p>

              <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-750 text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {item.location}
                </span>

                <button
                  onClick={() => alert(`Claim request submitted for "${item.title}"! Security will contact: ${item.contact}`)}
                  className="px-2.5 py-1 rounded-xl bg-slate-750 hover:bg-slate-700 text-purple-400 font-bold border border-purple-500/30"
                >
                  Claim Item
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
