export const users = [
  {
    id: 'user-rohit',
    regNo: '12109842',
    password: 'lpu@123',
    name: 'Rohit Kumar',
    email: 'rohit.12109842@lpu.in',
    role: 'HOSTELLER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    program: 'B.Tech Computer Science & Engineering',
    section: 'K21KR',
    semester: 6,
    cgpa: 8.42,
    hostelBlock: 'BH-4 (Boys Hostel 4)',
    roomNo: '412-B',
    mentorName: 'Dr. Harpreet Singh',
    attendanceOverall: 84.8
  },
  {
    id: 'user-priya',
    regNo: '12104521',
    password: 'lpu@123',
    name: 'Priya Sharma',
    email: 'priya.12104521@lpu.in',
    role: 'STUDENT',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&q=80',
    program: 'B.Tech Computer Science & Engineering',
    section: 'K21KR',
    semester: 6,
    cgpa: 9.15,
    busRoute: 'Bus Route 7 (Jalandhar Cantt)',
    mentorName: 'Dr. Pooja Verma',
    attendanceOverall: 91.2
  },
  {
    id: 'user-harpreet',
    regNo: 'F18902',
    password: 'lpu@123',
    name: 'Dr. Harpreet Singh',
    email: 'harpreet.18902@lpu.in',
    role: 'FACULTY',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    department: 'School of Computer Science & Engineering',
    designation: 'Associate Professor',
    cabin: '34-601A'
  },
  {
    id: 'user-admin',
    regNo: 'A10001',
    password: 'lpu@123',
    name: 'LPU Admin Office',
    email: 'admin.dsa@lpu.in',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&q=80',
    department: 'Division of Student Affairs & Examination Cell'
  }
];

export const courses = [
  {
    id: 'course-mth165',
    code: 'MTH165',
    title: 'Engineering Mathematics-II',
    credits: 4,
    faculty: 'Dr. Harpreet Singh',
    defaultRoom: '37-703',
    attendedLectures: 35,
    totalLectures: 40,
    percentage: 87.5,
    status: 'safe'
  },
  {
    id: 'course-mec136',
    code: 'MEC136',
    title: 'Engineering Graphics & CAD',
    credits: 3,
    faculty: 'Er. Rajesh Sharma',
    defaultRoom: '28-503',
    attendedLectures: 26,
    totalLectures: 34,
    percentage: 76.5,
    status: 'warning'
  },
  {
    id: 'course-cse316',
    code: 'CSE316',
    title: 'Operating Systems & Concurrency',
    credits: 4,
    faculty: 'Dr. Pooja Verma',
    defaultRoom: '34-601',
    attendedLectures: 38,
    totalLectures: 42,
    percentage: 90.5,
    status: 'safe'
  },
  {
    id: 'course-int219',
    code: 'INT219',
    title: 'Full Stack Web Development',
    credits: 3,
    faculty: 'Er. Vikas Dogra',
    defaultRoom: '38-502',
    attendedLectures: 22,
    totalLectures: 31,
    percentage: 71.0,
    status: 'danger'
  }
];

export const todayTimetableSlots = [
  {
    id: 'slot-1',
    courseCode: 'MTH165',
    courseTitle: 'Engineering Mathematics-II',
    room: '37-703',
    timeSlot: '09:20 - 10:10 AM',
    startTime: '09:20',
    endTime: '10:10',
    faculty: 'Dr. Harpreet Singh',
    attendanceStatus: 'PRESENT',
    isLive: false,
    type: 'Lecture'
  },
  {
    id: 'slot-2',
    courseCode: 'MEC136',
    courseTitle: 'Engineering Graphics & CAD',
    room: '28-503',
    timeSlot: '10:20 - 11:10 AM',
    startTime: '10:20',
    endTime: '11:10',
    faculty: 'Er. Rajesh Sharma',
    attendanceStatus: 'NOT_MARKED',
    isLive: true,
    type: 'Lecture'
  },
  {
    id: 'slot-3',
    courseCode: 'CSE316',
    courseTitle: 'Operating Systems & Concurrency',
    room: '34-601',
    timeSlot: '11:20 - 12:10 PM',
    startTime: '11:20',
    endTime: '12:10',
    faculty: 'Dr. Pooja Verma',
    attendanceStatus: 'NOT_MARKED',
    isLive: false,
    type: 'Lecture'
  },
  {
    id: 'slot-lunch',
    courseCode: 'LUNCH',
    courseTitle: 'Lunch Break & Mess Hours',
    room: 'Hostel Mess / UniMall Food Court',
    timeSlot: '01:00 - 02:00 PM',
    startTime: '13:00',
    endTime: '14:00',
    faculty: 'Campus Dining Services',
    attendanceStatus: 'NOT_MARKED',
    isLive: false,
    type: 'Break'
  },
  {
    id: 'slot-4',
    courseCode: 'INT219',
    courseTitle: 'Full Stack Web Development Lab',
    room: '38-502 (Mac Lab)',
    timeSlot: '02:00 - 03:40 PM',
    startTime: '14:00',
    endTime: '15:40',
    faculty: 'Er. Vikas Dogra',
    attendanceStatus: 'NOT_MARKED',
    isLive: false,
    type: 'Lab'
  }
];

