import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAttendanceMetrics,
  calculateSGPA,
  generateSignedQRToken,
  verifySignedQRToken
} from '../src/utils/calc.js';

test('Attendance Metrics: Safe threshold (>= 80%)', () => {
  // Attended 42 out of 48 classes => 87.5%
  const metrics = calculateAttendanceMetrics(42, 48);
  assert.equal(metrics.percentage, 87.5);
  assert.equal(metrics.status, 'safe');
  assert.equal(metrics.isDetainedRisk, false);
  // (42 - 0.75 * 48) / 0.75 = (42 - 36) / 0.75 = 6 / 0.75 = 8 classes can skip
  assert.equal(metrics.canSkip, 8);
  assert.equal(metrics.mustAttend, 0);
});

test('Attendance Metrics: Warning threshold (75% - 79.9%)', () => {
  // Attended 31 out of 40 classes => 77.5%
  const metrics = calculateAttendanceMetrics(31, 40);
  assert.equal(metrics.percentage, 77.5);
  assert.equal(metrics.status, 'warning');
  assert.equal(metrics.isDetainedRisk, false);
  // (31 - 0.75 * 40) / 0.75 = (31 - 30) / 0.75 = 1 / 0.75 = 1 class can skip
  assert.equal(metrics.canSkip, 1);
  assert.equal(metrics.mustAttend, 0);
});

test('Attendance Metrics: Danger threshold (< 75%)', () => {
  // Attended 20 out of 30 classes => 66.7%
  const metrics = calculateAttendanceMetrics(20, 30);
  assert.equal(metrics.percentage, 66.7);
  assert.equal(metrics.status, 'danger');
  assert.equal(metrics.isDetainedRisk, true);
  // Must reach 75%: (0.75 * 30 - 20) / 0.25 = (22.5 - 20) / 0.25 = 2.5 / 0.25 = 10 classes
  assert.equal(metrics.mustAttend, 10);
  assert.equal(metrics.canSkip, 0);
});

test('SGPA Calculation: Weighted credit average', () => {
  const courses = [
    { credits: 4, gradePoint: 10 }, // MTH165: A+ (10) => 40
    { credits: 3, gradePoint: 8 },  // MEC136: B+ (8)  => 24
    { credits: 3, gradePoint: 9 }   // CSE316: A  (9)  => 27
  ];
  // Total points = 91, Total credits = 10 => 9.1
  const sgpa = calculateSGPA(courses);
  assert.equal(sgpa, 9.1);
});

test('QR Token: Generates and successfully verifies genuine token within 30s', () => {
  const { token, expiresAt } = generateSignedQRToken('12109842', 'MESS', 30);
  assert.ok(token);
  assert.ok(expiresAt > Date.now());

  const result = verifySignedQRToken(token);
  assert.equal(result.valid, true);
  assert.equal(result.studentId, '12109842');
  assert.equal(result.serviceType, 'MESS');
});

test('QR Token: Rejects expired token', async () => {
  // Generate token valid for 0 seconds
  const { token } = generateSignedQRToken('12109842', 'MESS', -1);
  const result = verifySignedQRToken(token);
  assert.equal(result.valid, false);
  assert.equal(result.reason, 'EXPIRED');
});

test('QR Token: Rejects tampered token payload', () => {
  const { token } = generateSignedQRToken('12109842', 'MESS', 30);
  // Tamper token by altering payload
  const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf8'));
  decoded.studentId = '99999999'; // Tampered ID
  const tamperedToken = Buffer.from(JSON.stringify(decoded)).toString('base64');

  const result = verifySignedQRToken(tamperedToken);
  assert.equal(result.valid, false);
  assert.equal(result.reason, 'INVALID_SIGNATURE');
});
