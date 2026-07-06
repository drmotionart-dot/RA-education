import bcrypt from 'bcryptjs';
import { validate, parse } from 'egypt-natid';
import { OtpRequest } from './auth.model.js';
import { TelegramLink } from './telegram.model.js';
import { WebhookRequest } from './webhook.model.js';
import { User } from '../users/users.model.js';
import { generateOTP, hashOTP, verifyOTP, normalizeMobileNumber } from '../../utils/otp.js';
import { signToken } from '../../utils/jwt.js';
import { sendTelegramOTP, sendTelegramMessage, generateLinkingCode, verifyWebhookSignature } from '../../utils/telegram-bot.js';
import { sendEmailOTP } from '../../utils/email.js';
import { ApiError } from '../../utils/apiError.js';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OTP_EXPIRY_MINUTES = 5;
const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MINUTES = 10;
const RATE_LIMIT_MAX = 3;
const REGISTER_RATE_LIMIT_MAX = 3;

export async function requestOTP(mobileNumber) {
  const normalized = normalizeMobileNumber(mobileNumber);
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);
  const recentCount = await OtpRequest.countDocuments({
    mobile_number: normalized,
    created_at: { $gte: since },
  });

  if (recentCount >= RATE_LIMIT_MAX) {
    throw new ApiError(429, 'Too many OTP requests. Please try again later.');
  }

  const code = generateOTP();
  const otpHash = await hashOTP(code);

  console.log(`[DEV] OTP for ${normalized}: ${code}`);
  try { writeFileSync(join(process.env.TMP || '/tmp', `otp_${normalized.replace(/[^0-9]/g, '')}.txt`), code, 'utf8'); } catch (_) { /* best-effort for tests */ }

  await OtpRequest.create({
    mobile_number: normalized,
    otp_hash: otpHash,
    expires_at: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
  });

  const delivered = await deliverOTP(normalized, code);

  if (delivered === 'telegram' || delivered === 'email') {
    return { message: 'OTP sent' };
  }

  return {
    message: 'Link your Telegram to receive OTP',
    telegram_link: `https://t.me/RAEducationOTP_bot?start=${delivered}`,
    telegram_required: true,
  };
}

async function deliverOTP(mobileNumber, code) {
  const existing = await TelegramLink.findOne({ mobile_number: mobileNumber, chat_id: { $ne: null } });
  if (existing) {
    try {
      await sendTelegramOTP(existing.chat_id, code);
      console.log(`[OTP] Delivered via Telegram to ${mobileNumber}`);
      return 'telegram';
    } catch (err) {
      console.error(`[OTP] Telegram delivery failed for ${mobileNumber}:`, err.message);
    }
  }

  const user = await User.findOne({ mobile_number: mobileNumber, email: { $ne: null, $ne: '' } });
  if (user?.email) {
    try {
      await sendEmailOTP(user.email, code);
      console.log(`[OTP] Delivered via email to ${user.email}`);
      return 'email';
    } catch (err) {
      console.error(`[OTP] Email delivery failed for ${user.email}:`, err.message);
    }
  }

  const linkingCode = generateLinkingCode();
  await TelegramLink.findOneAndUpdate(
    { mobile_number: mobileNumber },
    {
      mobile_number: mobileNumber,
      linking_code: linkingCode,
      pending_otp_code: code,
      linking_code_expires_at: new Date(Date.now() + 10 * 60 * 1000),
    },
    { upsert: true, setDefaultsOnInsert: true },
  );
  console.log(`[OTP] Generated linking code for ${mobileNumber}: ${linkingCode}`);

  return linkingCode;
}

export async function verifyOTPCode(mobileNumber, code) {
  const normalized = normalizeMobileNumber(mobileNumber);
  const otpRequest = await OtpRequest.findOne({
    mobile_number: normalized,
    expires_at: { $gt: new Date() },
  }).sort({ created_at: -1 });

  if (!otpRequest) {
    throw new ApiError(400, 'No valid OTP found. Request a new one.');
  }

  if (otpRequest.attempts >= MAX_ATTEMPTS) {
    throw new ApiError(400, 'OTP has been invalidated due to too many attempts. Request a new one.');
  }

  const isValid = await verifyOTP(code, otpRequest.otp_hash);

  if (!isValid) {
    otpRequest.attempts += 1;
    await otpRequest.save();
    throw new ApiError(400, 'Invalid OTP code.');
  }

  const token = signToken({ mobile_number: normalized });

  return { token, mobile_number: normalized };
}

