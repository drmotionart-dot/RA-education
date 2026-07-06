import mongoose from 'mongoose';

const telegramLinkSchema = new mongoose.Schema({
  mobile_number: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  chat_id: {
    type: Number,
    default: null,
  },
  linking_code: {
    type: String,
    default: null,
  },
  linking_code_expires_at: {
    type: Date,
    default: null,
  },
  pending_otp_code: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

telegramLinkSchema.index({ linking_code: 1 }, { sparse: true });

export const TelegramLink = mongoose.model('TelegramLink', telegramLinkSchema);
