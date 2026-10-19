import express from 'express';
import cors from 'cors';
import {
  users,
  courses,
  todayTimetableSlots,
  allTilesDefinition,
  defaultUserTilePreferences,
  sampleAnnouncements,
  initialAssignments,
  initialExamSchedule,
  initialMarksBreakdown,
  initialSemesterHistory,
  initialFeeStatement,
  initialRMSRequests,
  initialLeaveRequests,
  initialMessScans,
  initialLaundryOrders,
  initialLostFoundItems,
  initialEduResources,
  initialEvents
} from './data/seedData.js';
import {
  calculateAttendanceMetrics,
  calculateSGPA,
  generateSignedQRToken,
  verifySignedQRToken
} from './utils/calc.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory states
const userTileStore = { ...defaultUserTilePreferences };
const liveTimetableState = [...todayTimetableSlots];
let liveAssignments = [...initialAssignments];
let liveRMS = [...initialRMSRequests];
let liveLeaves = [...initialLeaveRequests];
let liveMessScans = [...initialMessScans];
let liveLaundryOrders = [...initialLaundryOrders];
let liveLostFound = [...initialLostFoundItems];
let liveEvents = [...initialEvents];
let currentUserId = 'user-rohit';

// ==========================================
// 1. Auth & Profiles
// ==========================================

app.post('/api/auth/login', (req, res) => {
  const { regNo, universityId, password } = req.body;
  const idToMatch = (universityId || regNo || '').trim().toLowerCase();

  if (!idToMatch) {
    return res.status(400).json({
      success: false,
      error: 'University ID is required. Please enter your registration number or employee ID.'
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Password is required to sign in.'
    });
  }

  let user = users.find(u => u.regNo.toLowerCase() === idToMatch);
  if (!user) {
    return res.status(401).json({
      success: false,
      error: `No user found with University ID "${universityId || regNo}". Please enter a valid LPU ID (e.g. 12109842, 12104521, F18902, A10001).`
    });
  }

  if (user.password && password !== user.password && password !== 'lpu@123' && password !== 'password123') {
    return res.status(401).json({
      success: false,
      error: 'Incorrect password. Demo password is: lpu@123'
    });
  }

  currentUserId = user.id;

  return res.json({
    success: true,
    message: `Welcome back, ${user.name}!`,
    token: `mock-jwt-${user.id}-${Date.now()}`,
    user
  });
});

app.get('/api/auth/me', (req, res) => {
  const user = users.find(u => u.id === currentUserId) || users[0];
  return res.json({ success: true, user });
});

app.post('/api/auth/switch-role', (req, res) => {
  const { role } = req.body;
  const user = users.find(u => u.role === role) || users[0];
  currentUserId = user.id;
  return res.json({
    success: true,
    message: `Switched session to ${user.name} (${user.role})`,
    user
  });
});

// ==========================================
// 2. Timetable
// ==========================================

app.get('/api/timetable/today', (req, res) => {
  const user = users.find(u => u.id === currentUserId) || users[0];
  return res.json({
    success: true,
    date: new Date().toISOString().split('T')[0],
    day: 'Monday',
    userRole: user.role,
    slots: liveTimetableState
  });
});

app.post('/api/timetable/slot/:slotId/attendance', (req, res) => {
  const { slotId } = req.params;
  const { status } = req.body;
  const slotIndex = liveTimetableState.findIndex(s => s.id === slotId);
  if (slotIndex === -1) {
    return res.status(404).json({ success: false, error: 'Timetable slot not found' });
  }
  liveTimetableState[slotIndex].attendanceStatus = status;
  return res.json({
    success: true,
    message: `Attendance updated to ${status} for ${liveTimetableState[slotIndex].courseCode}`,
    slot: liveTimetableState[slotIndex]
  });
});

// ==========================================
// 3. Tile Config & Registry
// ==========================================

app.get('/api/tiles/config', (req, res) => {
  const user = users.find(u => u.id === currentUserId) || users[0];
  const userOrder = userTileStore[user.id] || defaultUserTilePreferences[user.id] || [
    'attendance', 'assignment', 'announce', 'exam-schedule', 'fee-statement', 'edu-revolution', 'results', 'view-marks'
  ];

  const availableTiles = allTilesDefinition.filter(tile => {
    if (tile.hostellerOnly && user.role !== 'HOSTELLER') return false;
    return true;
  });

  return res.json({
    success: true,
    userId: user.id,
    enabledTiles: userOrder,
    allTiles: availableTiles
  });
});

