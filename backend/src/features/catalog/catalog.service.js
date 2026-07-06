import { Specialty, Path } from './catalog.model.js';
import { ApiError } from '../../utils/apiError.js';

const STALE_AFTER_MS = 6 * 30 * 24 * 60 * 60 * 1000; // ~6 months

function computeStaleness(item) {
  if (item.content_status === 'stub') return true;
  if (item.last_verified_at) {
    const age = Date.now() - new Date(item.last_verified_at).getTime();
    return age > STALE_AFTER_MS;
  }
  return true; // no last_verified_at and not verified → stale
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