export async function register(data) {
  const { full_name, mobile_number, email, password, national_id, date_of_birth, gender, governorate, role } = data;
  const normalized = normalizeMobileNumber(mobile_number);

  const rateSince = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000);
  const recentRegistrations = await OtpRequest.countDocuments({
    mobile_number: normalized,
    created_at: { $gte: rateSince },
  });
  if (recentRegistrations >= REGISTER_RATE_LIMIT_MAX) {
    throw new ApiError(429, 'Too many registration attempts. Please try again later.');
  }

  const existingMobile = await User.findOne({ mobile_number: normalized });
  if (existingMobile) {
    throw new ApiError(400, 'This mobile number is already registered.');
  }

  const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingEmail) {
    throw new ApiError(400, 'This email is already registered.');
  }

  const nidClean = national_id.trim();

  if (!/^\d{14}$/.test(nidClean)) {
    throw new ApiError(400, 'This National ID is invalid.');
  }

  const nidValid = validate(nidClean);
  if (!nidValid) {
    throw new ApiError(400, 'This National ID is invalid.');
  }

  let nidParsed;
  try {
    nidParsed = parse(nidClean);
  } catch {
    throw new ApiError(400, 'This National ID is invalid.');
  }

  if (nidParsed.age < 16) {
    throw new ApiError(400, 'This National ID is invalid.');
  }

  const subDOB = new Date(date_of_birth);
  if (
    subDOB.getFullYear() !== nidParsed.birthYear ||
    subDOB.getMonth() + 1 !== nidParsed.birthMonth ||
    subDOB.getDate() !== nidParsed.birthDay
  ) {
    throw new ApiError(400, 'This National ID is invalid.');
  }

  if (gender.toLowerCase() !== nidParsed.gender.toLowerCase()) {
    throw new ApiError(400, 'This National ID is invalid.');
  }

  if (governorate !== nidParsed.governorate.nameEn) {
    throw new ApiError(400, 'This National ID is invalid.');
  }

  const existingNid = await User.findOne({ national_id: nidClean });
  if (existingNid) {
    throw new ApiError(400, 'This National ID is already registered.');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    mobile_number: normalized,
    email: email.toLowerCase().trim(),
    national_id: nidClean,
    name: full_name,
    role,
    password_hash: passwordHash,
    verification_status: 'verified',
  });

  const token = signToken({ mobile_number: normalized });

  return { token, user: { mobile_number: normalized, name: full_name, role, email } };
}

export async function login(identifier, password) {
  const isEmail = identifier.includes('@');
  const query = isEmail
    ? { email: identifier.toLowerCase().trim() }
    : { mobile_number: normalizeMobileNumber(identifier) };

  const user = await User.findOne(query);
  if (!user) {
    throw new ApiError(400, 'Invalid credentials.');
  }

  if (!user.password_hash) {
    throw new ApiError(400, 'This account uses OTP login. Please use forgot password to set a password.');
  }

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new ApiError(400, 'Invalid credentials.');
  }

  const token = signToken({ mobile_number: user.mobile_number });
  return { token, user: { mobile_number: user.mobile_number, name: user.name, role: user.role, email: user.email } };
}

export async function forgotPassword(identifier) {
  const isEmail = identifier.includes('@');
  const query = isEmail
    ? { email: identifier.toLowerCase().trim() }
    : { mobile_number: normalizeMobileNumber(identifier) };

  const user = await User.findOne(query);
  if (!user) {
    throw new ApiError(404, 'No account found with that mobile number or email.');
  }

  return requestOTP(user.mobile_number);
}

export async function resetPassword(identifier, code, newPassword) {
  const isEmail = identifier.includes('@');
  const mobileNumber = isEmail
    ? (await User.findOne({ email: identifier.toLowerCase().trim() }))?.mobile_number
    : normalizeMobileNumber(identifier);

  if (!mobileNumber) {
    throw new ApiError(404, 'No account found.');
  }

  await verifyOTPCode(mobileNumber, code);

  const passwordHash = await bcrypt.hash(newPassword, 10);
  await User.updateOne({ mobile_number: mobileNumber }, { $set: { password_hash: passwordHash } });

  return { message: 'Password reset successfully. You can now log in.' };
}

export async function handleTelegramWebhook(req) {
  if (!verifyWebhookSignature(req)) {
    console.log('[TG WEBHOOK] Rejected: invalid secret token');
    return { ok: true };
  }

  const ip = req.ip || req.connection?.remoteAddress || 'unknown';
  const since = new Date(Date.now() - 60 * 1000);
  const recentCount = await WebhookRequest.countDocuments({
    ip,
    created_at: { $gte: since },
  });

  if (recentCount >= 5) {
    console.log(`[TG WEBHOOK] Rate limited IP: ${ip}`);
    return { ok: true };
  }

  await WebhookRequest.create({ ip });

  const update = req.body;
  if (!update?.message?.text) {
    return { ok: true };
  }

  const chatId = update.message.chat.id;
  const text = update.message.text.trim();
  const match = text.match(/^\/start\s+([a-f0-9]{8})$/i);

  if (!match) {
    return { ok: true };
  }

  const linkingCode = match[1].toLowerCase();
  const link = await TelegramLink.findOne({ linking_code: linkingCode });

  if (!link) {
    console.log(`[TG WEBHOOK] Invalid linking code: ${linkingCode}`);
    return { ok: true };
  }

  if (!link.linking_code_expires_at || new Date() > link.linking_code_expires_at) {
    console.log(`[TG WEBHOOK] Expired linking code: ${linkingCode}`);
    return { ok: true };
  }

  if (!link.pending_otp_code) {
    console.log(`[TG WEBHOOK] No pending OTP for linking code: ${linkingCode}`);
    return { ok: true };
  }

  const otpCode = link.pending_otp_code;

  link.chat_id = chatId;
  link.linking_code = null;
  link.linking_code_expires_at = null;
  link.pending_otp_code = null;
  await link.save();

  await sendTelegramMessage(chatId, [
    '✅ *Telegram linked!* Your OTP is on its way.',
    '',
    `Your code: *${otpCode}*`,
    '',
    'Return to the RA Education app and enter this code.',
    'It expires in 5 minutes.',
  ].join('\n')).catch(err => {
    console.error(`[TG WEBHOOK] Failed to send OTP message to ${chatId}:`, err.message);
  });

  console.log(`[TG WEBHOOK] Linked chat ${chatId} to ${link.mobile_number}`);
  return { ok: true };
}
