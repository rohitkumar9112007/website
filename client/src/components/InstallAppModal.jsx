import React, { useState, useEffect } from 'react';
import {
  X,
  Download,
  Smartphone,
  Share2,
  PlusSquare,
  CheckCircle2,
  ExternalLink,
  Laptop,
  MoreVertical,
  Layers,
  Sparkles,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';

export default function InstallAppModal({
  isOpen,
  onClose,
  deferredPrompt,
  onInstallSuccess
}) {
  if (!isOpen) return null;

  const [platform, setPlatform] = useState('android');
  const [hasPrompt, setHasPrompt] = useState(!!(deferredPrompt || window.deferredPrompt));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || '';
    if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      setPlatform('ios');
    } else if (/Android/.test(ua)) {
      setPlatform('android');
    } else {
      setPlatform('desktop');
    }

    const checkPrompt = () => {
      setHasPrompt(!!(deferredPrompt || window.deferredPrompt));
    };
    checkPrompt();
    window.addEventListener('pwa-ready-to-install', checkPrompt);
    return () => window.removeEventListener('pwa-ready-to-install', checkPrompt);
  }, [deferredPrompt]);

  const handleNativePrompt = async () => {
    const promptEvent = deferredPrompt || window.deferredPrompt;
    if (promptEvent && promptEvent.prompt) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice && choice.outcome === 'accepted') {
          if (onInstallSuccess) onInstallSuccess();
          onClose();
        }
        window.deferredPrompt = null;
      } catch (err) {
        console.warn('Native prompt error:', err);
      }
    }
  };

  const handleShareWhatsApp = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://website-rohit-8419.vercel.app';
    const message = `🎓 *LPU Campus Hub — Student Super-App* 📲\n\nInstall the all-in-one student app for Lovely Professional University!\n\n✨ *Key Features:*\n📅 Today's Timetable & Room Numbers\n📊 75% Attendance Rule & Safe Bunk Calculator\n🍽️ Hostel Mess QR Entry Scanner\n🧺 Laundry Bag Itemizer (Jeans, Shirts & Lowers)\n📝 RMS Grievance Tracker & Exam Datesheet\n\n👇 *Click to open & install directly on Android:* \n${origin}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col relative animate-scaleUp">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 p-2 shadow-lg shadow-orange-500/25 flex items-center justify-center">
              <img src="/logo.svg" alt="LPU Hub Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white leading-tight">Install LPU Campus Hub</h3>
              <p className="text-xs text-orange-400 font-medium">Official Student Super-App (PWA)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* Key Advantages Card */}
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
              <Sparkles className="w-4 h-4 text-orange-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">Full Screen</div>
              <div className="text-[9px] text-slate-400">No browser bar</div>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
              <Layers className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">Offline Sync</div>
              <div className="text-[9px] text-slate-400">Classes & Attd</div>
            </div>
            <div className="p-2.5 rounded-2xl bg-slate-800/50 border border-slate-700/50 text-center">
              <Smartphone className="w-4 h-4 text-sky-400 mx-auto mb-1" />
              <div className="text-[11px] font-bold text-white">Home Screen</div>
              <div className="text-[9px] text-slate-400">Instant 1-Tap</div>
            </div>
          </div>

          {/* Primary Action Button */}
          {hasPrompt ? (
            <button
              onClick={handleNativePrompt}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm shadow-xl shadow-orange-500/25 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Install to Device Now</span>
            </button>
          ) : (
            <div className="p-3 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-xs text-orange-200 font-semibold">
                  Follow 2 quick steps for your {platform === 'ios' ? 'iPhone / iPad' : platform === 'android' ? 'Android device' : 'Computer'}:
                </span>
              </div>
            </div>
          )}

          {/* Platform Tab Selector */}
          <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setPlatform('android')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${platform === 'android' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Android</span>
            </button>
            <button
              onClick={() => setPlatform('ios')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${platform === 'ios' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>iPhone / iOS</span>
            </button>
            <button
              onClick={() => setPlatform('desktop')}
              className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition ${platform === 'desktop' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'}`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>PC / Mac</span>
            </button>
          </div>

          {/* Step-by-Step Instructions based on selected platform */}
          {platform === 'android' && (
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-slate-300">
                  Tap the <strong className="text-white">3 dots (⋮)</strong> menu in Google Chrome at the top-right corner.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-slate-300">
                  Select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </div>
                <div className="text-xs text-emerald-400 font-medium">
                  The LPU Campus Hub icon will be placed directly on your phone's home screen!
                </div>
              </div>
            </div>
          )}

          {platform === 'ios' && (
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-slate-300">
                  Open this link in <strong className="text-white">Safari</strong>, then tap the <strong className="text-white">Share button (⎋)</strong> at the bottom of the screen.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-slate-300">
                  Scroll down and tap <strong className="text-white">"Add to Home Screen" (+)</strong>.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="text-xs text-slate-300">
                  Tap <strong className="text-white">"Add"</strong> in the top-right corner.
                </div>
              </div>
            </div>
          )}

          {platform === 'desktop' && (
            <div className="p-3.5 rounded-2xl bg-slate-800/40 border border-slate-700/60 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="text-xs text-slate-300">
                  Look at the right side of your Chrome or Edge <strong className="text-white">Address / URL bar</strong>.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="text-xs text-slate-300">
                  Click the <strong className="text-white">Install icon (⊕ or computer with arrow)</strong> to install LPU Campus Hub as a dedicated desktop app.
                </div>
              </div>
            </div>
          )}

          {/* Share on WhatsApp & Copy Link for Android Friends */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-emerald-950/30 border border-emerald-500/35 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-black text-emerald-400">
                <MessageCircle className="w-4 h-4 fill-emerald-400/30 text-emerald-400" />
                <span>Share Android Install Link on WhatsApp</span>
              </div>
              <span className="text-[9px] text-emerald-300 font-extrabold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                1-Tap Install
              </span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Share this link directly into your class or hostel WhatsApp groups so any Android student can install LPU Campus Hub instantly.
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-98 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
                <span>Share to WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://website-rohit-8419.vercel.app';
                  navigator.clipboard.writeText(origin);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer flex-shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-950/80 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition"
          >
            Got it, Close
          </button>
        </div>

      </div>
    </div>
  );
}
