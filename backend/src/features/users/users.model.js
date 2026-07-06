import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  mobile_number: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  national_id: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
    index: true,
  },
  password_hash: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    enum: ['doctor', 'doctor_student', 'nurse', 'nurse_student'],
    default: null,
  },
  syndicate_id: {
    type: String,
    default: null,
  },
  verification_status: {
    type: String,
    enum: ['unverified', 'pending', 'verified'],
    default: 'unverified',
  },
  profile: {
    graduation_year: Number,
    current_specialty: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialty', default: null },
    current_path: { type: mongoose.Schema.Types.ObjectId, ref: 'Path', default: null },
    experience_years: Number,
  },
  current_plan_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'StudyPlan', default: null,
  },
  companion_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

userSchema.pre('save', function (next) {
  this.updated_at = new Date();
  next();
});

export const User = mongoose.model('User', userSchema);