// All available quick-access tiles with updated QR Scanner instead of static QR
export const allTilesDefinition = [
  {
    id: 'announce',
    name: 'Announce',
    hindiName: 'सूचनाएँ',
    badge: '3 New',
    icon: 'Megaphone',
    color: 'from-amber-500 to-orange-600',
    category: 'Academic',
    description: 'Official notifications from Dean and Registrar'
  },
  {
    id: 'edu-revolution',
    name: 'Edu Revolution',
    hindiName: 'शिक्षा क्रांति',
    badge: 'Hub',
    icon: 'GraduationCap',
    color: 'from-blue-600 to-indigo-700',
    category: 'Learning',
    description: 'Digital study material, lecture notes & PPTs'
  },
  {
    id: 'fee-statement',
    name: 'Fee Statement',
    hindiName: 'शुल्क विवरण',
    badge: 'Clear',
    icon: 'Receipt',
    color: 'from-emerald-500 to-teal-700',
    category: 'Finance',
    description: 'Tuition fees, dues, online pay & e-receipts'
  },
  {
    id: 'attendance',
    name: 'Attendance',
    hindiName: 'उपस्थिति',
    badge: '84.8%',
    icon: 'UserCheck',
    color: 'from-orange-500 to-red-600',
    category: 'Academic',
    description: 'Detailed 75% rule tracker & skip calculator'
  },
  {
    id: 'exam',
    name: 'Exam',
    hindiName: 'परीक्षा',
    badge: 'MTE Soon',
    icon: 'FileText',
    color: 'from-purple-600 to-pink-600',
    category: 'Exams',
    description: 'Admit card, seating arrangement & syllabus'
  },
  {
    id: 'assignment',
    name: 'Assignment',
    hindiName: 'असाइनमेंट',
    badge: '2 Due',
    icon: 'CheckSquare',
    color: 'from-cyan-600 to-blue-600',
    category: 'Academic',
    description: 'Submission portals, deadlines & grading'
  },
  {
    id: 'results',
    name: 'Results',
    hindiName: 'परिणाम',
    badge: 'Sem 5 Out',
    icon: 'Award',
    color: 'from-yellow-500 to-amber-600',
    category: 'Academic',
    description: 'Semester grade sheets, TGPA & CGPA'
  },
  {
    id: 'exam-schedule',
    name: 'Exams (Schedule)',
    hindiName: 'परीक्षा कार्यक्रम',
    badge: 'Datesheet',
    icon: 'Calendar',
    color: 'from-rose-500 to-red-700',
    category: 'Exams',
    description: 'Full official datesheet & countdown'
  },
  {
    id: 'rms-status',
    name: 'RMS Status',
    hindiName: 'आरएमएस स्थिति',
    badge: '1 Pending',
    icon: 'Clock',
    color: 'from-violet-600 to-purple-800',
    category: 'Services',
    description: 'Real-time tracking of filed grievances'
  },
  {
    id: 'practical-feedback',
    name: 'Practical Feedback',
    hindiName: 'प्रायोगिक फीडबैक',
    badge: 'Open',
    icon: 'MessageSquareShare',
    color: 'from-teal-500 to-emerald-700',
    category: 'Academic',
    description: 'Anonymous lab & instructor rating'
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    hindiName: 'डैशबोर्ड',
    badge: 'Analytics',
    icon: 'LayoutDashboard',
    color: 'from-slate-700 to-slate-900',
    category: 'Overview',
    description: 'Comprehensive 360 overview of student status'
  },
  {
    id: 'happenings',
    name: 'Happenings',
    hindiName: 'आयोजन',
    badge: 'One World',
    icon: 'Sparkles',
    color: 'from-pink-500 to-rose-600',
    category: 'Campus Life',
    description: 'Cultural fests, celebrity visits & clubs'
  },
  {
    id: 'rms',
    name: 'RMS',
    hindiName: 'आरएमएस सहायता',
    badge: 'New Query',
    icon: 'HelpCircle',
    color: 'from-indigo-500 to-blue-700',
    category: 'Services',
    description: 'Raise Request Management System ticket'
  },
  {
    id: 'view-marks',
    name: 'View Marks',
    hindiName: 'अंक देखें',
    badge: 'CA 1 & 2',
    icon: 'TrendingUp',
    color: 'from-amber-600 to-orange-700',
    category: 'Academic',
    description: 'Continuous Assessment, MTE & ETE breakup'
  },
  // Hosteller-only QR Scanner services (Scanner inserted instead of plain QR as requested):
  {
    id: 'mess-scanner',
    name: 'Mess Scanner',
    hindiName: 'मेस स्कैनर',
    badge: 'Scan Meal',
    icon: 'ScanLine',
    color: 'from-orange-600 to-amber-700',
    category: 'Hostel',
    hostellerOnly: true,
    description: 'Scan mess counter QR code for instant meal entry'
  },
  {
    id: 'laundry-scanner',
    name: 'Laundry Scanner',
    hindiName: 'लॉन्ड्री स्कैनर',
    badge: 'Scan Tag',
    icon: 'QrCode',
    color: 'from-sky-600 to-blue-700',
    category: 'Hostel',
    hostellerOnly: true,
    description: 'Scan laundry counter or bag tag to log garments'
  },
  {
    id: 'leave-gatepass',
    name: 'Leave / Gatepass',
    hindiName: 'छुट्टी / गेट पास',
    badge: 'Apply',
    icon: 'LogOut',
    color: 'from-emerald-600 to-teal-800',
    category: 'Services',
    description: 'Hostel leave approval & digital gate QR pass'
  },
  {
    id: 'lost-found',
    name: 'Lost & Found',
    hindiName: 'खोया-पाया',
    badge: 'Items',
    icon: 'Search',
    color: 'from-purple-500 to-indigo-600',
    category: 'Campus Life',
    description: 'Report lost IDs, phones, laptops or claim found items'
  }
];

