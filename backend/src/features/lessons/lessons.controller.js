import * as lessonsService from './lessons.service.js';

export async function getResources(req, res, next) {
  try {
    const result = await lessonsService.getLessonResources(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}
