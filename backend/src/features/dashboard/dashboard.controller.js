import * as dashboardService from './dashboard.service.js';

export async function getStats(req, res, next) {
  try {
    const stats = await dashboardService.getDashboardStats(req.user.mobile_number);
    res.json(stats);
  } catch (err) {
    next(err);
  }
}