export const defaultUserTilePreferences = {
  'user-rohit': [
    'attendance',
    'assignment',
    'announce',
    'mess-scanner',
    'laundry-scanner',
    'exam-schedule',
    'rms-status',
    'view-marks',
    'fee-statement',
    'edu-revolution',
    'results',
    'happenings'
  ],
  'user-priya': [
    'attendance',
    'assignment',
    'announce',
    'exam-schedule',
    'view-marks',
    'fee-statement',
    'edu-revolution',
    'results',
    'rms',
    'practical-feedback',
    'happenings',
    'dashboard'
  ]
};

export const sampleAnnouncements = [
  {
    id: 'ann-1',
    title: 'Mid-Term Examination (MTE) Schedule Released for Spring 2026',
    date: 'Today, 08:30 AM',
    category: 'EXAM',
    pinned: true,
    author: 'Controller of Examinations',
    summary: 'MTE begins on March 3rd, 2026. Verify your seating allocation in Block 37 and Block 38.'
  },
  {
    id: 'ann-2',
    title: 'One World 2026 International Mega Cultural Fest Registrations Open',
    date: 'Yesterday',
    category: 'EVENTS',
    pinned: true,
    author: 'Division of Student Welfare',
    summary: 'Represent your state or country! Stall registrations close this Friday at UniMall.'
  },
  {
    id: 'ann-3',
    title: 'Mandatory 75% Attendance Compliance Reminder',
    date: '2 days ago',
    category: 'ACADEMIC',
    pinned: false,
    author: 'Dean Academics',
    summary: 'Students with attendance below 75% will be placed in the warning list before MTE.'
  }
];

