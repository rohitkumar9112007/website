import React, { useState } from 'react';
import {
  Lock,
  User,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  GraduationCap,
  Award,
  Building,
  CheckCircle2,
  ScanLine
} from 'lucide-react';
import { loginUser } from '../services/api';

export default function UniversityLoginScreen({ onLoginSuccess }) {
  const [universityId, setUniversityId] = useState('12109842');
  const [password, setPassword] = useState('lpu@123');
  const [captchaInput, setCaptchaInput] = useState('7K9P');
  const [captchaCode] = useState('7K9P');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage('');

    if (!universityId.trim()) {
      setErrorMessage('Please enter your University ID (Registration Number or Employee ID).');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your UMS password.');
      return;
    }

    if (captchaInput.toUpperCase() !== captchaCode) {
      setErrorMessage(`Invalid captcha code. Please enter "${captchaCode}".`);
      return;
    }

    setLoading(true);
    const res = await loginUser(universityId.trim(), password.trim());
    setLoading(false);

    if (res && res.success && res.user) {
      localStorage.setItem('lpu_hub_user', JSON.stringify(res.user));
      onLoginSuccess(res.user);
    } else {
      setErrorMessage(res?.error || 'Authentication failed. Please verify your University ID and password.');
    }
  };

  const handleQuickFill = (id, pass) => {
    setUniversityId(id);
    setPassword(pass);
    setCaptchaInput(captchaCode);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-3 sm:p-6 selection:bg-orange-500 selection:text-white">
      {/* Container: Mobile (max-w-sm) & PC Desktop (max-w-4xl grid-cols-12) */}
      <div className="w-full max-w-sm lg:max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden relative animate-fadeIn lg:grid lg:grid-cols-12">
        
        {/* ====================================================
            LEFT COLUMN (DESKTOP) / TOP BANNER (MOBILE)
        ==================================================== */}
        <div className="lg:col-span-5 bg-gradient-to-br from-orange-600 via-amber-600 to-orange-700 p-6 lg:p-8 text-white relative overflow-hidden flex flex-col justify-between">
          {/* Subtle background ambient rings */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border-4 border-white/10 pointer-events-none"></div>
          <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full border-4 border-white/10 pointer-events-none"></div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 shadow-xl flex items-center justify-center">
                <img src="/logo.svg" alt="LPU" className="w-full h-full rounded-xl" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-orange-200 uppercase bg-black/25 px-2 py-0.5 rounded-full inline-block">
                  UMS GATEWAY
                </span>
                <h2 className="text-lg font-black tracking-tight uppercase leading-tight mt-0.5">
                  LOVELY PROFESSIONAL UNIVERSITY
                </h2>
              </div>
            </div>

            <p className="text-xs text-orange-100 font-medium leading-relaxed mb-6">
              Unified Campus Super-App & Single Sign-On for Students, Hostellers, Faculty & Administration.
            </p>

            {/* Desktop-exclusive institutional highlights */}
            <div className="hidden lg:flex flex-col space-y-3.5 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-black/15 border border-white/15">
                <Award className="w-5 h-5 text-amber-200 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">NAAC Grade A++ Accredited</h4>
                  <p className="text-[11px] text-orange-100">Ranked amongst India's top universities for academic excellence.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-black/15 border border-white/15">
                <GraduationCap className="w-5 h-5 text-amber-200 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">30,000+ Students & 50+ Countries</h4>
                  <p className="text-[11px] text-orange-100">Vibrant multicultural campus with global learning pedagogy.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-black/15 border border-white/15">
                <ScanLine className="w-5 h-5 text-amber-200 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Digital Smart Campus</h4>
                  <p className="text-[11px] text-orange-100">Live attendance radar, mess QR verification, and laundry management.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Institutional Status Badge */}
          <div className="pt-4 border-t border-white/20 flex items-center justify-between text-[11px] text-orange-100">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Core UMS Services Online
            </span>
            <span className="font-mono text-[10px] bg-black/30 px-2 py-0.5 rounded-full">v2.4 Live</span>
          </div>
        </div>

        {/* ====================================================
            RIGHT COLUMN (DESKTOP) / MAIN BODY (MOBILE)
        ==================================================== */}
        <div className="lg:col-span-7 flex flex-col justify-between p-5 lg:p-8 bg-slate-900">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">UMS Account Sign In</h3>
                <p className="text-xs text-slate-400">Enter your official university registration ID and password</p>
              </div>
              <ShieldCheck className="w-6 h-6 text-orange-400 hidden sm:block" />
            </div>

            {/* Error Alert Banner */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="leading-snug">{errorMessage}</div>
              </div>
            )}

            {/* Main Authentication Form */}
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  University ID
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    id="input-university-id"
                    placeholder="e.g. 12109842 or F18902"
                    value={universityId}
                    onChange={(e) => setUniversityId(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition font-mono font-medium"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Student Registration No. or Employee ID</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    id="input-university-password"
                    placeholder="Enter your UMS password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs pl-9 pr-10 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-orange-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Captcha Security Challenge */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Security Captcha
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white uppercase tracking-widest font-mono font-bold"
                    placeholder="Enter captcha"
                  />
                  <div className="px-3.5 py-1.5 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono font-black text-sm tracking-widest select-none shadow-inner">
                    {captchaCode}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                id="btn-university-login"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition active:scale-98 mt-2"
              >
                {loading ? (
                  <span>Authenticating ID & Password...</span>
                ) : (
                  <>
                    <span>Sign In with University ID</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Quick Demo Credentials Autofill Helper */}
          <div className="mt-5 pt-3 border-t border-slate-800 bg-slate-950/40 rounded-2xl p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-orange-400" />
                Quick Demo Accounts (1-Tap Test)
              </div>
              <span className="text-[10px] font-mono text-slate-500">Password: lpu@123</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              <button
                type="button"
                onClick={() => handleQuickFill('12109842', 'lpu@123')}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-[11px] text-slate-200 transition"
              >
                <div className="font-bold text-orange-400">🏨 Hosteller Student</div>
                <div className="text-[10px] font-mono text-slate-400">ID: 12109842</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('12104521', 'lpu@123')}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-[11px] text-slate-200 transition"
              >
                <div className="font-bold text-blue-400">🚌 Day Scholar</div>
                <div className="text-[10px] font-mono text-slate-400">ID: 12104521</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('F18902', 'lpu@123')}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-[11px] text-slate-200 transition"
              >
                <div className="font-bold text-emerald-400">👨‍🏫 Faculty Member</div>
                <div className="text-[10px] font-mono text-slate-400">ID: F18902</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('A10001', 'lpu@123')}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700/80 text-[11px] text-slate-200 transition"
              >
                <div className="font-bold text-purple-400">🏛️ University Admin</div>
                <div className="text-[10px] font-mono text-slate-400">ID: A10001</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
