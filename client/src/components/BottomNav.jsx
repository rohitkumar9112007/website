import React from 'react';
import { Home, CalendarDays, Grid, Bell, User } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab, unreadAlertsCount = 3 }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'schedule', label: 'Schedule', icon: CalendarDays },
    { id: 'services', label: 'Services', icon: Grid },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertsCount },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 min-h-[48px] flex flex-col items-center justify-center relative transition-all duration-150 select-none ${
                isActive ? 'text-orange-400 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active top glowing pip indicator */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 rounded-full bg-orange-500 shadow-sm shadow-orange-500/50"></span>
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-150 ${isActive ? 'scale-110 stroke-[2.4]' : 'scale-100 stroke-[1.8]'}`} />
                {tab.badge ? (
                  <span className="absolute -top-1 -right-2 px-1 py-0.2 min-w-[14px] h-[14px] text-[9px] font-bold bg-orange-500 text-white rounded-full flex items-center justify-center ring-2 ring-slate-900">
                    {tab.badge}
                  </span>
                ) : null}
              </div>

              <span className="text-[10px] mt-1 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