// 1. Assignments
export const initialAssignments = [
  {
    id: 'asg-1',
    courseCode: 'MTH165',
    courseTitle: 'Engineering Mathematics-II',
    title: 'Laplace Transforms & Fourier Series Problem Set 4',
    dueDate: '2026-10-23',
    maxMarks: 100,
    status: 'PENDING',
    description: 'Solve problems 1-15 on Page 248. Upload neat scanned handwritten PDF.'
  },
  {
    id: 'asg-2',
    courseCode: 'MEC136',
    courseTitle: 'Engineering Graphics & CAD',
    title: 'AutoCAD Isometric Assembly Projection - Lab Work 3',
    dueDate: '2026-10-25',
    maxMarks: 50,
    status: 'PENDING',
    description: 'Draw 3D isometric model with orthographic cross-section views.'
  },
  {
    id: 'asg-3',
    courseCode: 'CSE316',
    courseTitle: 'Operating Systems & Concurrency',
    title: 'Dining Philosophers Problem & Semaphore Simulator',
    dueDate: '2026-10-18',
    maxMarks: 100,
    status: 'SUBMITTED',
    grade: '94/100',
    submittedAt: '2026-10-17 18:24',
    description: 'Implement POSIX semaphore based synchronization in C/C++.'
  },
  {
    id: 'asg-4',
    courseCode: 'INT219',
    courseTitle: 'Full Stack Web Development',
    title: 'React Modular Dashboard Component System',
    dueDate: '2026-10-15',
    maxMarks: 50,
    status: 'GRADED',
    grade: '48/50',
    submittedAt: '2026-10-14 21:10',
    description: 'Build stateful widgets with dark-mode toggle and responsive UI.'
  }
];

// 2. Exam Schedule & Datesheet
export const initialExamSchedule = [
  {
    id: 'exam-1',
    courseCode: 'MTH165',
    courseTitle: 'Engineering Mathematics-II',
    examType: 'MTE (Mid Term)',
    date: '2026-11-03',
    time: '09:30 AM - 12:30 PM',
    room: 'Block 38, Room 402',
    seatNo: 'B-24',
    reportingTime: '09:00 AM'
  },
  {
    id: 'exam-2',
    courseCode: 'MEC136',
    courseTitle: 'Engineering Graphics & CAD',
    examType: 'MTE (Mid Term)',
    date: '2026-11-05',
    time: '09:30 AM - 12:30 PM',
    room: 'Block 28, Drawing Hall 501',
    seatNo: 'DH-18',
    reportingTime: '09:00 AM'
  },
  {
    id: 'exam-3',
    courseCode: 'CSE316',
    courseTitle: 'Operating Systems & Concurrency',
    examType: 'MTE (Mid Term)',
    date: '2026-11-08',
    time: '02:00 PM - 05:00 PM',
    room: 'Block 34, Room 603',
    seatNo: 'A-12',
    reportingTime: '01:30 PM'
  },
  {
    id: 'exam-4',
    courseCode: 'INT219',
    courseTitle: 'Full Stack Web Development',
    examType: 'MTE (Mid Term)',
    date: '2026-11-11',
    time: '09:30 AM - 12:30 PM',
    room: 'Block 37, Room 305',
    seatNo: 'C-08',
    reportingTime: '09:00 AM'
  }
];

// 3. Marks & Results
export const initialMarksBreakdown = [
  {
    courseCode: 'MTH165',
    courseTitle: 'Engineering Mathematics-II',
    credits: 4,
    ca1: 28,
    ca2: 27,
    mte: 44,
    grade: 'A+',
    gradePoint: 9
  },
  {
    courseCode: 'MEC136',
    courseTitle: 'Engineering Graphics & CAD',
    credits: 3,
    ca1: 24,
    ca2: 23,
    mte: 38,
    grade: 'B+',
    gradePoint: 8
  },
  {
    courseCode: 'CSE316',
    courseTitle: 'Operating Systems & Concurrency',
    credits: 4,
    ca1: 29,
    ca2: 28,
    mte: 46,
    grade: 'A+',
    gradePoint: 10
  },
  {
    courseCode: 'INT219',
    courseTitle: 'Full Stack Web Development',
    credits: 3,
    ca1: 22,
    ca2: 24,
    mte: 35,
    grade: 'B',
    gradePoint: 7
  }
];

