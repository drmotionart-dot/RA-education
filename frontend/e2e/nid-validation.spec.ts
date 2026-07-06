import { test, expect } from '@playwright/test';

const API_BASE = 'http://127.0.0.1:3000/api';

let counter = Date.now() % 1000000;
function uniqueMobile(): string {
  counter++;
  return `+20100000${String(counter).slice(-6).padStart(6, '0')}`;
}

// Generate a fresh, unique NID for the duplicate test by calling the library.
// Uses a unique serial portion (via Date.now()) so it's never been registered.
function generateUniqueNID(): string {
  const birthday = '1992-03-20';
  const parts = birthday.split('-');
  const century = parts[0] < '2000' ? '2' : '3';
  const yy = parts[0].slice(-2);
  const mm = parts[1];
  const dd = parts[2];
  const gov = '02'; // Alexandria
  const serial = String(Date.now()).slice(-3).padStart(3, '0'); // unique serial (3 digits)
  const genderDigit = '0'; // even = female
  const baseId = `${century}${yy}${mm}${dd}${gov}${serial}${genderDigit}`;
  // Compute checksum using same algorithm as egypt-natid
  const mult = [2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 13; i++) sum += parseInt(baseId[i]) * mult[i];
  const check = Math.abs(11 - (sum % 11)) % 10;
  return baseId + check;
}

// All NIDs pre-verified against egypt-natid library:
//   VALID_NID:      29001150149032  Cairo, Male,   1990-01-15, age 36
//   FEMALE_NID:     29001150118382  Cairo, Female, 1990-01-15, age 36
//   UNDER_16_NID:   32001010179554  Cairo, Male,   2020-01-01, age  6
//   BAD_CHECKSUM:   29001150149037  (same as VALID but digit 13 changed)
//   ALEX_NID:       29506030293754  Alex,  Male,   1995-06-03, age 31
const VALID_NID = '29001150149032';
const FEMALE_NID = '29001150118382';
const BAD_CHECKSUM_NID = '29001150149037';
const UNDER_16_NID = '32001010179554';
const ALEX_NID = '29506030293754';

test.describe('NID Validation — 7 failure modes', () => {
  test('1: wrong format → "This National ID is invalid."', async ({ request }) => {
    const mobile = uniqueMobile();
    const res = await request.post(`${API_BASE}/auth/register`, {
      data: {
        full_name: 'Test User',
        mobile_number: mobile,
        email: `fmt-${mobile.replace(/\D/g, '')}@test.com`,
        password: 'Password123!',
        national_id: '1234',
        date_of_birth: '1990-01-15',
        gender: 'male',
        governorate: 'Cairo',
        role: 'doctor',
      },
    });
    expect(res.ok()).toBeFalsy();
    const body = await res.json();
    expect(body.error).toBe('This National ID is invalid.');
  });

  test('2: bad checksum → "This National ID is invalid."', async ({ request }) => {
    const mobile = uniqueMobile();
    const res = await request.post(`${API_BASE}/auth/register`, {
      data: {
        full_name: 'Test User',
        mobile_number: mobile,
        email: `chk-${mobile.replace(/\D/g, '')}@test.com`,
        password: 'Password123!',
        national_id: BAD_CHECKSUM_NID,
        date_of_birth: '1990-01-15',
        gender: 'male',
        governorate: 'Cairo',
        role: 'doctor',
      },
    });
    expect(res.ok()).toBeFalsy();
    const body = await res.json();
    expect(body.error).toBe('This National ID is invalid.');
  });

  test('3: under 16 → "This National ID is invalid."', async ({ request }) => {
    const mobile = uniqueMobile();
    const res = await request.post(`${API_BASE}/auth/register`, {
      data: {
        full_name: 'Test User',
        mobile_number: mobile,
        email: `age-${mobile.replace(/\D/g, '')}@test.com`,
        password: 'Password123!',
        national_id: UNDER_16_NID,
        date_of_birth: '2020-01-01',
        gender: 'male',
        governorate: 'Cairo',
        role: 'doctor',
      },
    });
    expect(res.ok()).toBeFalsy();
    const body = await res.json();
    expect(body.error).toBe('This National ID is invalid.');
  });

  test('4: DOB mismatch → "This National ID is invalid."', async ({ request }) => {
    const mobile = uniqueMobile();
    // NID encodes 1990-01-15, submit 1990-06-03 (all other fields match)
    const res = await request.post(`${API_BASE}/auth/register`, {
      data: {
        full_name: 'Test User',
        mobile_number: mobile,
        email: `dob-${mobile.replace(/\D/g, '')}@test.com`,
        password: 'Password123!',
        national_id: VALID_NID,
        date_of_birth: '1990-06-03',
        gender: 'male',
        governorate: 'Cairo',
        role: 'doctor',
      },
    });
    expect(res.ok()).toBeFalsy();
    const body = await res.json();
    expect(body.error).toBe('This National ID is invalid.');
  });

  test('5: gender mismatch → "This National ID is invalid."', async ({ request }) => {
    const mobile = uniqueMobile();
    // NID encodes Female, submit "male"
    const res = await request.post(`${API_BASE}/auth/register`, {
      data: {
        full_name: 'Test User',
        mobile_number: mobile,
        email: `gen-${mobile.replace(/\D/g, '')}@test.com`,
        password: 'Password123!',
        national_id: FEMALE_NID,
        date_of_birth: '1990-01-15',
        gender: 'male',
        governorate: 'Cairo',
        role: 'doctor',
      },
    });
    expect(res.ok()).toBeFalsy();
    const body = await res.json();
    expect(body.error).toBe('This National ID is invalid.');
  });

  test('6: governorate mismatch → "This National ID is invalid."', async ({ request }) => {
    const mobile = uniqueMobile();
    // NID encodes Cairo, submit Alexandria
    const res = await request.post(`${API_BASE}/auth/register`, {
      data: {
        full_name: 'Test User',
        mobile_number: mobile,
        email: `gov-${mobile.replace(/\D/g, '')}@test.com`,
        password: 'Password123!',
        national_id: VALID_NID,
        date_of_birth: '1990-01-15',
        gender: 'male',
        governorate: 'Alexandria',
        role: 'doctor',
      },
    });
    expect(res.ok()).toBeFalsy();
    const body = await res.json();
    expect(body.error).toBe('This National ID is invalid.');
  });

  test('7: duplicate NID → "This National ID is already registered."', async ({ request }) => {
    const mobile1 = uniqueMobile();
    const mobile2 = uniqueMobile();
    const dupNid = generateUniqueNID();

    // First registration succeeds
    const res1 = await request.post(`${API_BASE}/auth/register`, {
      data: {
        full_name: 'Test User',
        mobile_number: mobile1,
        email: `dup1-${mobile1.replace(/\D/g, '')}@test.com`,
        password: 'Password123!',
        national_id: dupNid,
        date_of_birth: '1992-03-20',
        gender: 'female',
        governorate: 'Alexandria',
        role: 'doctor',
      },
    });
    expect(res1.ok()).toBeTruthy();

    // Second with same NID fails with DISTINCT message
    const res2 = await request.post(`${API_BASE}/auth/register`, {
      data: {
        full_name: 'Test User 2',
        mobile_number: mobile2,
        email: `dup2-${mobile2.replace(/\D/g, '')}@test.com`,
        password: 'Password123!',
        national_id: dupNid,
        date_of_birth: '1992-03-20',
        gender: 'female',
        governorate: 'Alexandria',
        role: 'doctor',
      },
    });
    expect(res2.ok()).toBeFalsy();
    const body = await res2.json();
    expect(body.error).toBe('This National ID is already registered.');
  });
});
