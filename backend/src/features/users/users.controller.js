import * as usersService from './users.service.js';

export async function onboard(req, res, next) {
  try {
    const { mobile_number } = req.user;
    const result = await usersService.onboardUser(mobile_number, req.validatedBody);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function getMe(req, res, next) {
  try {
    const { mobile_number } = req.user;
    const result = await usersService.getCurrentUser(mobile_number);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function updateMe(req, res, next) {
  try {
    const { mobile_number } = req.user;
    const result = await usersService.updateCurrentUser(mobile_number, req.validatedBody);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function deleteMe(req, res, next) {
  try {
    const { mobile_number } = req.user;
    await usersService.deleteUserAccount(mobile_number);
    res.status(200).json({ message: 'Account deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