export const initialSemesterHistory = [
  { sem: 'Sem 1', sgpa: 8.12, credits: 22 },
  { sem: 'Sem 2', sgpa: 8.25, credits: 24 },
  { sem: 'Sem 3', sgpa: 8.38, credits: 22 },
  { sem: 'Sem 4', sgpa: 8.54, credits: 25 },
  { sem: 'Sem 5', sgpa: 8.62, credits: 23 },
  { sem: 'Sem 6 (Current)', sgpa: 8.75, credits: 20 }
];

// 4. Fee Statement
export const initialFeeStatement = {
  totalDues: 0,
  currency: 'INR',
  dueDate: '2026-01-15',
  status: 'PAID',
  items: [
    { title: 'Academic Tuition Fee (Spring 2026)', amount: 75000, status: 'PAID' },
    { title: 'Hostel Accommodation (BH-4 2-Seater AC)', amount: 45000, status: 'PAID' },
    { title: 'Standard Mess Dining Charges', amount: 22000, status: 'PAID' },
    { title: 'Examination & Computing Lab Fee', amount: 4500, status: 'PAID' }
  ],
  transactions: [
    {
      id: 'TXN-982138',
      date: '2026-01-12',
      amount: 146500,
      mode: 'UPI (Google Pay)',
      refNo: 'LPU-UPI-982138402',
      status: 'SUCCESS'
    }
  ]
};

// 5. RMS (Request Management System)
export const initialRMSRequests = [
  {
    id: 'RMS-10492',
    category: 'Hostel Maintenance',
    subject: 'Room 412-B Wi-Fi router packet loss',
    description: 'Internet connection drops every 5 minutes in BH-4 4th floor wing B.',
    status: 'IN_PROGRESS',
    slaDate: 'Today, 06:00 PM',
    priority: 'HIGH',
    createdAt: '2026-10-18 11:30',
    updates: [
      { by: 'Chief Warden Office', text: 'Assigned to Network Engineering Team Block 34.', time: 'Yesterday 14:00' },
      { by: 'Network Engineer', text: 'Access point AP-412 tested. Signal repeater scheduled for reset.', time: 'Today 09:30' }
    ]
  },
  {
    id: 'RMS-10311',
    category: 'Academic Cell',
    subject: 'Elective Subject Preference Confirmation',
    description: 'Confirmation required for Cloud Computing elective allocation in 7th sem.',
    status: 'RESOLVED',
    slaDate: 'Closed',
    priority: 'MEDIUM',
    createdAt: '2026-10-10 15:20',
    rating: 5,
    updates: [
      { by: 'Registrar Academic', text: 'Elective verified and added to course basket.', time: '2026-10-11 10:15' }
    ]
  }
];

// 6. Leave Applications & Gatepass
export const initialLeaveRequests = [
  {
    id: 'LV-49102',
    reason: 'Weekend Family Visit to Ludhiana',
    fromDate: '2026-10-24',
    toDate: '2026-10-26',
    status: 'APPROVED',
    gatepassCode: 'GP-901428',
    hostelBlock: 'BH-4',
    roomNo: '412-B',
    approvedBy: 'Warden Er. Manpreet Singh',
    guardScanned: false
  },
  {
    id: 'LV-48911',
    reason: 'National Hackathon at IIT Delhi',
    fromDate: '2026-11-10',
    toDate: '2026-11-13',
    status: 'PENDING',
    mentorReview: 'Dr. Harpreet Singh (Under Review)',
    gatepassCode: null
  }
];

// 7. Mess Scan Logs & Meal History
export const initialMessScans = [
  { id: 'ms-1', meal: 'Lunch', location: 'BH-4 Mess Counter 2', time: 'Today, 13:14', status: 'VERIFIED' },
  { id: 'ms-2', meal: 'Breakfast', location: 'BH-4 Mess Counter 1', time: 'Today, 08:32', status: 'VERIFIED' },
  { id: 'ms-3', meal: 'Dinner', location: 'BH-4 Mess Counter 3', time: 'Yesterday, 20:45', status: 'VERIFIED' }
];

