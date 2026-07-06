import * as studyplanService from './studyplan.service.js';

export async function generatePlan(req, res, next) {
  try {
    const { quickpick_id } = req.validatedBody;
    const result = await studyplanService.generatePlan(req.user.mobile_number, quickpick_id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getCurrentPlan(req, res, next) {
  try {
    const result = await studyplanService.getCurrentPlan(req.user.mobile_number);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function restartPlan(req, res, next) {
  try {
    const result = await studyplanService.restartPlan(req.user.mobile_number);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getPlanHistory(req, res, next) {
  try {
    const result = await studyplanService.getPlanHistory(req.user.mobile_number);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
