import mongoose from 'mongoose';

const otpRequestSchema = new mongoose.Schema({
  mobile_number: {
    type: String,
    required: true,
    index: true,
  },
  otp_hash: {
    type: String,
    required: true,
  },
  attempts: {
    type: Number,
    default: 0,
  },
  expires_at: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 },
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const OtpRequest = mongoose.model('OtpRequest', otpRequestSchema);
