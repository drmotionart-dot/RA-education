import { z } from 'zod';

export const startSurveySchema = z.object({
  type: z.enum(['specialty', 'path'], { message: 'Type must be specialty or path' }),
  role: z.enum(['doctor', 'nurse'], { message: 'Role must be doctor or nurse' }),
});

export const answerSurveySchema = z.object({
  node_id: z.string().min(1, 'Node ID is required'),
  option_index: z.number().int().min(0, 'Option index must be a non-negative integer'),
});
