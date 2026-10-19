import React from 'react';
import {
  Menu,
  Bell,
  Sparkles,
  User,
  RefreshCw,
  Sun,
  Moon,
  LogIn,
  Power,
  Home,
  CalendarDays,
  Grid,
  Search,
  Download
} from 'lucide-react';

export default function Header({
  user,
  onOpenMenu,
  onOpenRoleSwitcher,
  onOpenUmsLogin,
  onOpenNotifications,
  isDark,
  onToggleTheme,
  onLogout,
  activeTab = 'home',
  onSelectTab,
  onInstallApp,
  isInstalled
}) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const navTabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: 3 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <header className="px-3 md:px-6 pt-3 pb-2.5 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md sticky top-0 z-30">
      {/* Top action row */}
      <div className="flex items-center justify-between gap-2 md:gap-4">
        
        {/* Left Side: Top-left menu button + LPU Emblem */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Top Left Menu Button */}
          <button
            onClick={onOpenMenu}
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-slate-800/90 hover:bg-orange-500/20 text-orange-400 border border-slate-700/70 hover:border-orange-500/40 flex items-center justify-center transition active:scale-95 shadow-sm flex-shrink-0"
            title="Open Features Menu"
            id="btn-top-left-menu"
          >
            <Menu className="w-5 h-5 stroke-[2.4]" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 p-0.5 shadow-md shadow-orange-500/20 flex items-center justify-center flex-shrink-0">
              <img src="/logo.svg" alt="LPU" className="w-7 h-7 md:w-8 md:h-8 rounded-[10px]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm md:text-base tracking-tight text-white">LPU</span>
                <span className="text-[9px] md:text-[10px] px-1.5 py-0.2 rounded-full bg-orange-500/20 text-orange-400 font-bold tracking-wider border border-orange-500/30">
                  CAMPUS HUB
                </span>
              </div>
              <p className="text-[9px] md:text-[10px] text-slate-400 hidden sm:block">Lovely Professional University</p>
            </div>
          </div>
        </div>

        {/* ====================================================
            CENTER NAVIGATION TABS (PC / DESKTOP ONLY)
        ==================================================== */}
        {onSelectTab && (
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-2xl border border-slate-800/90 shadow-inner">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all relative ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
                  <span>{tab.label}</span>
                  {tab.badge && !isActive && (
                    <span className="px-1 py-0.2 text-[8px] font-bold bg-orange-500/30 text-orange-400 rounded-full border border-orange-500/40">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        )}

        {/* Action icons & user profile on desktop */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {!isInstalled && onInstallApp && (
            <button
              onClick={onInstallApp}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 h-8 md:h-9 rounded-lg bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white text-xs font-bold shadow-md shadow-orange-500/20 active:scale-95 transition cursor-pointer"
              title="Install LPU Hub Progressive Web App (PWA)"
              id="btn-install-pwa-header"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          <button
            onClick={onToggleTheme}
            className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 flex items-center justify-center transition border border-slate-700/50"
            title="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenRoleSwitcher}
            className="px-2 md:px-2.5 py-1 h-8 md:h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-orange-400 flex items-center gap-1 border border-orange-500/30 transition shadow-sm"
            title="Switch User Role (Day Scholar / Hosteller / Faculty / Admin)"
          >
            <RefreshCw className="w-3 h-3 text-orange-400" />
            <span className="uppercase text-[10px] font-bold">{user?.role || 'STUDENT'}</span>
          </button>

          <button
            onClick={onOpenNotifications}
            className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 flex items-center justify-center relative transition border border-slate-700/50"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          </button>

          <button
            onClick={onOpenUmsLogin}
            className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-tr from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20 hover:brightness-110 transition"
            title="Switch / Log In User"
          >
            <LogIn className="w-4 h-4" />
          </button>

          {/* Desktop Log Out Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="hidden lg:flex items-center gap-1 px-2.5 h-9 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition"
              title="Sign Out"
            >
              <Power className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Student Profile Info Banner: Optimized for both mobile stack and desktop wide bar */}
      <div className="flex items-center justify-between bg-gradient-to-r from-slate-900/90 via-slate-850/80 to-slate-900/90 p-2.5 md:p-3 rounded-2xl border border-slate-800 shadow-sm mt-2">
        <div className="flex items-center gap-2.5 md:gap-3">
          <div className="relative">
            <img
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
              alt={user?.name || "Student"}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover ring-2 ring-orange-500/50 shadow"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900" title="Online"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-medium">{getGreeting()},</span>
              <h2 className="text-sm md:text-base font-bold text-white tracking-tight">{user?.name || 'Rohit Kumar'}</h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] md:text-xs text-slate-400 mt-0.5">
              <span className="font-mono text-orange-400 font-semibold bg-orange-500/10 px-1.5 py-0.2 rounded border border-orange-500/20">
                {user?.regNo || '12109842'}
              </span>
              <span>•</span>
              <span className="truncate max-w-[150px] sm:max-w-none">
                {user?.section || 'K21KR'} ({user?.semester ? `Sem ${user.semester}` : 'Faculty'}) • {user?.program || 'B.Tech CSE'}
              </span>
            </div>
          </div>
        </div>

        {/* Role & status chip on right */}
        <div className="text-right">
          {user?.role === 'HOSTELLER' ? (
            <div className="inline-flex flex-col items-end">
              <span className="text-[10px] md:text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                Hosteller
              </span>
              <span className="text-[10px] md:text-[11px] text-slate-400 mt-0.5">{user.hostelBlock || 'BH-4'} • Room {user.roomNo || '412-B'}</span>
            </div>
          ) : user?.role === 'STUDENT' ? (
            <div className="inline-flex flex-col items-end">
              <span className="text-[10px] md:text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                Day Scholar
              </span>
              <span className="text-[10px] md:text-[11px] text-slate-400 mt-0.5">{user?.busRoute || 'Bus Route 7'}</span>
            </div>
          ) : (
            <div className="inline-flex flex-col items-end">
              <span className="text-[10px] md:text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                {user?.role}
              </span>
              <span className="text-[10px] md:text-[11px] text-slate-400 mt-0.5">{user?.cabin || 'Staff Room'}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
