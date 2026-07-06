import mongoose from 'mongoose';

const quickPickSelectionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  specialty_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialty',
    required: true,
  },
  path_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Path',
    required: true,
  },
  preset_duration_months: {
    type: Number,
    enum: [6, 12, 18, 24],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

export const QuickPickSelection = mongoose.model('QuickPickSelection', quickPickSelectionSchema);
