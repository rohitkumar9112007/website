const API_BASE = '/api';

export async function fetchMe() {
  try {
    const res = await fetch(`${API_BASE}/auth/me`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return await res.json();
  } catch (err) {
    console.warn('API error, using cached user:', err);
    return null;
  }
}

export async function loginUser(regNo, password, role) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ regNo, password, role })
    });
    return await res.json();
  } catch (err) {
    console.error('Login error:', err);
    return null;
  }
}

export async function switchRole(role) {
  try {
    const res = await fetch(`${API_BASE}/auth/switch-role`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role })
    });
    return await res.json();
  } catch (err) {
    console.error('Switch role error:', err);
    return null;
  }
}

export async function fetchTimetableToday() {
  try {
    const res = await fetch(`${API_BASE}/timetable/today`);
    if (!res.ok) throw new Error('Failed to fetch timetable');
    return await res.json();
  } catch (err) {
    console.warn('Using local timetable:', err);
    return null;
  }
}

export async function fetchTileConfig() {
  try {
    const res = await fetch(`${API_BASE}/tiles/config`);
    if (!res.ok) throw new Error('Failed to fetch tile config');
    return await res.json();
  } catch (err) {
    console.warn('Using local tile config:', err);
    return null;
  }
}

export async function saveTileConfig(enabledTiles) {
  try {
    const res = await fetch(`${API_BASE}/tiles/config`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabledTiles })
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to save tiles:', err);
    return null;
  }
}

export async function fetchAttendanceSummary() {
  try {
    const res = await fetch(`${API_BASE}/attendance/summary`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Mess QR Scanner endpoint
export async function scanMessQR(counterCode, mealType) {
  try {
    const res = await fetch(`${API_BASE}/mess/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ counterCode, mealType })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchMessHistory() {
  try {
    const res = await fetch(`${API_BASE}/mess/history`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Laundry QR Scanner endpoint
export async function scanLaundryQR(action, garmentCount, bagCode) {
  try {
    const res = await fetch(`${API_BASE}/laundry/scan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, garmentCount, bagCode })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchLaundryOrders() {
  try {
    const res = await fetch(`${API_BASE}/laundry/orders`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Assignments
export async function fetchAssignments() {
  try {
    const res = await fetch(`${API_BASE}/assignments`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function submitAssignment(id, fileName) {
  try {
    const res = await fetch(`${API_BASE}/assignments/${id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Exams
export async function fetchExamsSchedule() {
  try {
    const res = await fetch(`${API_BASE}/exams/schedule`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function fetchAdmitCard() {
  try {
    const res = await fetch(`${API_BASE}/exams/admit-card`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Marks & Results
export async function fetchMarksBreakdown() {
  try {
    const res = await fetch(`${API_BASE}/marks/breakdown`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Fees
export async function fetchFeeStatement() {
  try {
    const res = await fetch(`${API_BASE}/fees/statement`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function payFee(amount, method) {
  try {
    const res = await fetch(`${API_BASE}/fees/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, method })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// RMS
export async function fetchRMSRequests() {
  try {
    const res = await fetch(`${API_BASE}/rms/requests`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createRMSRequest(category, subject, description, priority) {
  try {
    const res = await fetch(`${API_BASE}/rms/requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, subject, description, priority })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Leave & Gatepass
export async function fetchLeaveRequests() {
  try {
    const res = await fetch(`${API_BASE}/leave/requests`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function applyLeave(reason, fromDate, toDate) {
  try {
    const res = await fetch(`${API_BASE}/leave/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason, fromDate, toDate })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Feedback
export async function submitPracticalFeedback(courseCode, rating, comments) {
  try {
    const res = await fetch(`${API_BASE}/feedback/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseCode, rating, comments })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Lost & Found
export async function fetchLostFound() {
  try {
    const res = await fetch(`${API_BASE}/lost-found`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createLostFound(type, title, location, description) {
  try {
    const res = await fetch(`${API_BASE}/lost-found`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, title, location, description })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Edu Revolution
export async function fetchEduResources() {
  try {
    const res = await fetch(`${API_BASE}/edu/resources`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// Events
export async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function rsvpEvent(id) {
  try {
    const res = await fetch(`${API_BASE}/events/${id}/rsvp`, {
      method: 'POST'
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

// AI Assistant
export async function askYourDost(query) {
  try {
    const res = await fetch(`${API_BASE}/ai/dost`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    return await res.json();
  } catch (err) {
    console.error(err);
    return {
      success: true,
      reply: "I am ready to help with your LPU academic timetable, attendance skips, exam datesheet, and mess menu!"
    };
  }
}
