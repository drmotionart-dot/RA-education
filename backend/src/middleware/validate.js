import { ApiError } from '../utils/apiError.js';

export function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues.map(i => i.message).join('; ');
      throw new ApiError(400, message);
    }
    req.validatedBody = result.data;
    next();
  };
}
