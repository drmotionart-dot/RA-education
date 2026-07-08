import { Specialty, Path } from './catalog.model.js';
import { ApiError } from '../../utils/apiError.js';

const STALE_AFTER_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 months

function computeStaleness(item) {
  if (item.content_status === 'stub') return true;
  if (item.last_verified_at) {
    const age = Date.now() - new Date(item.last_verified_at).getTime();
    return age > STALE_AFTER_MS;
  }
  return true;
}

function withStale(items) {
  return items.map(item => ({ ...item, is_stale: computeStaleness(item) }));
}

export async function listSpecialties(category) {
  const filter = category ? { category } : {};
  const items = await Specialty.find(filter).sort({ order: 1 }).lean();
  return withStale(items);
}

export async function getSpecialty(id) {
  const specialty = await Specialty.findById(id).lean();
  if (!specialty) throw new ApiError(404, 'Specialty not found');
  return { ...specialty, is_stale: computeStaleness(specialty) };
}

export async function listPaths(category) {
  const filter = category ? { category } : {};
  const items = await Path.find(filter).sort({ order: 1 }).lean();
  return withStale(items);
}

export async function getPath(id) {
  const path = await Path.findById(id).lean();
  if (!path) throw new ApiError(404, 'Path not found');
  return { ...path, is_stale: computeStaleness(path) };
}

export async function compassPaths({ category, path_type, country }) {
  const filter = {};
  if (category) filter.category = category;
  if (path_type) filter.path_type = path_type;
  if (country) filter.target_country = { $regex: country, $options: 'i' };
  const items = await Path.find(filter).sort({ order: 1 }).lean();
  return withStale(items);
}

export async function comparePaths(ids) {
  const paths = await Path.find({ _id: { $in: ids } }).lean();
  if (paths.length === 0) throw new ApiError(404, 'No paths found for given IDs');

  const comparison = {
    paths: paths.map(p => ({
      _id: p._id,
      name: p.name,
      target_country: p.target_country,
      path_type: p.path_type,
      total_estimated_cost_usd: p.total_estimated_cost_usd,
      total_duration_months: p.total_duration_months,
      required_exams: p.required_exams,
      required_language_tests: p.required_language_tests,
      visa_info: p.visa_info,
      expected_salary: p.expected_salary,
      pass_rates: p.pass_rates,
      language_course_required: p.language_course_required,
      competitiveness_rating: p.competitiveness_rating,
      egypt_specific_notes: p.egypt_specific_notes,
    })),
    summary: {
      cheapest: paths.reduce((a, b) => (a.total_estimated_cost_usd ?? Infinity) < (b.total_estimated_cost_usd ?? Infinity) ? a : b).name,
      fastest: paths.reduce((a, b) => (a.total_duration_months ?? Infinity) < (b.total_duration_months ?? Infinity) ? a : b).name,
      most_expensive: paths.reduce((a, b) => (a.total_estimated_cost_usd ?? 0) > (b.total_estimated_cost_usd ?? 0) ? a : b).name,
      slowest: paths.reduce((a, b) => (a.total_duration_months ?? 0) > (b.total_duration_months ?? 0) ? a : b).name,
      avg_cost: Math.round(paths.reduce((s, p) => s + (p.total_estimated_cost_usd ?? 0), 0) / paths.length),
      avg_duration: Math.round(paths.reduce((s, p) => s + (p.total_duration_months ?? 0), 0) / paths.length),
    },
  };

  return comparison;
}

export async function costCalculator(pathId, currency = 'USD') {
  if (!pathId) {
    const allPaths = await Path.find({ total_estimated_cost_usd: { $ne: null } }).sort({ order: 1 }).lean();
    return allPaths.map(p => ({
      _id: p._id,
      name: p.name,
      target_country: p.target_country,
      total_estimated_cost_usd: p.total_estimated_cost_usd,
      total_duration_months: p.total_duration_months,
      currency,
    }));
  }

  const path = await Path.findById(pathId).lean();
  if (!path) throw new ApiError(404, 'Path not found');

  const rates = { USD: 1, EUR: 0.92, GBP: 0.79, AUD: 1.50, CAD: 1.37, NZD: 1.65, SAR: 3.75, AED: 3.67, QAR: 3.64, EGP: 48.5 };
  const rate = rates[currency] || 1;

  const stageCosts = (path.stages || []).filter(s => s.cost_usd != null).map(s => ({
    name: s.name,
    cost_usd: s.cost_usd,
    cost_converted: Math.round(s.cost_usd * rate),
  }));

  const examCosts = (path.required_exams || []).filter(e => e.cost_usd != null).map(e => ({
    name: e.name,
    cost_usd: e.cost_usd,
    cost_converted: Math.round(e.cost_usd * rate),
  }));

  const totalConverted = path.total_estimated_cost_usd != null ? Math.round(path.total_estimated_cost_usd * rate) : null;

  return {
    path: { _id: path._id, name: path.name, target_country: path.target_country },
    currency,
    exchange_rate: rate,
    total_estimated_cost_usd: path.total_estimated_cost_usd,
    total_estimated_cost_converted: totalConverted,
    breakdown: {
      stage_costs: stageCosts,
      exam_costs: examCosts,
      language_course_cost: path.language_course_required ? {
        included: true,
        cost_usd: path.language_course_cost_usd,
        duration_months: path.language_course_duration_months,
      } : null,
    },
  };
}

export async function smartFind({ budget_max, duration_max, category, country, path_type, language }) {
  const filter = {};
  if (category) filter.category = category;
  if (path_type) filter.path_type = path_type;
  if (country) filter.target_country = { $regex: country, $options: 'i' };

  let items = await Path.find(filter).sort({ order: 1 }).lean();

  if (budget_max != null) {
    items = items.filter(p => (p.total_estimated_cost_usd ?? Infinity) <= budget_max);
  }
  if (duration_max != null) {
    items = items.filter(p => (p.total_duration_months ?? Infinity) <= duration_max);
  }
  if (language) {
    const langLower = language.toLowerCase();
    items = items.filter(p => (p.required_language_tests || []).some(t => t.language?.toLowerCase().includes(langLower)));
  }

  const scored = items.map(p => {
    let score = 0;
    const cost = p.total_estimated_cost_usd;
    const dur = p.total_duration_months;

    if (cost != null) score += Math.max(0, 1 - cost / 20000) * 40;
    if (dur != null) score += Math.max(0, 1 - dur / 60) * 30;
    if (p.content_status === 'verified') score += 15;
    if (p.visa_info?.length > 0) score += 10;
    if (p.expected_salary?.min_annual != null) score += 5;

    return { ...p, match_score: Math.round(score) };
  });

  scored.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

  return scored.slice(0, 20);
}
