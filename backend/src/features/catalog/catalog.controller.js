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