app.put('/api/tiles/config', (req, res) => {
  const { enabledTiles } = req.body;
  if (!Array.isArray(enabledTiles)) {
    return res.status(400).json({ success: false, error: 'enabledTiles must be an array' });
  }
  const user = users.find(u => u.id === currentUserId) || users[0];
  userTileStore[user.id] = enabledTiles;
  return res.json({
    success: true,
    message: 'Tiles saved',
    enabledTiles: userTileStore[user.id]
  });
});

// ==========================================
// 4. Attendance
// ==========================================

app.get('/api/attendance/summary', (req, res) => {
  const courseMetrics = courses.map(c => ({
    ...c,
    metrics: calculateAttendanceMetrics(c.attendedLectures, c.totalLectures)
  }));
  const totalAttended = courses.reduce((acc, c) => acc + c.attendedLectures, 0);
  const totalDelivered = courses.reduce((acc, c) => acc + c.totalLectures, 0);
  const overallMetrics = calculateAttendanceMetrics(totalAttended, totalDelivered);

  return res.json({
    success: true,
    overall: overallMetrics,
    courses: courseMetrics
  });
});

// ==========================================
// 5. Hosteller QR Scanners (Mess & Laundry)
// ==========================================

// Scan Mess QR at the mess counter
app.post('/api/mess/scan', (req, res) => {
  const { counterCode = 'LPU-MESS-BH4-CTR2', mealType = 'Lunch' } = req.body;
  const user = users.find(u => u.id === currentUserId) || users[0];

  const newScan = {
    id: `ms-${Date.now()}`,
    meal: mealType,
    location: `${user.hostelBlock || 'BH-4'} Mess Counter (${counterCode})`,
    time: `Today, ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    status: 'VERIFIED'
  };

  liveMessScans.unshift(newScan);

  return res.json({
    success: true,
    message: `Meal entry verified for ${mealType}!`,
    scan: newScan,
    user: {
      name: user.name,
      regNo: user.regNo,
      block: user.hostelBlock,
      room: user.roomNo
    }
  });
});

app.get('/api/mess/history', (req, res) => {
  return res.json({ success: true, history: liveMessScans });
});

// Scan Laundry QR at laundry desk
app.post('/api/laundry/scan', (req, res) => {
  const { action = 'DROP', garmentCount, breakdown, itemizedCategories, bagCode = 'LPU-BAG-412' } = req.body;
  const user = users.find(u => u.id === currentUserId) || users[0];

  if (action === 'DROP') {
    let finalBreakdown = breakdown;
    let finalCount = Number(garmentCount) || 0;

    if (itemizedCategories && typeof itemizedCategories === 'object') {
      const parts = [];
      let total = 0;
      for (const [key, qty] of Object.entries(itemizedCategories)) {
        const count = Number(qty);
        if (count > 0) {
          total += count;
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          parts.push(`${count} ${label}${count > 1 ? (label.endsWith('s') ? '' : 's') : ''}`);
        }
      }
      if (parts.length > 0) {
        finalBreakdown = parts.join(', ');
        finalCount = total;
      }
    }

    if (!finalBreakdown) {
      finalBreakdown = `${finalCount || 8} clothes logged via Scanner`;
    }

    const newOrder = {
      id: `LD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      garmentsCount: finalCount || 8,
      breakdown: finalBreakdown,
      itemizedCategories: itemizedCategories || {},
      dropDate: new Date().toISOString().split('T')[0],
      status: 'WASHING',
      counter: `${user.hostelBlock || 'BH-4'} Laundry Desk`
    };
    liveLaundryOrders.unshift(newOrder);
    return res.json({
      success: true,
      message: `Laundry drop verified! Order ${newOrder.id} logged for ${newOrder.garmentsCount} clothes.`,
      order: newOrder
    });
  } else {
    // Collect order
    if (liveLaundryOrders.length > 0) {
      liveLaundryOrders[0].status = 'COLLECTED';
    }
    return res.json({
      success: true,
      message: 'Laundry bag collected successfully!',
      orders: liveLaundryOrders
    });
  }
});

app.get('/api/laundry/orders', (req, res) => {
  return res.json({ success: true, orders: liveLaundryOrders });
});

// ==========================================
// 6. Assignments
// ==========================================

app.get('/api/assignments', (req, res) => {
  return res.json({ success: true, assignments: liveAssignments });
});

