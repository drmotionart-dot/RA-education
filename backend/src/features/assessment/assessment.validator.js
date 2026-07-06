import { z } from 'zod';

export const startAssessmentSchema = z.object({
  specialty_id: z.string().min(1, 'Specialty ID is required'),
});

export const submitAnswerSchema = z.object({
  question_id: z.string().min(1),
  selected_option_ids: z.array(z.string()).min(1, 'At least one option must be selected'),
});
