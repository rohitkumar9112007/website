import React, { useState } from 'react';
import { X, Lock, User, KeyRound, ShieldCheck, ArrowRight, Sparkles, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { loginUser } from '../services/api';

export default function UmsLoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [universityId, setUniversityId] = useState('12109842');
  const [password, setPassword] = useState('lpu@123');
  const [captchaInput, setCaptchaInput] = useState('7K9P');
  const [captchaCode] = useState('7K9P');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickLogin = async (id, pass) => {
    setUniversityId(id);
    setPassword(pass);
    setError('');
    setLoading(true);
    const res = await loginUser(id, pass);
    setLoading(false);
    if (res && res.success && res.user) {
      localStorage.setItem('lpu_hub_user', JSON.stringify(res.user));
      onLoginSuccess(res.user);
      onClose();
    } else {
      setError(res?.error || 'Login failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!universityId.trim()) {
      setError('University ID is required.');
      return;
    }
    if (!password.trim()) {
      setError('Password is required.');
      return;
    }
    if (captchaInput.toUpperCase() !== captchaCode) {
      setError(`Invalid captcha code. Enter: ${captchaCode}`);
      return;
    }

    setLoading(true);
    const res = await loginUser(universityId.trim(), password.trim());
    setLoading(false);
    if (res && res.success && res.user) {
      localStorage.setItem('lpu_hub_user', JSON.stringify(res.user));
      onLoginSuccess(res.user);
      onClose();
    } else {
      setError(res?.error || 'Invalid University ID or password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative">
        {/* Top Header with LPU Saffron/Orange Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white p-1 shadow flex items-center justify-center">
              <img src="/logo.svg" alt="LPU" className="w-8 h-8 rounded-lg" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight">UMS SINGLE SIGN-ON</h3>
              <p className="text-[11px] text-orange-100 font-medium">Lovely Professional University</p>
            </div>
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="mx-4 mt-3 p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Demo Credentials Autofill */}
        <div className="px-5 pt-3 pb-2 bg-slate-950/60 border-b border-slate-800">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-400" />
            One-Click University Login Presets
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickLogin('12109842', 'lpu@123')}
              className="px-2 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-[11px] font-semibold text-orange-400 text-left transition"
            >
              🏨 Hosteller (12109842)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('12104521', 'lpu@123')}
              className="px-2 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-[11px] font-semibold text-blue-400 text-left transition"
            >
              🚌 Day Scholar (12104521)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('F18902', 'lpu@123')}
              className="px-2 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-[11px] font-semibold text-emerald-400 text-left transition"
            >
              👨‍🏫 Faculty (F18902)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('A10001', 'lpu@123')}
              className="px-2 py-1.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-[11px] font-semibold text-purple-400 text-left transition"
            >
              🏛️ Admin (A10001)
            </button>
          </div>
        </div>

        {/* UMS Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              University ID / Registration Number
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={universityId}
                onChange={(e) => setUniversityId(e.target.value)}
                required
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 font-mono"
                placeholder="e.g. 12109842"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              UMS Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs pl-9 pr-10 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Captcha */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Security Captcha
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                required
                className="flex-1 text-xs px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white uppercase tracking-widest font-mono font-bold"
              />
              <div className="px-3 py-1.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono font-black text-sm tracking-widest select-none">
                {captchaCode}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 transition mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In with University ID'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
