const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  TELEGRAM_WEBHOOK_SECRET: process.env.TELEGRAM_WEBHOOK_SECRET,
};

const required = ['MONGODB_URI', 'JWT_SECRET'];
for (const key of required) {
  if (!env[key]) {
    throw new Error(`Missing required env var: ${key}`);
  }
}

export default env;
