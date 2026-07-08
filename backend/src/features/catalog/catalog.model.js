import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  weight: { type: Number, default: 1.0 },
  order: { type: Number, default: 0 },
}, { _id: true });

const salaryRangeSchema = new mongoose.Schema({
  country: String,
  currency: { type: String, default: 'USD' },
  min_annual: Number,
  max_annual: Number,
  min_monthly: Number,
  max_monthly: Number,
  source: String,
  year: { type: Number, default: 2026 },
  notes: String,
}, { _id: false });

const competitivenessSchema = new mongoose.Schema({
  us_match_rate: { type: Number, default: null },
  imgs_matched_2024: { type: Number, default: null },
  difficulty_rating: { type: String, enum: ['low', 'medium', 'high', 'very_high'], default: 'medium' },
  avg_usmle_step2_score: { type: Number, default: null },
  nrmp_positions_2024: { type: Number, default: null },
  us_md_seniors_per_position: { type: Number, default: null },
}, { _id: false });

const specialtyRecognitionSchema = new mongoose.Schema({
  saudi_scfhs: { type: String, enum: ['recognized', 'exam_required', 'conditional', 'not_recognized'], default: 'exam_required' },
  uae_dha: { type: String, enum: ['recognized', 'exam_required', 'conditional', 'not_recognized'], default: 'exam_required' },
  qatar_dhp: { type: String, enum: ['recognized', 'exam_required', 'conditional', 'not_recognized'], default: 'exam_required' },
  notes: String,
}, { _id: false });

const specialtySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['doctor', 'nurse'], required: true },
  description: String,
  icon: String,
  order: { type: Number, default: 0 },
  pros: [String],
  cons: [String],
  market_demand_egypt: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  market_demand_abroad: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  training_duration_years: Number,
  content_status: { type: String, enum: ['stub', 'verified'], default: 'stub' },
  last_verified_at: Date,
  branches: [branchSchema],
  salary_ranges: [salaryRangeSchema],
  competitiveness: competitivenessSchema,
  specialty_recognition: specialtyRecognitionSchema,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

specialtySchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

const stageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['exam', 'training_post', 'application', 'foundation'], required: true },
  order: { type: Number, required: true },
  duration_months: Number,
  cost_usd: Number,
  description: String,
  prerequisites: [String],
  exams: [{
    name: String,
    format: String,
    cost_usd: Number,
    official_link: String,
  }],
  language_tests: [{
    language: String,
    test_name: String,
    min_score: String,
  }],
}, { _id: true });

const visaInfoSchema = new mongoose.Schema({
  visa_type: String,
  processing_months: Number,
  cost_usd: Number,
  requirements: [String],
  allows_family: { type: Boolean, default: true },
  pathway_to_pr: { type: Boolean, default: false },
  notes: String,
}, { _id: false });

const expectedSalarySchema = new mongoose.Schema({
  currency: { type: String, default: 'USD' },
  min_annual: Number,
  max_annual: Number,
  min_monthly: Number,
  max_monthly: Number,
  after_years: { type: Number, default: 1 },
  source: String,
  notes: String,
}, { _id: false });

const passRateSchema = new mongoose.Schema({
  exam_name: String,
  pass_rate_pct: Number,
  year: { type: Number, default: 2025 },
  first_attempt_pct: Number,
  notes: String,
}, { _id: false });

const pathSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['doctor', 'nurse'], required: true },
  path_type: { type: String, enum: ['career', 'migration', 'training'], default: 'migration' },
  target_country: String,
  description: String,
  stages: [stageSchema],
  required_exams: [{
    name: String,
    official_link: String,
    format: String,
    cost_usd: Number,
    retake_policy: String,
  }],
  required_language_tests: [{
    language: String,
    test_name: String,
    min_score: String,
    official_link: String,
  }],
  total_estimated_cost_usd: Number,
  total_duration_months: Number,
  egypt_specific_notes: String,
  official_source_links: [String],
  content_status: { type: String, enum: ['stub', 'verified'], default: 'stub' },
  last_verified_at: Date,
  order: { type: Number, default: 0 },
  visa_info: [visaInfoSchema],
  expected_salary: expectedSalarySchema,
  pass_rates: [passRateSchema],
  language_course_required: { type: Boolean, default: false },
  language_course_cost_usd: Number,
  language_course_duration_months: Number,
  competitiveness_rating: { type: String, enum: ['low', 'medium', 'high', 'very_high'], default: 'medium' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

pathSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export const Specialty = mongoose.model('Specialty', specialtySchema);
export const Path = mongoose.model('Path', pathSchema);
