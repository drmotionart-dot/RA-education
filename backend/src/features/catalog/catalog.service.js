import { Specialty, Path } from './catalog.model.js';
import { ApiError } from '../../utils/apiError.js';

export async function listSpecialties(category) {
  const filter = category ? { category } : {};
  return Specialty.find(filter).sort({ order: 1 }).lean();
}

export async function getSpecialty(id) {
  const specialty = await Specialty.findById(id).lean();
  if (!specialty) throw new ApiError(404, 'Specialty not found');
  return specialty;
}

export async function listPaths(category) {
  const filter = category ? { category } : {};
  return Path.find(filter).sort({ order: 1 }).lean();
}

export async function getPath(id) {
  const path = await Path.findById(id).lean();
  if (!path) throw new ApiError(404, 'Path not found');
  return path;
}
