import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  option_text: { type: String, required: true },
  axis_deltas: { type: Map, of: Number, default: {} },
  next_node_id: { type: String, default: null },
}, { _id: true });

const nodeSchema = new mongoose.Schema({
  node_id: { type: String, required: true },
  question_text: { type: String, required: true },
  order: { type: Number, default: 0 },
  is_universal: { type: Boolean, default: false },
  options: { type: [optionSchema], required: true, validate: [v => v.length >= 1, 'At least 1 option required'] },
}, { _id: true });

const axisBoundSchema = new mongoose.Schema({
  axis_name: { type: String, required: true },
  min: { type: Number, required: true },
  max: { type: Number, required: true },
}, { _id: false });

const targetVectorSchema = new mongoose.Schema({
  specialty_name: { type: String, required: true },
  axes: { type: Map, of: Number, default: {} },
}, { _id: true });

const graphSchema = new mongoose.Schema({
  type: { type: String, enum: ['specialty', 'path'], required: true },
  role: { type: String, enum: ['doctor', 'nurse'], required: true },
  version: { type: Number, default: 1 },
  root_node_id: { type: String, required: true },
  nodes: { type: [nodeSchema], required: true },
  target_vectors: { type: [targetVectorSchema], default: [] },
  axis_bounds: { type: [axisBoundSchema], default: [] },
  axes: { type: [String], required: true },
  max_questions: { type: Number, default: 35 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

graphSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

graphSchema.index({ type: 1, role: 1 }, { unique: true });

const sessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  graph_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SurveyGraph', required: true },
  status: { type: String, enum: ['in_progress', 'completed'], default: 'in_progress' },
  current_node_id: { type: String, default: null },
  axis_scores: { type: Map, of: Number, default: {} },
  answered_node_ids: { type: [String], default: [] },
  response_count: { type: Number, default: 0 },
  started_at: { type: Date, default: Date.now },
  completed_at: Date,
  results: {
    type: { type: String, enum: ['specialty', 'path', null], default: null },
    matches: [{
      specialty_name: String,
      specialty_id: { type: mongoose.Schema.Types.ObjectId, default: null },
      similarity: Number,
      strongest_axes: [String],
      distinguishing_axes: [String],
    }],
    top_match: String,
    confidence: Number,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

sessionSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

sessionSchema.index({ user_id: 1, status: 1 });

export const SurveyGraph = mongoose.model('SurveyGraph', graphSchema);
export const SurveySession = mongoose.model('SurveySession', sessionSchema);
