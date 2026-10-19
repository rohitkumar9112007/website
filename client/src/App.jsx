import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TimetableCarousel from './components/TimetableCarousel';
import YourDostCard from './components/YourDostCard';
import QuickAccessGrid from './components/QuickAccessGrid';
import BottomNav from './components/BottomNav';
import TileCustomizerModal from './components/TileCustomizerModal';
import UmsLoginModal from './components/UmsLoginModal';
import RoleSwitcherModal from './components/RoleSwitcherModal';
import AttendanceModal from './components/AttendanceModal';
import AnnouncementsModal from './components/AnnouncementsModal';
import MessScannerModal from './components/MessScannerModal';
import LaundryScannerModal from './components/LaundryScannerModal';
import AssignmentsModal from './components/AssignmentsModal';
import ExamsModal from './components/ExamsModal';
import MarksResultsModal from './components/MarksResultsModal';
import FeeStatementModal from './components/FeeStatementModal';
import LeaveGatepassModal from './components/LeaveGatepassModal';
import RMSModal from './components/RMSModal';
import EduRevolutionModal from './components/EduRevolutionModal';
import LostFoundModal from './components/LostFoundModal';
import PracticalFeedbackModal from './components/PracticalFeedbackModal';
import HappeningsModal from './components/HappeningsModal';
import DashboardModal from './components/DashboardModal';
import YourDostFullChatModal from './components/YourDostFullChatModal';
import LeftSidebarMenu from './components/LeftSidebarMenu';
import UniversityLoginScreen from './components/UniversityLoginScreen';

