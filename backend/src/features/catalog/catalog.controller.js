import * as catalogService from './catalog.service.js';

export async function listSpecialties(req, res, next) {
  try {
    const { category } = req.query;
    const result = await catalogService.listSpecialties(category);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getSpecialty(req, res, next) {
  try {
    const result = await catalogService.getSpecialty(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function listPaths(req, res, next) {
  try {
    const { category } = req.query;
    const result = await catalogService.listPaths(category);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getPath(req, res, next) {
  try {
    const result = await catalogService.getPath(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function compassPaths(req, res, next) {
  try {
    const { category, path_type, country } = req.query;
    const result = await catalogService.compassPaths({ category, path_type, country });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function comparePaths(req, res, next) {
  try {
    const { ids } = req.query;
    if (!ids) return res.status(400).json({ error: 'Query param "ids" required (comma-separated path IDs)' });
    const idArr = ids.split(',').filter(Boolean);
    const result = await catalogService.comparePaths(idArr);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function costCalculator(req, res, next) {
  try {
    const { path_id, currency } = req.query;
    const result = await catalogService.costCalculator(path_id, currency);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function smartFind(req, res, next) {
  try {
    const { budget_max, duration_max, category, country, path_type, language } = req.query;
    const result = await catalogService.smartFind({
      budget_max: budget_max ? Number(budget_max) : undefined,
      duration_max: duration_max ? Number(duration_max) : undefined,
      category, country, path_type, language,
    });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
