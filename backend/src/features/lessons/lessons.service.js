import { Lesson } from './lessons.model.js';
import { ApiError } from '../../utils/apiError.js';

export async function getLessonResources(lessonId) {
  const lesson = await Lesson.findById(lessonId).lean();
  if (!lesson) throw new ApiError(404, 'Lesson not found');
  return {
    id: lesson._id,
    title: lesson.title,
    description: lesson.description,
    duration_minutes: lesson.duration_minutes,
    branch_id: lesson.branch_id,
    tags: lesson.tags,
    resources: (lesson.resources || []).sort((a, b) => a.priority_order - b.priority_order),
  };
}
