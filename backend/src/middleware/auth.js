import { verifyToken } from '../utils/jwt.js';
import { ApiError } from '../utils/apiError.js';

export function authenticate(req, _res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    throw new ApiError(401, 'Authentication required');
  }

  const token = header.split(' ')[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch {
    throw new ApiError(401, 'Invalid or expired token');
  }
}
