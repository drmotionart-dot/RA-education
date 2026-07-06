import { QuickPickSelection } from './quickpick.model.js';
import { Specialty } from '../catalog/catalog.model.js';
import { User } from '../users/users.model.js';
import { ApiError } from '../../utils/apiError.js';

export async function createQuickPick(mobileNumber, specialtyId, pathId, presetDurationMonths) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found. Please complete onboarding first.');

  const specialty = await Specialty.findById(specialtyId);
  if (!specialty) throw new ApiError(404, 'Specialty not found');

  if (!specialty.branches || specialty.branches.length === 0) {
    throw new ApiError(400, 'Specialty has no branches configured');
  }

  const totalWeight = specialty.branches.reduce((sum, b) => sum + b.weight, 0);
  if (totalWeight <= 0) {
    throw new ApiError(400, 'Specialty branches have invalid weights');
  }

  const selection = await QuickPickSelection.create({
    user_id: user._id,
    specialty_id: specialtyId,
    path_id: pathId,
    preset_duration_months: presetDurationMonths,
  });

  return {
    id: selection._id,
    specialty_id: selection.specialty_id,
    path_id: selection.path_id,
    preset_duration_months: selection.preset_duration_months,
  };
}

/*
  ── BRANCH-WEIGHTED ALLOCATION MATH ──
  (Used by studyplan generator, shown here for review)

  Input:
    branches: [{ _id, name, weight }]   // from Specialty
    totalDays: number                    // preset_duration_months × 30

  Algorithm:

    1. totalWeight = Σ branches[i].weight

    2. For each branch:
         rawDays = (weight / totalWeight) × totalDays

    3. Round each to integer, track remainder:
         allocated[i] = Math.floor(rawDays)
         remainder[i] = rawDays - allocated[i]

    4. Sort by remainder descending (tie-break: original branch.order),
       distribute leftover days one-per-branch until total = totalDays:
         remaining = totalDays - Σ allocated
         for each branch sorted by remainder desc, then order asc:
           if remaining <= 0 break
           allocated[i] += 1
           remaining -= 1

    5. Result: { branch_id, weight, allocatedDays, lessonCount }
       lessonCount is derived later when lessons are fetched per branch
       (lessonCount ≈ allocatedDays / avgLessonDays)

  Example:
    branches: [IC (w=1.0), EP (w=0.8), HF (w=0.7)]
    totalDays: 360 (12 months)

    totalWeight = 2.5
    IC:  (1.0/2.5) × 360 = 144.0 → 144
    EP:  (0.8/2.5) × 360 = 115.2 → 115 + 1 = 116  (highest remainder)
    HF:  (0.7/2.5) × 360 = 100.8 → 100 + 1 = 101  (next highest remainder)
    Actually: 144 + 115 + 100 = 359, remaining = 1
    Sort by remainder desc: HF (0.8), EP (0.2), IC (0.0)
    Give +1 to HF (highest remainder): 101
    Sum: 144 + 115 + 101 = 360 ✓

    Result: [
      { branch_id: IC._id, weight: 1.0, allocatedDays: 144 },
      { branch_id: EP._id, weight: 0.8, allocatedDays: 115 },
      { branch_id: HF._id, weight: 0.7, allocatedDays: 101 },
    ]
*/
