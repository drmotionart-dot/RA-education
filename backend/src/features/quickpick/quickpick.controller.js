import * as quickpickService from './quickpick.service.js';

export async function createQuickPick(req, res, next) {
  try {
    const { specialty_id, path_id, preset_duration_months } = req.validatedBody;
    const result = await quickpickService.createQuickPick(
      req.user.mobile_number,
      specialty_id,
      path_id,
      preset_duration_months,
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}
