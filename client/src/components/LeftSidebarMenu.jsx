import React from 'react';
import {
  X,
  CalendarDays,
  UserCheck,
  CheckSquare,
  Calendar,
  Award,
  MessageSquareShare,
  GraduationCap,
  ScanLine,
  QrCode,
  LogOut,
  Receipt,
  HelpCircle,
  Megaphone,
  Sparkles,
  Search,
  LayoutDashboard,
  Bot,
  Lock,
  SlidersHorizontal,
  Moon,
  Sun,
  ChevronRight,
  Power,
  ShieldCheck,
  Building,
  CreditCard,
  BookOpen,
  Download,
  Smartphone,
  MessageCircle
} from 'lucide-react';

export default function LeftSidebarMenu({
  isOpen,
  onClose,
  user,
  onSelectFeature,
  isDark,
  onToggleTheme,
  onLogout,
  onOpenRoleSwitcher,
  onInstallApp,
  canInstall,
  isInstalled
}) {
  if (!isOpen) return null;

  const featureSections = [
    {
      title: 'Academic Portal',
      items: [
        { id: 'timetable', label: "Today's Timetable", icon: CalendarDays, color: 'text-orange-400 bg-orange-500/10' },
        { id: 'attendance', label: 'Attendance & 75% Rule', icon: UserCheck, color: 'text-emerald-400 bg-emerald-500/10', badge: '84.8%' },
        { id: 'assignment', label: 'Assignments & Submissions', icon: CheckSquare, color: 'text-cyan-400 bg-cyan-500/10', badge: '2 Due' },
        { id: 'exam', label: 'Exams & Datesheet', icon: Calendar, color: 'text-rose-400 bg-rose-500/10', badge: 'Datesheet' },
        { id: 'results', label: 'Results & View Marks', icon: Award, color: 'text-amber-400 bg-amber-500/10', badge: 'Sem 5 Out' },
        { id: 'practical-feedback', label: 'Practical Lab Feedback', icon: MessageSquareShare, color: 'text-teal-400 bg-teal-500/10' },
        { id: 'edu-revolution', label: 'Edu Revolution (Notes & PYQs)', icon: GraduationCap, color: 'text-blue-400 bg-blue-500/10' }
      ]
    },
    {
      title: 'Hostel & Dining',
      items: [
        { id: 'mess-scanner', label: 'Mess QR Scanner', icon: ScanLine, color: 'text-orange-400 bg-orange-500/10', badge: 'Scanner' },
        { id: 'laundry-scanner', label: 'Laundry Scanner (Clothes)', icon: QrCode, color: 'text-sky-400 bg-sky-500/10', badge: 'Jeans/Shirts' },
        { id: 'leave-gatepass', label: 'Leave & Gatepass QR', icon: LogOut, color: 'text-emerald-400 bg-emerald-500/10' }
      ]
    },
    {
      title: 'Finance & Administration',
      items: [
        { id: 'fee-statement', label: 'Fee Statement & E-Receipts', icon: Receipt, color: 'text-emerald-400 bg-emerald-500/10', badge: 'Paid' },
        { id: 'rms', label: 'RMS Grievance & SLA Tracker', icon: HelpCircle, color: 'text-violet-400 bg-violet-500/10', badge: '1 Pending' },
        { id: 'announce', label: 'Campus Announcements', icon: Megaphone, color: 'text-amber-400 bg-amber-500/10', badge: '3 New' }
      ]
    },
    {
      title: 'Campus Life & Utilities',
      items: [
        { id: 'happenings', label: 'Happenings & Mega Fests', icon: Sparkles, color: 'text-pink-400 bg-pink-500/10', badge: 'One World' },
        { id: 'lost-found', label: 'Lost & Found Network', icon: Search, color: 'text-purple-400 bg-purple-500/10' },
        { id: 'dashboard', label: 'Student 360 Dashboard', icon: LayoutDashboard, color: 'text-slate-300 bg-slate-800' },
        { id: 'your-dost', label: 'Your Dost AI Mentor', icon: Bot, color: 'text-orange-400 bg-orange-500/10', badge: '24/7 AI' },
        { id: 'ums-login', label: 'LPU UMS Single Sign-On', icon: Lock, color: 'text-slate-300 bg-slate-800' },
        { id: 'customizer', label: 'Customize Quick Tiles', icon: SlidersHorizontal, color: 'text-slate-300 bg-slate-800' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Drawer Container */}
      <div className="w-[85%] max-w-xs h-full bg-slate-900 border-r border-slate-800 flex flex-col shadow-2xl relative animate-slideRight">
        
        {/* Drawer Header / Student Profile Card */}
        <div className="p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-orange-950/40 border-b border-slate-800 relative">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
              alt={user?.name || "Student"}
              className="w-12 h-12 rounded-2xl object-cover ring-2 ring-orange-500/50 shadow"
            />
            <div className="flex-1 pr-6">
              <h3 className="text-sm font-bold text-white tracking-tight line-clamp-1">{user?.name || 'Rohit Kumar'}</h3>
              <div className="text-[11px] font-mono font-bold text-orange-400">{user?.regNo || '12109842'}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{user?.section || 'K21KR'} • {user?.role || 'HOSTELLER'}</div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">CGPA: <strong className="text-white">{user?.cgpa || '8.42'}</strong></span>
            <span className="text-slate-400">Attd: <strong className="text-emerald-400">{user?.attendanceOverall || '84.8'}%</strong></span>
            <button
              onClick={() => { onClose(); onOpenRoleSwitcher(); }}
              className="text-[10px] text-orange-400 font-bold hover:underline"
            >
              Switch Role ▾
            </button>
          </div>

          {/* PWA Install Button */}
          {!isInstalled ? (
            <button
              onClick={() => {
                onClose();
                if (onInstallApp) onInstallApp();
              }}
              className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-orange-500/25 active:scale-98 transition group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                  <Download className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold leading-tight">Install LPU PWA</div>
                  <div className="text-[9px] text-white/80">Add to Home Screen</div>
                </div>
              </div>
              <span className="text-[9px] uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md font-extrabold group-hover:bg-white/30 transition">
                Install
              </span>
            </button>
          ) : (
            <div className="mt-3 py-1.5 px-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold flex items-center justify-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              <span>LPU Hub PWA Installed</span>
            </div>
          )}

          {/* Share on WhatsApp Button */}
          <button
            onClick={() => {
              onClose();
              const origin = typeof window !== 'undefined' ? window.location.origin : 'https://website-rohitkumar9112007s-projects.vercel.app';
              const message = `🎓 *LPU Campus Hub — Student Super-App* 📲\n\nInstall the all-in-one student app for Lovely Professional University!\n\n✨ *Live Features:*\n📅 Today's Timetable & Lecture Rooms\n📊 75% Attendance & Safe Bunk Calculator\n🍽️ Mess QR Meal Scanner\n🧺 Laundry Bag Itemizer\n📝 RMS Grievance Tracker & Exam Datesheet\n\n👇 *Click to open & install on Android:* \n${origin}`;
              window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
            }}
            className="mt-2 w-full py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-400 font-bold text-xs flex items-center justify-between transition cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-400" />
              <span className="text-[11px]">Share on WhatsApp</span>
            </div>
            <span className="text-[9px] bg-emerald-500/20 px-2 py-0.5 rounded font-extrabold text-emerald-300">Invite</span>
          </button>
        </div>

        {/* Feature Navigation List */}
        <div className="p-3 overflow-y-auto flex-1 space-y-4">
          {featureSections.map((sec, idx) => (
            <div key={idx}>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-1.5">
                {sec.title}
              </div>

              <div className="space-y-1">
                {sec.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onClose();
                        onSelectFeature(item.id);
                      }}
                      className="w-full p-2 rounded-xl hover:bg-slate-800/80 active:bg-slate-750 flex items-center justify-between transition text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${item.color}`}>
                          <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                        </div>
                        <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                          {item.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-800 text-orange-400 border border-orange-500/20">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-2">
          <button
            onClick={onToggleTheme}
            className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            {isDark ? 'Light' : 'Dark'}
          </button>

          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <Power className="w-3.5 h-3.5" />
            Log Out
          </button>
        </div>
      </div>

      {/* Backdrop tap to close */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}
