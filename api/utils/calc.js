import crypto from 'crypto';

/**
 * Calculates attendance metrics following LPU's 75% mandatory attendance policy.
 * @param {number} attended - Number of attended lectures
 * @param {number} total - Total lectures delivered
 * @returns {object} Attendance analytics
 */
export function calculateAttendanceMetrics(attended, total) {
  if (total <= 0) {
    return {
      percentage: 100,
      status: 'safe',
      canSkip: 0,
      mustAttend: 0,
      message: 'No classes delivered yet'
    };
  }

  const rawPercent = (attended / total) * 100;
  const percentage = Math.round(rawPercent * 10) / 10;

  let status = 'safe';
  let canSkip = 0;
  let mustAttend = 0;

  if (percentage >= 80) {
    status = 'safe';
    // Formula for classes you can skip without falling below 75%:
    // (attended) / (total + x) >= 0.75 => x <= (attended - 0.75 * total) / 0.75
    canSkip = Math.max(0, Math.floor((attended - 0.75 * total) / 0.75));
  } else if (percentage >= 75) {
    status = 'warning';
    canSkip = Math.max(0, Math.floor((attended - 0.75 * total) / 0.75));
  } else {
    status = 'danger';
    // Formula for consecutive classes you must attend to reach 75%:
    // (attended + y) / (total + y) >= 0.75 => y >= (0.75 * total - attended) / (1 - 0.75)
    mustAttend = Math.max(0, Math.ceil((0.75 * total - attended) / 0.25));
  }

  return {
    percentage,
    status,
    canSkip,
    mustAttend,
    isDetainedRisk: percentage < 75
  };
}

/**
 * Calculates CGPA / SGPA based on course grades and credit weights
 * @param {Array<{ credits: number, gradePoint: number }>} courses
 * @returns {number}
 */
export function calculateSGPA(courses) {
  if (!courses || courses.length === 0) return 0;
  let totalCredits = 0;
  let totalPoints = 0;

  for (const c of courses) {
    totalCredits += c.credits;
    totalPoints += c.credits * c.gradePoint;
  }

  if (totalCredits === 0) return 0;
  return Math.round((totalPoints / totalCredits) * 100) / 100;
}

const QR_SECRET = process.env.QR_SECRET || 'lpu_campus_hub_secure_qr_secret_2026';

/**
 * Generates a tamper-proof 30-second rotating QR payload
 * @param {string} studentId
 * @param {'MESS' | 'LAUNDRY'} serviceType
 * @param {number} [validitySeconds=30]
 */
export function generateSignedQRToken(studentId, serviceType, validitySeconds = 30) {
  const timestamp = Date.now();
  const expiresAt = timestamp + validitySeconds * 1000;
  const rawPayload = `${studentId}:${serviceType}:${timestamp}:${expiresAt}`;
  const hmac = crypto.createHmac('sha256', QR_SECRET).update(rawPayload).digest('hex');

  return {
    token: Buffer.from(JSON.stringify({ studentId, serviceType, timestamp, expiresAt, signature: hmac })).toString('base64'),
    expiresAt,
    ttlRemaining: validitySeconds
  };
}

/**
 * Verifies a rotating QR token server-side
 * @param {string} tokenBase64
 */
export function verifySignedQRToken(tokenBase64) {
  try {
    const jsonStr = Buffer.from(tokenBase64, 'base64').toString('utf8');
    const { studentId, serviceType, timestamp, expiresAt, signature } = JSON.parse(jsonStr);

    // 1. Check expiration
    if (Date.now() > expiresAt) {
      return { valid: false, reason: 'EXPIRED', message: 'QR Code has expired. Please refresh the token.' };
    }

    // 2. Validate HMAC signature
    const rawPayload = `${studentId}:${serviceType}:${timestamp}:${expiresAt}`;
    const expectedSig = crypto.createHmac('sha256', QR_SECRET).update(rawPayload).digest('hex');

    if (signature !== expectedSig) {
      return { valid: false, reason: 'INVALID_SIGNATURE', message: 'Tampered QR code detected.' };
    }

    return { valid: true, studentId, serviceType, expiresAt };
  } catch (err) {
    return { valid: false, reason: 'MALFORMED', message: 'Invalid QR token format' };
  }
}
