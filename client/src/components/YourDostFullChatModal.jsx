import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Trash2 } from 'lucide-react';
import { askYourDost } from '../services/api';

export default function YourDostFullChatModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Namaste! I am 'Your Dost', your 24/7 AI mentor for Lovely Professional University. Ask me about your 75% attendance skip limit, class locations (like 37-703), mess menu, exam datesheets, or fee receipts!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (queryText) => {
    const text = queryText || input;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const res = await askYourDost(text);
    setLoading(false);

    const botMsg = {
      sender: 'bot',
      text: res && res.reply ? res.reply : "I am here to guide you with any queries about LPU campus life, exams, or attendance!"
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Chat cleared! How else can I assist you with your LPU student life today?"
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4 animate-fadeIn">
      <div className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-3xl h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-orange-600 to-indigo-700 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold">Your Dost AI Mentor</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <p className="text-[10px] text-orange-100">Official 24/7 LPU Campus Guide</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={clearChat}
              className="text-white/70 hover:text-white p-1"
              title="Clear Chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-slate-950/60">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs ${
                m.sender === 'user' ? 'bg-orange-500' : 'bg-gradient-to-tr from-orange-500 to-indigo-600'
              }`}>
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-orange-500 text-white rounded-tr-none'
                  : 'bg-slate-800 text-slate-200 border border-slate-700/80 rounded-tl-none shadow-sm'
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 animate-spin" />
              Your Dost is thinking...
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-900 border-t border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
          {[
            "Where is 37-703?",
            "Classes I can skip?",
            "Today's BH-4 mess menu?",
            "Next MTE exam date?"
          ].map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="w-9 h-9 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white flex items-center justify-center shadow"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
