import React, { useState } from 'react';
import { Bot, Sparkles, Send, MessageCircle, ChevronRight, HelpCircle, X } from 'lucide-react';
import { askYourDost } from '../services/api';

export default function YourDostCard({ onOpenFullChat }) {
  const [quickInput, setQuickInput] = useState('');
  const [lastReply, setLastReply] = useState(null);
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    "Classes I can skip?",
    "Where is 37-703?",
    "Mess menu today?",
    "Next MTE dates?"
  ];

  const handleQuickAsk = async (text) => {
    const query = text || quickInput;
    if (!query.trim()) return;

    setLoading(true);
    setQuickInput('');
    const res = await askYourDost(query);
    setLoading(false);
    if (res && res.reply) {
      setLastReply({ query, text: res.reply });
    }
  };

  return (
    <section className="mt-4 px-4">
      <div className="relative rounded-2xl bg-gradient-to-r from-orange-950/40 via-slate-900 to-indigo-950/40 border border-orange-500/30 p-3.5 shadow-md shadow-orange-500/5 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top bar with Dost badge */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white tracking-tight">Your Dost</h3>
                <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  AI Mentor
                </span>
              </div>
              <p className="text-[10px] text-slate-400">Academic & Campus Guide</p>
            </div>
          </div>

          <button
            onClick={onOpenFullChat}
            className="text-[11px] font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 transition"
          >
            Open Chat <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* Interactive Quick Prompts */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickAsk(q)}
              className="text-[11px] flex-shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition"
            >
              💬 {q}
            </button>
          ))}
        </div>

        {/* Quick Answer Balloon */}
        {lastReply && (
          <div className="mt-2.5 p-2.5 rounded-xl bg-slate-900/90 border border-orange-500/40 text-xs text-slate-200 relative animate-fadeIn">
            <button
              onClick={() => setLastReply(null)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="text-[10px] font-bold text-orange-400 mb-0.5">Q: "{lastReply.query}"</div>
            <p className="leading-relaxed text-[11px] text-slate-200 pr-4">{lastReply.text}</p>
          </div>
        )}

        {/* Inline Ask Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuickAsk();
          }}
          className="mt-2.5 flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Ask anything (e.g. 75% rule, room location, MTE)..."
              className="w-full text-xs px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !quickInput.trim()}
            className="w-8 h-8 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white flex items-center justify-center transition shadow-md shadow-orange-500/20"
          >
            {loading ? <Sparkles className="w-4 h-4 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          </button>
        </form>
      </div>
    </section>
  );
}