import {
  fetchMe,
  fetchTimetableToday,
  fetchTileConfig,
  saveTileConfig
} from './services/api';
import {
  CalendarDays,
  Grid,
  Bell,
  User,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
  Info,
  Calendar,
  UserCheck,
  Award,
  Receipt,
  ScanLine,
  QrCode,
  Power
} from 'lucide-react';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lpu_hub_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isLeftMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [timetableSlots, setTimetableSlots] = useState([]);
  const [allTiles, setAllTiles] = useState([]);
  const [enabledTiles, setEnabledTiles] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(true);

  // Modals state for ALL 15 features
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isUmsLoginOpen, setIsUmsLoginOpen] = useState(false);
  const [isRoleSwitcherOpen, setIsRoleSwitcherOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);
  const [isAnnounceOpen, setIsAnnounceOpen] = useState(false);
  const [isMessScannerOpen, setIsMessScannerOpen] = useState(false);
  const [isLaundryScannerOpen, setIsLaundryScannerOpen] = useState(false);
  const [isAssignmentOpen, setIsAssignmentOpen] = useState(false);
  const [isExamOpen, setIsExamOpen] = useState(false);
  const [isMarksResultsOpen, setIsMarksResultsOpen] = useState(false);
  const [isFeeOpen, setIsFeeOpen] = useState(false);
  const [isLeaveOpen, setIsLeaveOpen] = useState(false);
  const [isRMSOpen, setIsRMSOpen] = useState(false);
  const [isEduOpen, setIsEduOpen] = useState(false);
  const [isLostFoundOpen, setIsLostFoundOpen] = useState(false);
  const [isPracticalFeedbackOpen, setIsPracticalFeedbackOpen] = useState(false);
  const [isHappeningsOpen, setIsHappeningsOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isYourDostFullChatOpen, setIsYourDostFullChatOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Load authenticated student data
  const loadData = async () => {
    const ttRes = await fetchTimetableToday();
    if (ttRes && ttRes.slots) setTimetableSlots(ttRes.slots);

    const tilesRes = await fetchTileConfig();
    if (tilesRes) {
      setAllTiles(tilesRes.allTiles || []);
      setEnabledTiles(tilesRes.enabledTiles || []);
    }
  };

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const handleLoginSuccess = (loggedUser) => {
    setUser(loggedUser);
    localStorage.setItem('lpu_hub_user', JSON.stringify(loggedUser));
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem('lpu_hub_user');
    setUser(null);
    setIsLeftMenuOpen(false);
  };

  // Central Router for ALL tile clicks - every tile works!
  const handleTileClick = (tile) => {
    const id = tile.id || tile;
    switch (id) {
      case 'mess-scanner':
      case 'mess-qr':
        setIsMessScannerOpen(true);
        break;
      case 'laundry-scanner':
      case 'laundry-qr':
        setIsLaundryScannerOpen(true);
        break;
      case 'attendance':
        setIsAttendanceOpen(true);
        break;
      case 'assignment':
        setIsAssignmentOpen(true);
        break;
      case 'exam':
      case 'exam-schedule':
        setIsExamOpen(true);
        break;
      case 'results':
      case 'view-marks':
        setIsMarksResultsOpen(true);
        break;
      case 'fee-statement':
        setIsFeeOpen(true);
        break;
      case 'announce':
        setIsAnnounceOpen(true);
        break;
      case 'leave-gatepass':
        setIsLeaveOpen(true);
        break;
      case 'rms':
      case 'rms-status':
        setIsRMSOpen(true);
        break;
      case 'edu-revolution':
        setIsEduOpen(true);
        break;
      case 'lost-found':
        setIsLostFoundOpen(true);
        break;
      case 'practical-feedback':
        setIsPracticalFeedbackOpen(true);
        break;
      case 'happenings':
        setIsHappeningsOpen(true);
        break;
      case 'dashboard':
        setIsDashboardOpen(true);
        break;
      case 'timetable':
        setActiveTab('home');
        break;
      case 'your-dost':
        setIsYourDostFullChatOpen(true);
        break;
      case 'ums-login':
        setIsUmsLoginOpen(true);
        break;
      case 'customizer':
        setIsCustomizerOpen(true);
        break;
      default:
        setActiveTab('services');
        break;
    }
  };

  const handleSaveTiles = async (newTiles) => {
    setEnabledTiles(newTiles);
    await saveTileConfig(newTiles);
  };

  const handleToggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const isFaculty = user?.role === 'FACULTY';

  // Require University ID & Password login
  if (!user) {
    return <UniversityLoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex justify-center`}>
      {/* Responsive Viewport Container: Mobile (max-w-md) & PC Desktop (max-w-7xl) */}
      <div className="w-full max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-7xl min-h-screen flex flex-col bg-slate-950 md:border-x border-slate-800 shadow-2xl relative pb-20 md:pb-8">
        
        {/* Top Header with Desktop Navigation Bar */}
        <Header
          user={user}
          onOpenMenu={() => setIsLeftMenuOpen(true)}
          onOpenRoleSwitcher={() => setIsRoleSwitcherOpen(true)}
          onOpenUmsLogin={() => setIsUmsLoginOpen(true)}
          onOpenNotifications={() => setIsAnnounceOpen(true)}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onLogout={handleLogout}
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* Top-Left Side Navigation Drawer */}
        <LeftSidebarMenu
          isOpen={isLeftMenuOpen}
          onClose={() => setIsLeftMenuOpen(false)}
          user={user}
          onSelectFeature={(featureId) => {
            setIsLeftMenuOpen(false);
            handleTileClick(featureId);
          }}
          isDark={isDark}
          onToggleTheme={handleToggleTheme}
          onLogout={handleLogout}
          onOpenRoleSwitcher={() => {
            setIsLeftMenuOpen(false);
            setIsRoleSwitcherOpen(true);
          }}
        />

        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <main className="flex-1 animate-fadeIn px-2 sm:px-4 md:px-6 py-2 md:py-4">
            
            {/* PC Desktop KPI Stats Bar (Visible on md and up) */}
            <div className="hidden md:grid md:grid-cols-4 gap-3 mb-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-orange-500/15 via-slate-900 to-slate-900 border border-orange-500/30">
                <div className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Attendance Status</div>
                <div className="text-2xl font-black text-white mt-0.5">{user?.attendanceOverall || '84.8'}%</div>
                <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                  ✓ Safe Zone (Above 75% Rule)
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Academic CGPA</div>
                <div className="text-2xl font-black text-white mt-0.5">{user?.cgpa || '8.42'}</div>
                <div className="text-[11px] text-slate-400 font-medium mt-1">
                  Section {user?.section || 'K21KR'} • Sem 5
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-500/15 via-slate-900 to-slate-900 border border-sky-500/30">
                <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">Today's Lectures</div>
                <div className="text-2xl font-black text-white mt-0.5">{timetableSlots.length} Classes</div>
                <div className="text-[11px] text-sky-400 font-semibold mt-1">
                  Next: {timetableSlots[0]?.courseCode || 'MTH165'} ({timetableSlots[0]?.room || '37-703'})
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-purple-500/15 via-slate-900 to-slate-900 border border-purple-500/30">
                <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Campus Services</div>
                <div className="text-2xl font-black text-white mt-0.5">{user?.hostelBlock || 'BH-4'}</div>
                <div className="text-[11px] text-purple-300 font-medium mt-1">
                  Room {user?.roomNo || '412-B'} • Mess Active
                </div>
              </div>
            </div>

            {/* Responsive Desktop Columns: Left Column (Timetable + Tiles) + Right Column (Your Dost + Quick Actions) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column (8 cols on lg screen) */}
              <div className="lg:col-span-8 space-y-4">
                {/* 1. Today's Timetable Section */}
                <TimetableCarousel
                  slots={timetableSlots}
                  onSelectSlot={(slot) => setSelectedSlot(slot)}
                  isFaculty={isFaculty}
                />

                {/* 2. Customizable Quick-Access Tiles Grid */}
                <QuickAccessGrid
                  enabledTiles={enabledTiles}
                  allTiles={allTiles}
                  onTileClick={handleTileClick}
                  onOpenCustomizer={() => setIsCustomizerOpen(true)}
                />
              </div>

              {/* Right Column (4 cols on lg screen) */}
              <div className="lg:col-span-4 space-y-4">
                {/* 2. Your Dost AI Assistant Widget */}
                <YourDostCard
                  onOpenFullChat={() => setIsYourDostFullChatOpen(true)}
                />

                {/* PC Fast Action Hub */}
                <div className="p-4 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Instant QR Scanners</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold">1-Tap</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setIsMessScannerOpen(true)}
                      className="p-3 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-left transition group"
                    >
                      <ScanLine className="w-5 h-5 text-orange-400 mb-1 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-bold text-white">Mess Scanner</div>
                      <div className="text-[10px] text-slate-400">Scan Meal Counter</div>
                    </button>
                    <button
                      onClick={() => setIsLaundryScannerOpen(true)}
                      className="p-3 rounded-2xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-left transition group"
                    >
                      <QrCode className="w-5 h-5 text-sky-400 mb-1 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-bold text-white">Laundry Drop</div>
                      <div className="text-[10px] text-slate-400">Jeans, Shirts & Towels</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* TAB 2: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="flex-1 p-4 md:p-6 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white">Full Academic Schedule</h2>
                <p className="text-xs text-slate-400">Week 8 • Spring Semester 2026 • K21KR</p>
              </div>
              <button
                onClick={() => setIsExamOpen(true)}
                className="text-xs px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30 flex items-center gap-1.5 hover:bg-rose-500/30 transition"
              >
                <Calendar className="w-3.5 h-3.5" />
                Exam Datesheet
              </button>
            </div>

            {/* Responsive Timetable Grid: 1 col on mobile, 2-3 cols on PC */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {timetableSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer flex flex-col justify-between transition shadow-sm hover:shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                        {slot.courseCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        slot.attendanceStatus === 'PRESENT' ? 'bg-emerald-500/20 text-emerald-400' :
                        slot.attendanceStatus === 'ABSENT' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {slot.attendanceStatus}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white line-clamp-1">{slot.courseTitle}</h3>
                    <p className="text-xs text-slate-400 mt-1">{slot.faculty || 'Senior Faculty'}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 mt-3 pt-2 border-t border-slate-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {slot.timeSlot}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-orange-300">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      Room {slot.room}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SERVICES */}
        {activeTab === 'services' && (
          <div className="flex-1 p-4 md:p-6 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white">All Campus Services</h2>
                <p className="text-xs text-slate-400">Click any service card to open the interactive module</p>
              </div>
              <button
                onClick={() => setIsCustomizerOpen(true)}
                className="text-xs font-semibold text-orange-400 hover:underline"
              >
                Organize Tiles
              </button>
            </div>

            {/* Responsive Services Grid: 2 cols on mobile, 4-6 cols on PC */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {allTiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleTileClick(tile)}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-850 text-left transition flex flex-col justify-between group"
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${tile.color} flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform`}>
                      {tile.name.charAt(0)}
                    </div>
                    {tile.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-850 text-orange-400 border border-orange-500/30">
                        {tile.badge}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">{tile.name}</div>
                    <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{tile.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ALERTS */}
        {activeTab === 'alerts' && (
          <div className="flex-1 p-4 md:p-6 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white">Alerts & Broadcasts</h2>
                <p className="text-xs text-slate-400">Push notifications & official administrative circulars</p>
              </div>
              <button
                onClick={() => setIsAnnounceOpen(true)}
                className="text-xs font-semibold text-orange-400 hover:underline"
              >
                All Circulars
              </button>
            </div>

            {/* Responsive Alerts Grid: 1 col on mobile, 2-3 cols on PC */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                onClick={() => setIsAttendanceOpen(true)}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-start gap-3 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">75% Attendance Skip Warning</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">INT219 attendance is currently at 71%. Attend next 5 lectures to clear warning.</p>
                  <span className="text-[10px] text-slate-500 mt-1.5 block">15 mins ago • Tap to view skips</span>
                </div>
              </div>

              <div
                onClick={() => setIsMessScannerOpen(true)}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-start gap-3 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <ScanLine className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Mess Scanner Active for Lunch</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">BH-4 lunch is being served until 2:30 PM. Tap to scan counter QR.</p>
                  <span className="text-[10px] text-slate-500 mt-1.5 block">1 hour ago • Hosteller dining</span>
                </div>
              </div>

              <div
                onClick={() => setIsExamOpen(true)}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer flex items-start gap-3 transition"
              >
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">MTE Datesheet Released</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">Mid-term exam schedule and seating allocation published. Tap to download admit card.</p>
                  <span className="text-[10px] text-slate-500 mt-1.5 block">Yesterday • Examination Cell</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === 'profile' && (
          <div className="flex-1 p-4 md:p-6 animate-fadeIn space-y-4">
            {/* Desktop 2-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              
              {/* Left Column (5 cols on lg screen): ID Card */}
              <div className="lg:col-span-5">
                <div className="p-5 rounded-3xl bg-gradient-to-tr from-slate-900 via-orange-950/40 to-slate-900 border border-orange-500/40 shadow-xl relative overflow-hidden">
                  <div className="flex items-center gap-3">
                    <img
                      src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80"}
                      alt={user?.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-orange-500/50 shadow"
                    />
                    <div>
                      <h3 className="text-base font-bold text-white">{user?.name}</h3>
                      <div className="text-xs font-mono text-orange-400 font-bold">{user?.regNo}</div>
                      <div className="text-xs text-slate-300 mt-0.5">{user?.program || 'B.Tech CSE'}</div>
                      <div className="text-[10px] text-slate-400">{user?.section || 'K21KR'} • {user?.role}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-5 pt-4 border-t border-slate-800 text-center">
                    <div
                      onClick={() => setIsMarksResultsOpen(true)}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/50 cursor-pointer"
                    >
                      <div className="text-[10px] text-slate-400 uppercase font-bold">CGPA</div>
                      <div className="text-base font-black text-white">{user?.cgpa || '8.42'}</div>
                    </div>
                    <div
                      onClick={() => setIsAttendanceOpen(true)}
                      className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer"
                    >
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Attendance</div>
                      <div className="text-base font-black text-emerald-400">{user?.attendanceOverall || '84.8'}%</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">Role</div>
                      <div className="text-xs font-black text-orange-400">{user?.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (7 cols on lg screen): Actions */}
              <div className="lg:col-span-7 space-y-2.5">
                <button
                  onClick={() => setIsDashboardOpen(true)}
                  className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left transition"
                >
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      Student 360 Analytics Dashboard
                    </div>
                    <div className="text-[10px] text-slate-400">Combined overview of exams, fees, and attendance</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setIsRoleSwitcherOpen(true)}
                  className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left transition"
                >
                  <div>
                    <div className="text-xs font-bold text-white">Switch Demo User Role</div>
                    <div className="text-[10px] text-slate-400">Day Scholar, Hosteller, Faculty, Admin</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => setIsUmsLoginOpen(true)}
                  className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 flex items-center justify-between text-left transition"
                >
                  <div>
                    <div className="text-xs font-bold text-white">LPU UMS Single Sign-On</div>
                    <div className="text-[10px] text-slate-400">View official styled UMS auth portal</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 flex items-center justify-between text-left transition"
                >
                  <div>
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <Power className="w-3.5 h-3.5" />
                      Log Out of Campus Hub
                    </div>
                    <div className="text-[10px] text-rose-300/70">Sign out and require University ID & Password</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-rose-400" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* =========================================
            ALL 15 FULLY WORKING FEATURE MODALS
        ========================================= */}
        
        {/* 1. Mess QR Scanner (Inserted instead of static QR) */}
        <MessScannerModal
          isOpen={isMessScannerOpen}
          onClose={() => setIsMessScannerOpen(false)}
          user={user}
        />

        {/* 2. Laundry QR Scanner (Inserted instead of static QR) */}
        <LaundryScannerModal
          isOpen={isLaundryScannerOpen}
          onClose={() => setIsLaundryScannerOpen(false)}
          user={user}
        />

        {/* 3. Course Assignments & Submissions */}
        <AssignmentsModal
          isOpen={isAssignmentOpen}
          onClose={() => setIsAssignmentOpen(false)}
        />

        {/* 4. Exams, Datesheet & Admit Card */}
        <ExamsModal
          isOpen={isExamOpen}
          onClose={() => setIsExamOpen(false)}
          user={user}
        />

        {/* 5. Results, Marks Breakdown & Grade Predictor */}
        <MarksResultsModal
          isOpen={isMarksResultsOpen}
          onClose={() => setIsMarksResultsOpen(false)}
        />

        {/* 6. Fee Statement & Official E-Receipts */}
        <FeeStatementModal
          isOpen={isFeeOpen}
          onClose={() => setIsFeeOpen(false)}
          user={user}
        />

        {/* 7. Leave Application & Digital QR Gatepass */}
        <LeaveGatepassModal
          isOpen={isLeaveOpen}
          onClose={() => setIsLeaveOpen(false)}
          user={user}
        />

        {/* 8. RMS Grievance Tracker & SLA */}
        <RMSModal
          isOpen={isRMSOpen}
          onClose={() => setIsRMSOpen(false)}
        />

        {/* 9. Edu Revolution Learning Hub */}
        <EduRevolutionModal
          isOpen={isEduOpen}
          onClose={() => setIsEduOpen(false)}
        />

        {/* 10. Lost & Found Campus Network */}
        <LostFoundModal
          isOpen={isLostFoundOpen}
          onClose={() => setIsLostFoundOpen(false)}
        />

        {/* 11. Practical & Lab Feedback */}
        <PracticalFeedbackModal
          isOpen={isPracticalFeedbackOpen}
          onClose={() => setIsPracticalFeedbackOpen(false)}
        />

        {/* 12. Happenings & Mega Events RSVP */}
        <HappeningsModal
          isOpen={isHappeningsOpen}
          onClose={() => setIsHappeningsOpen(false)}
        />

        {/* 13. Student 360 Analytics Dashboard */}
        <DashboardModal
          isOpen={isDashboardOpen}
          onClose={() => setIsDashboardOpen(false)}
          user={user}
          onNavigateAction={(action) => handleTileClick(action)}
        />

        {/* 14. "Your Dost" Full Conversational AI Assistant */}
        <YourDostFullChatModal
          isOpen={isYourDostFullChatOpen}
          onClose={() => setIsYourDostFullChatOpen(false)}
        />

        {/* 15. Attendance 75% Rule & Skips Calculator */}
        <AttendanceModal
          isOpen={isAttendanceOpen}
          onClose={() => setIsAttendanceOpen(false)}
        />

        {/* Campus Announcements */}
        <AnnouncementsModal
          isOpen={isAnnounceOpen}
          onClose={() => setIsAnnounceOpen(false)}
        />

        {/* Tile Customizer */}
        <TileCustomizerModal
          isOpen={isCustomizerOpen}
          onClose={() => setIsCustomizerOpen(false)}
          allTiles={allTiles}
          enabledTiles={enabledTiles}
          onSave={handleSaveTiles}
        />

        {/* UMS SSO Login */}
        <UmsLoginModal
          isOpen={isUmsLoginOpen}
          onClose={() => setIsUmsLoginOpen(false)}
          onLoginSuccess={(loggedUser) => {
            setUser(loggedUser);
            loadData();
          }}
        />

        {/* Role Switcher */}
        <RoleSwitcherModal
          isOpen={isRoleSwitcherOpen}
          onClose={() => setIsRoleSwitcherOpen(false)}
          currentRole={user?.role}
          onRoleSwitched={(newUser) => {
            setUser(newUser);
            loadData();
          }}
        />

        {/* Slot Inspector */}
        {selectedSlot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
            <div className="w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  {selectedSlot.courseCode}
                </span>
                <button onClick={() => setSelectedSlot(null)} className="text-slate-400 hover:text-white">
                  ✕
                </button>
              </div>
              <h4 className="text-sm font-bold text-white">{selectedSlot.courseTitle}</h4>
              <div className="text-xs text-slate-300 mt-2 space-y-1">
                <div>Room: <strong className="text-white font-mono">{selectedSlot.room}</strong></div>
                <div>Time: <strong className="text-white">{selectedSlot.timeSlot}</strong></div>
                <div>Faculty: <span className="text-slate-300">{selectedSlot.faculty}</span></div>
                <div>Status: <span className="font-semibold text-orange-400">{selectedSlot.attendanceStatus}</span></div>
              </div>
              <button
                onClick={() => setSelectedSlot(null)}
                className="mt-4 w-full py-2 rounded-xl bg-orange-500 text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
