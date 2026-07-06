import mongoose from 'mongoose';

const branchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  weight: { type: Number, default: 1.0 },
  order: { type: Number, default: 0 },
}, { _id: true });

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
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

specialtySchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

const pathSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['doctor', 'nurse'], required: true },
  target_country: String,
  description: String,
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
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

pathSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export const Specialty = mongoose.model('Specialty', specialtySchema);
export const Path = mongoose.model('Path', pathSchema);
