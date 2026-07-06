import mongoose from 'mongoose';

const companionRequestSchema = new mongoose.Schema({
  from_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  to_user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending',
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

companionRequestSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export const CompanionRequest = mongoose.model('CompanionRequest', companionRequestSchema);
