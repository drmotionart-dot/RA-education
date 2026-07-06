import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: {
    type: String,
    enum: ['youtube_egyptian', 'youtube_international', 'pdf', 'official_site', 'telegram_channel'],
    required: true,
  },
  language: { type: String, required: true },
  priority_order: { type: Number, required: true },
}, { _id: false });

const lessonSchema = new mongoose.Schema({
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  duration_minutes: Number,
  order: { type: Number, default: 0 },
  tags: [String],
  resources: [resourceSchema],
  min_pass_score: { type: Number, default: 60 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

lessonSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export const Lesson = mongoose.model('Lesson', lessonSchema);
