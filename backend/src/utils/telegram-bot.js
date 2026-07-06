import crypto from 'node:crypto';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

function getApiUrl(method) {
  return `https://api.telegram.org/bot${BOT_TOKEN}/${method}`;
}

export async function sendTelegramOTP(chatId, code) {
  const text = [
    `🔐 Your RA Education OTP is: *${code}*`,
    '',
    'This code expires in 5 minutes. Do not share it with anyone.',
  ].join('\n');

  const res = await fetch(getApiUrl('sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Telegram sendMessage failed: ${err.description}`);
  }

  return res.json();
}

export async function sendTelegramMessage(chatId, text) {
  const res = await fetch(getApiUrl('sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Telegram sendMessage failed: ${err.description}`);
  }

  return res.json();
}

export async function setWebhook(url, secretToken) {
  const res = await fetch(getApiUrl('setWebhook'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      secret_token: secretToken,
      allowed_updates: ['message'],
    }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Telegram setWebhook failed: ${err.description}`);
  }

  return res.json();
}

export function verifyWebhookSignature(req) {
  const expected = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!expected) return false;
  const actual = req.headers['x-telegram-bot-api-secret-token'];
  return actual === expected;
}

export function generateLinkingCode() {
  return crypto.randomBytes(4).toString('hex');
}