// 8. Laundry Orders
export const initialLaundryOrders = [
  {
    id: 'LD-2026-8941',
    garmentsCount: 8,
    breakdown: '3 Shirts, 2 Jeans, 1 Towel, 2 T-shirts',
    dropDate: '2026-10-18',
    status: 'READY_FOR_PICKUP',
    counter: 'BH-4 Laundry Desk'
  },
  {
    id: 'LD-2026-8720',
    garmentsCount: 6,
    breakdown: '4 Kurtas, 2 Trousers',
    dropDate: '2026-10-14',
    status: 'COLLECTED',
    counter: 'BH-4 Laundry Desk'
  }
];

// 9. Lost & Found Items
export const initialLostFoundItems = [
  {
    id: 'lf-1',
    type: 'LOST',
    title: 'Blue Dell XPS Laptop Charger',
    location: 'Central Library 3rd Floor, Table 14',
    date: '2026-10-18',
    contact: 'rohit.12109842@lpu.in',
    status: 'OPEN',
    description: 'Type-C 65W original black/blue charger forgotten during afternoon study session.'
  },
  {
    id: 'lf-2',
    type: 'FOUND',
    title: 'LPU Student ID Card (Rohan Verma - 12105432)',
    location: 'UniMall Food Court near Subway',
    date: '2026-10-19',
    contact: 'Handed over to UniMall Helpdesk',
    status: 'OPEN',
    description: 'Found plastic ID card on table. Safe at UniMall security office.'
  },
  {
    id: 'lf-3',
    type: 'FOUND',
    title: 'Black boAt Airdopes Charging Case',
    location: 'Block 37 4th Floor Stairs',
    date: '2026-10-17',
    contact: 'Security Block 37',
    status: 'CLAIMED',
    description: 'Matte black case with sticker. Claimed by rightful owner.'
  }
];

// 10. Edu Revolution Hub
export const initialEduResources = [
  {
    id: 'edu-1',
    courseCode: 'MTH165',
    title: 'Differential Equations & Series Full Notes',
    type: 'PDF',
    size: '4.8 MB',
    downloads: 1420
  },
  {
    id: 'edu-2',
    courseCode: 'MEC136',
    title: 'AutoCAD 3D Modeling Video Lecture Series',
    type: 'VIDEO',
    size: '45 mins',
    downloads: 890
  },
  {
    id: 'edu-3',
    courseCode: 'CSE316',
    title: 'Operating Systems Previous Year Papers (PYQ 2022-2025)',
    type: 'PDF',
    size: '3.2 MB',
    downloads: 2150
  },
  {
    id: 'edu-4',
    courseCode: 'INT219',
    title: 'Full Stack React & Node Architecture Guide',
    type: 'PDF',
    size: '6.1 MB',
    downloads: 1780
  }
];

// 11. Happenings & Events
export const initialEvents = [
  {
    id: 'evt-1',
    title: 'One World 2026 - International Mega Cultural Fest',
    date: '28-29 Oct 2026',
    venue: 'Shanti Devi Mittal Auditorium & UniMall',
    category: 'Cultural',
    ticketPass: 'OW-7721-VIP',
    description: 'Celebrate culture from 50+ countries with national stalls, live performances and international cuisine.'
  },
  {
    id: 'evt-2',
    title: 'Google Developer Student Clubs: Agentic AI Hackathon',
    date: '25 Oct 2026',
    venue: 'Baldev Raj Mittal Unipolis',
    category: 'Technology',
    ticketPass: 'GDSC-9921',
    description: 'Build agentic full-stack applications with AI mentors and win cash prizes worth ₹1.5 Lakhs.'
  },
  {
    id: 'evt-3',
    title: 'YouthVibe 2026 National Inter-University Fest',
    date: '15-18 Nov 2026',
    venue: 'LPU Mega Amphitheater',
    category: 'Celebrity Night',
    ticketPass: 'YV-2026-PASS',
    description: 'Star celebrity performances, battle of the bands, robotics, and fashion show.'
  }
];
