import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/db.js';

import authRoutes from './features/auth/auth.routes.js';
import usersRoutes from './features/users/users.routes.js';
import catalogRoutes from './features/catalog/catalog.routes.js';
import quickpickRoutes from './features/quickpick/quickpick.routes.js';
import lessonsRoutes from './features/lessons/lessons.routes.js';
import studyplanRoutes from './features/studyplan/studyplan.routes.js';
import assessmentRoutes from './features/assessment/assessment.routes.js';
import surveyRoutes from './features/survey/survey.routes.js';
import companionRoutes from './features/companion/companion.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(async (_req, _res, next) => {
  try { await connectDB(); next(); } catch (err) { next(err); }
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/quickpick', quickpickRoutes);
app.use('/api/lessons', lessonsRoutes);
app.use('/api/plan', studyplanRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/survey', surveyRoutes);
app.use('/api/companion', companionRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

export default app;
