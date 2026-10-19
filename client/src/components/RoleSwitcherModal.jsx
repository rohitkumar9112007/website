import React from 'react';
import { X, Check, ShieldCheck, User, Users, GraduationCap, Building } from 'lucide-react';
import { switchRole } from '../services/api';

export default function RoleSwitcherModal({ isOpen, onClose, currentRole, onRoleSwitched }) {
  if (!isOpen) return null;

  const roles = [
    {
      id: 'HOSTELLER',
      title: 'Hosteller Student',
      studentName: 'Rohit Kumar (12109842)',
      badge: 'Unlocks Mess QR & Laundry QR',
      description: 'Hostel BH-4, Room 412-B. Has access to all mess/laundry QR tokens and gate-pass approval.',
      icon: Building,
      color: 'border-orange-500/50 bg-orange-500/10 text-orange-400'
    },
    {
      id: 'STUDENT',
      title: 'Day Scholar Student',
      studentName: 'Priya Sharma (12104521)',
      badge: 'Bus Route 7',
      description: 'Commutes from Jalandhar Cantt. Hostel-specific cards hidden; highlights bus timings & academic portal.',
      icon: GraduationCap,
      color: 'border-blue-500/50 bg-blue-500/10 text-blue-400'
    },
    {
      id: 'FACULTY',
      title: 'Faculty Member',
      studentName: 'Dr. Harpreet Singh (F18902)',
      badge: 'Attendance & Marks Marker',
      description: 'School of Computer Science. Can mark student attendance, upload assignments, and review feedback.',
      icon: Users,
      color: 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
    },
    {
      id: 'ADMIN',
      title: 'University Admin',
      studentName: 'Admin Office (A10001)',
      badge: 'System & Grievances',
      description: 'Division of Student Affairs. Post announcements, resolve RMS tickets, manage leave requests.',
      icon: ShieldCheck,
      color: 'border-purple-500/50 bg-purple-500/10 text-purple-400'
    }
  ];

  const handleSelectRole = async (roleId) => {
    const res = await switchRole(roleId);
    if (res && res.user) {
      onRoleSwitched(res.user);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Switch Demo User Role</h3>
            <p className="text-[11px] text-slate-400">Instantly test role-based permissions</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Roles List */}
        <div className="p-4 space-y-2.5">
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = currentRole === r.id;

            return (
              <button
                key={r.id}
                onClick={() => handleSelectRole(r.id)}
                className={`w-full p-3 rounded-2xl border text-left transition flex items-start gap-3 relative ${
                  isSelected
                    ? `${r.color} ring-1 ring-orange-500/40 shadow-md`
                    : 'bg-slate-800/40 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-slate-900' : 'bg-slate-800'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{r.title}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-slate-950 font-semibold text-slate-300">
                      {r.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-medium text-orange-400/90 mt-0.5">{r.studentName}</div>
                  <p className="text-[10px] text-slate-400 mt-1 leading-snug">{r.description}</p>
                </div>

                {isSelected && (
                  <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center shadow">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
