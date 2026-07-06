import crypto from 'node:crypto';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export function generateOTP() {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  console.log(`[DEV] OTP for testing: ${code}`);
  return code;
}

export async function hashOTP(code) {
  return bcrypt.hash(code, SALT_ROUNDS);
}

export async function verifyOTP(code, hash) {
  return bcrypt.compare(code, hash);
}

export function normalizeMobileNumber(mobileNumber) {
  const digits = mobileNumber.replace(/\D/g, '');

  const withoutPrefix = digits.startsWith('00') ? digits.slice(2) : digits;

  if (withoutPrefix.startsWith('0')) {
    return `+20${withoutPrefix.slice(1)}`;
  }

  if (withoutPrefix.startsWith('20') && withoutPrefix.length === 12) {
    return `+${withoutPrefix}`;
  }

  return `+${withoutPrefix}`;
}
