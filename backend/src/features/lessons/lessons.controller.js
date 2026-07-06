import * as lessonsService from './lessons.service.js';

export async function getLesson(req, res, next) {
  try {
    const result = await lessonsService.getLesson(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getResources(req, res, next) {
  try {
    const result = await lessonsService.getLessonResources(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function startExam(req, res, next) {
  try {
    const { mobile_number } = req.user;
    const { plan_lesson_id } = req.body;
    const result = await lessonsService.startLessonExam(mobile_number, plan_lesson_id);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function complete(req, res, next) {
  try {
    const { mobile_number } = req.user;
    const { plan_lesson_id, assessment_id } = req.body;
    const result = await lessonsService.completeLesson(mobile_number, plan_lesson_id, assessment_id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function suggestions(req, res, next) {
  try {
    const { mobile_number } = req.user;
    const { plan_lesson_id } = req.body;
    const result = await lessonsService.getSuggestedLessons(mobile_number, plan_lesson_id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