app.post('/api/assignments/:id/submit', (req, res) => {
  const { id } = req.params;
  const { fileName = 'solution_submission.pdf' } = req.body;
  const idx = liveAssignments.findIndex(a => a.id === id);
  if (idx !== -1) {
    liveAssignments[idx].status = 'SUBMITTED';
    liveAssignments[idx].submittedAt = new Date().toLocaleString();
    liveAssignments[idx].fileName = fileName;
  }
  return res.json({
    success: true,
    message: 'Assignment submitted successfully!',
    assignment: liveAssignments[idx]
  });
});

// ==========================================
// 7. Exam Datesheet & Admit Card
// ==========================================

app.get('/api/exams/schedule', (req, res) => {
  return res.json({ success: true, schedule: initialExamSchedule });
});

app.get('/api/exams/admit-card', (req, res) => {
  const user = users.find(u => u.id === currentUserId) || users[0];
  return res.json({
    success: true,
    admitCard: {
      rollNo: user.regNo,
      name: user.name,
      program: user.program,
      examTerm: 'Spring Term End & MTE 2026',
      centerName: 'Lovely Professional University Campus, Phagwara',
      barcode: `LPU-EXAM-${user.regNo}-2026`,
      subjects: initialExamSchedule
    }
  });
});

// ==========================================
// 8. Results & View Marks
// ==========================================

app.get('/api/marks/breakdown', (req, res) => {
  const user = users.find(u => u.id === currentUserId) || users[0];
  return res.json({
    success: true,
    cgpa: user.cgpa || 8.42,
    breakdown: initialMarksBreakdown,
    semesterHistory: initialSemesterHistory
  });
});

// ==========================================
// 9. Fee Statement
// ==========================================

app.get('/api/fees/statement', (req, res) => {
  return res.json({ success: true, statement: initialFeeStatement });
});

app.post('/api/fees/pay', (req, res) => {
  const { amount = 5000, method = 'UPI' } = req.body;
  const newTxn = {
    id: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString().split('T')[0],
    amount,
    mode: method,
    refNo: `LPU-PAY-${Date.now()}`,
    status: 'SUCCESS'
  };
  initialFeeStatement.transactions.unshift(newTxn);
  return res.json({ success: true, message: 'Fee paid successfully!', transaction: newTxn });
});

// ==========================================
// 10. RMS (Request Management System)
// ==========================================

app.get('/api/rms/requests', (req, res) => {
  return res.json({ success: true, requests: liveRMS });
});

app.post('/api/rms/requests', (req, res) => {
  const { category, subject, description, priority = 'MEDIUM' } = req.body;
  const newTicket = {
    id: `RMS-${Math.floor(10000 + Math.random() * 90000)}`,
    category: category || 'Hostel Maintenance',
    subject: subject || 'General Query',
    description: description || 'Issue reported via mobile super-app',
    status: 'OPEN',
    slaDate: 'Within 24 Hours',
    priority,
    createdAt: new Date().toLocaleString(),
    updates: [
      { by: 'System Automation', text: 'Ticket logged and routed to concerned department.', time: 'Just now' }
    ]
  };
  liveRMS.unshift(newTicket);
  return res.json({ success: true, message: 'RMS Ticket submitted successfully!', ticket: newTicket });
});

// ==========================================
// 11. Leave Application & Gatepass
// ==========================================

app.get('/api/leave/requests', (req, res) => {
  return res.json({ success: true, requests: liveLeaves });
});

app.post('/api/leave/apply', (req, res) => {
  const { reason, fromDate, toDate } = req.body;
  const user = users.find(u => u.id === currentUserId) || users[0];
  const newLeave = {
    id: `LV-${Math.floor(10000 + Math.random() * 90000)}`,
    reason: reason || 'Home Visit',
    fromDate: fromDate || '2026-10-25',
    toDate: toDate || '2026-10-28',
    status: 'APPROVED',
    gatepassCode: `GP-${Math.floor(100000 + Math.random() * 900000)}`,
    hostelBlock: user.hostelBlock || 'BH-4',
    roomNo: user.roomNo || '412-B',
    approvedBy: 'Auto-Approved (Hostel Gate System)',
    guardScanned: false
  };
  liveLeaves.unshift(newLeave);
  return res.json({ success: true, message: 'Leave application approved & gate pass created!', leave: newLeave });
});

// ==========================================
// 12. Practical Feedback
// ==========================================

app.post('/api/feedback/submit', (req, res) => {
  const { courseCode, rating, comments, isAnonymous = true } = req.body;
  return res.json({
    success: true,
    message: 'Feedback submitted anonymously. Thank you for your review!'
  });
});

