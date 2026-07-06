import * as assessmentService from './assessment.service.js';

export async function startAssessment(req, res, next) {
  try {
    const result = await assessmentService.startAssessment(
      req.user.mobile_number,
      req.body.specialty_id,
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getNextQuestion(req, res, next) {
  try {
    const result = await assessmentService.getNextQuestion(
      req.user.mobile_number,
      req.params.id,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function submitAnswer(req, res, next) {
  try {
    const result = await assessmentService.submitAnswer(
      req.user.mobile_number,
      req.params.id,
      req.body.question_id,
      req.body.selected_option_ids,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function getResults(req, res, next) {
  try {
    const result = await assessmentService.getResults(
      req.user.mobile_number,
      req.params.id,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function reallocatePlan(req, res, next) {
  try {
    const result = await assessmentService.reallocatePlan(
      req.user.mobile_number,
      req.params.id,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
}
