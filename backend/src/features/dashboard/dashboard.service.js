import { StudyPlan, PlanLesson } from '../studyplan/studyplan.model.js';
import { Specialty } from '../catalog/catalog.model.js';
import { User } from '../users/users.model.js';
import { ApiError } from '../../utils/apiError.js';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const CATEGORY_COLORS = {
  'Medicine': 'var(--color-secondary)',
  'Surgery': 'var(--color-success)',
  'Pediatrics': 'var(--color-accent-violet)',
  'ICU': 'var(--color-primary)',
};

const FALLBACK_COLOR = 'var(--color-secondary)';

function buildBranchMap(specialty) {
  const map = {};
  if (specialty?.branches) {
    for (const branch of specialty.branches) {
      map[branch._id.toString()] = branch.name;
    }
  }
  return map;
}

function getLast7Days() {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    d.setHours(0, 0, 0, 0);
    days.push(d);
  }
  return days;
}

function dayLabel(date) {
  return DAY_LABELS[date.getDay()];
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

export async function getDashboardStats(mobileNumber) {
  const user = await User.findOne({ mobile_number: mobileNumber });
  if (!user) throw new ApiError(404, 'User not found');

  const plan = await StudyPlan.findOne({ user_id: user._id, status: 'active' }).lean();

  if (!plan) {
    return {
      weeklyActivity: getLast7Days().map((d) => ({ label: dayLabel(d), value: 0 })),
      sparklineData: [0, 0, 0, 0, 0, 0, 0],
      categoryBreakdown: [],
      hoursThisWeek: 0,
    };
  }

  const [planLessons, specialty] = await Promise.all([
    PlanLesson.find({ study_plan_id: plan._id })
      .populate('lesson_id', 'title duration_minutes')
      .sort({ sequence_order: 1 })
      .lean(),
    Specialty.findById(plan.specialty_id).lean(),
  ]);

  const branchMap = buildBranchMap(specialty);

  const last7 = getLast7Days();
  const dailyCounts = last7.map(() => 0);

  const categoryCounts = {};
  let totalCompleted = 0;
  let totalMinutesThisWeek = 0;

  for (const pl of planLessons) {
    if (pl.status === 'completed' && pl.completed_at) {
      const completedDate = new Date(pl.completed_at);
      const dayIndex = last7.findIndex((d) => sameDay(d, completedDate));

      if (dayIndex !== -1) {
        dailyCounts[dayIndex]++;

        const durationMin = pl.lesson_id?.duration_minutes || 0;
        totalMinutesThisWeek += durationMin;
      }

      totalCompleted++;

      const branchId = pl.branch_id?.toString();
      const branchName = branchId ? branchMap[branchId] : null;
      const catName = branchName || 'Other';
      categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
    }
  }

  const weeklyActivity = last7.map((d, i) => ({
    label: dayLabel(d),
    value: dailyCounts[i],
  }));

  const sparklineData = dailyCounts;

  const categoryBreakdown = Object.entries(categoryCounts)
    .map(([name, count]) => ({
      name,
      pct: totalCompleted > 0 ? Math.round((count / totalCompleted) * 100) : 0,
      color: CATEGORY_COLORS[name] || FALLBACK_COLOR,
    }))
    .sort((a, b) => b.pct - a.pct);

  return {
    weeklyActivity,
    sparklineData,
    categoryBreakdown,
    hoursThisWeek: Math.round(totalMinutesThisWeek / 60),
  };
}
