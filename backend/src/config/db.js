import mongoose from 'mongoose';
import env from './env.js';

let cached = null;

export async function connectDB() {
  if (cached && mongoose.connection.readyState === 1) {
    try {
      await mongoose.connection.db.admin().ping({ serverSelectionTimeoutMS: 2000 });
      return cached;
    } catch {
      console.log('Cached connection stale, reconnecting...');
      cached = null;
      await mongoose.connection.close().catch(() => {});
    }
  }

  const conn = await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });

  cached = conn;
  console.log('MongoDB connected:', conn.connection.host);
  return conn;
}

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
