import mongoose from 'mongoose';

const studyPlanSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
  source: {
    type: String,
    enum: ['quick_pick', 'survey_result', 'assessment_adjusted'],
    default: 'quick_pick',
  },
  total_duration_months: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active',
  },
  restarted_from_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyPlan',
    default: null,
  },
  branch_weighting: [{
    branch_id: { type: mongoose.Schema.Types.ObjectId },
    weight: { type: Number },
    allocated_days: { type: Number },
    lesson_count: { type: Number },
  }],
  started_at: { type: Date, default: Date.now },
  completed_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

studyPlanSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

studyPlanSchema.index({ user_id: 1, status: 1 });

const planLessonSchema = new mongoose.Schema({
  study_plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudyPlan',
    required: true,
    index: true,
  },
  lesson_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sequence_order: { type: Number, required: true },
  allocated_days: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ['locked', 'in_progress', 'completed', 'failed_needs_retry'],
    default: 'locked',
  },
  exam_status: {
    type: String,
    enum: ['pending', 'passed', 'failed'],
    default: 'pending',
  },
  exam_score: { type: Number, default: null },
  completed_at: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

planLessonSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export const StudyPlan = mongoose.model('StudyPlan', studyPlanSchema);
export const PlanLesson = mongoose.model('PlanLesson', planLessonSchema);
