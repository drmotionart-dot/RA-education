import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  option_text: { type: String, required: true },
  is_correct: { type: Boolean, required: true },
  order: { type: Number, default: 0 },
}, { _id: true });

const questionSchema = new mongoose.Schema({
  branch_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  specialty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  question_text: { type: String, required: true },
  question_type: { type: String, enum: ['multiple_choice', 'true_false'], default: 'multiple_choice' },
  options: { type: [optionSchema], required: true, validate: [v => v.length >= 2, 'At least 2 options required'] },
  explanation: String,
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  source: {
    type: String,
    enum: ['in_house_authored', 'crowdsourced_reviewed', 'public_domain_bank'],
    required: true,
  },
  tags: [String],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

questionSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

questionSchema.index({ specialty_id: 1, branch_id: 1 });

const scoringEntrySchema = new mongoose.Schema({
  branch_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  branch_name: String,
  correct: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
  score_pct: { type: Number, default: 0 },
}, { _id: false });

const assessmentSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  specialty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', required: true },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  question_count: { type: Number, default: 0 },
  answered_count: { type: Number, default: 0 },
  started_at: { type: Date, default: Date.now },
  completed_at: Date,
  scoring: [scoringEntrySchema],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

assessmentSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

assessmentSchema.index({ user_id: 1, status: 1 });

const assessmentResponseSchema = new mongoose.Schema({
  assessment_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Assessment', required: true, index: true },
  question_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  selected_option_ids: [{ type: mongoose.Schema.Types.ObjectId }],
  is_correct: { type: Boolean, required: true },
  response_order: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

assessmentResponseSchema.index({ assessment_id: 1, question_id: 1 }, { unique: true });

export const Question = mongoose.model('Question', questionSchema);
export const Assessment = mongoose.model('Assessment', assessmentSchema);
export const AssessmentResponse = mongoose.model('AssessmentResponse', assessmentResponseSchema);