// ==========================================
// 13. Lost & Found
// ==========================================

app.get('/api/lost-found', (req, res) => {
  return res.json({ success: true, items: liveLostFound });
});

app.post('/api/lost-found', (req, res) => {
  const { type, title, location, description } = req.body;
  const user = users.find(u => u.id === currentUserId) || users[0];
  const newItem = {
    id: `lf-${Date.now()}`,
    type: type || 'LOST',
    title,
    location,
    date: 'Today',
    contact: user.email,
    status: 'OPEN',
    description
  };
  liveLostFound.unshift(newItem);
  return res.json({ success: true, message: 'Lost & Found post created!', item: newItem });
});

// ==========================================
// 14. Edu Revolution
// ==========================================

app.get('/api/edu/resources', (req, res) => {
  return res.json({ success: true, resources: initialEduResources });
});

// ==========================================
// 15. Happenings / Events
// ==========================================

app.get('/api/events', (req, res) => {
  return res.json({ success: true, events: liveEvents });
});

app.post('/api/events/:id/rsvp', (req, res) => {
  const { id } = req.params;
  const evt = liveEvents.find(e => e.id === id);
  return res.json({
    success: true,
    message: `RSVP Confirmed for ${evt?.title || 'Event'}!`,
    ticketPass: evt?.ticketPass || 'PASS-CONFIRMED'
  });
});

// Announcements
app.get('/api/announcements', (req, res) => {
  return res.json({ success: true, announcements: sampleAnnouncements });
});

// "Your Dost" AI Mentor
app.post('/api/ai/dost', (req, res) => {
  const { query } = req.body;
  const q = (query || '').toLowerCase();

  let answer = "Namaste! I'm 'Your Dost', your 24/7 AI mentor at LPU. How can I help you today?";

  if (q.includes('skip') || q.includes('attendance') || q.includes('75')) {
    answer = "Based on your current record: In MTH165 (87.5%) you can safely skip up to 8 lectures without falling below 75%. However, in INT219 (71.0%), you must attend the next 5 consecutive lectures to clear the warning threshold!";
  } else if (q.includes('37-703') || q.includes('where is') || q.includes('location') || q.includes('room')) {
    answer = "Room 37-703 is located in Block 37, 7th Floor (School of Computer Applications & Mathematics). Take the central elevators near the main entrance.";
  } else if (q.includes('exam') || q.includes('datesheet') || q.includes('mte')) {
    answer = "Mid-Term Examinations (MTE) are scheduled to begin next month. Your first paper is MTH165 in Block 38, Room 402 at 09:30 AM. Reporting time is 09:00 AM sharp.";
  } else if (q.includes('mess') || q.includes('food') || q.includes('lunch') || q.includes('dinner')) {
    answer = "Today's BH-4 mess menu: Shahi Paneer, Dal Makhani, Steamed Rice, Butter Roti, Mixed Green Salad and Gulab Jamun. Mess timings: 01:00 PM to 02:30 PM & 07:30 PM to 09:30 PM.";
  } else if (q.includes('fee') || q.includes('dues')) {
    answer = "Your semester tuition fees are completely paid with ₹0 outstanding dues! You can download your fee receipts from the Fee Statement tile.";
  } else if (q.includes('leave') || q.includes('gatepass')) {
    answer = "To apply for hostel leave or weekend outing, tap the Leave/Gatepass tile. Approved leaves automatically generate a 6-digit gatepass QR code for hostel security.";
  } else if (q.includes('grade') || q.includes('cgpa') || q.includes('results')) {
    answer = "Your current cumulative CGPA is 8.42 across 5 semesters. In Sem 5 you scored an SGPA of 8.62. To reach an overall 8.5+ CGPA, aim for at least 8.8 SGPA this semester!";
  }

  return res.json({
    success: true,
    query,
    reply: answer,
    quickSuggestions: [
      "How many classes can I skip in MTH165?",
      "Where is Room 37-703 located?",
      "What is today's BH-4 mess menu?",
      "When is my next MTE exam?"
    ]
  });
});

const isDirectExecution = process.argv[1] && (process.argv[1].endsWith('server.js') || process.argv[1].endsWith('server'));

if (!process.env.VERCEL && isDirectExecution) {
  app.listen(PORT, () => {
    console.log(`LPU Campus Hub Server running on http://localhost:${PORT}`);
  });
}

export default app;
