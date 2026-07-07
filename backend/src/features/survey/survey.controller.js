import * as surveyService from './survey.service.js';

export async function startSurvey(req, res, next) {
  try {
    const { type, role } = req.validatedBody;
    const result = await surveyService.startSurvey(req.user.mobile_number, { type, role });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function answerQuestion(req, res, next) {
  try {
    const { node_id, option_index } = req.validatedBody;
    const result = await surveyService.answerQuestion(req.user.mobile_number, req.params.id, { node_id, option_index });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getSessionState(req, res, next) {
  try {
    const result = await surveyService.getSessionState(req.user.mobile_number, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function completeSurvey(req, res, next) {
  try {
    const result = await surveyService.completeSurvey(req.user.mobile_number, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function abandonSurvey(req, res, next) {
  try {
    const result = await surveyService.abandonSurvey(req.user.mobile_number, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function createPlanFromSurvey(req, res, next) {
  try {
    const result = await surveyService.createPlanFromSurvey(req.user.mobile_number, req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
