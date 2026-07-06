import mongoose from 'mongoose';

const webhookRequestSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
    index: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
    index: { expireAfterSeconds: 60 },
  },
});

export const WebhookRequest = mongoose.model('WebhookRequest', webhookRequestSchema);
