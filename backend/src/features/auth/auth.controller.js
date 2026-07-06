import * as authService from './auth.service.js';

export async function register(req, res, next) {
  try {
    const result = await authService.register(req.validatedBody);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { identifier, password } = req.validatedBody;
    const result = await authService.login(identifier, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const { identifier } = req.validatedBody;
    const result = await authService.forgotPassword(identifier);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { identifier, code, new_password } = req.validatedBody;
    const result = await authService.resetPassword(identifier, code, new_password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function requestOTP(req, res, next) {
  try {
    const { mobile_number } = req.validatedBody;
    const result = await authService.requestOTP(mobile_number);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function verifyOTP(req, res, next) {
  try {
    const { mobile_number, code } = req.validatedBody;
    const result = await authService.verifyOTPCode(mobile_number, code);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

export async function telegramWebhook(req, res, next) {
  try {
    const result = await authService.handleTelegramWebhook(req);
    res.status(200).json(result);
  } catch (err) {
    console.error('[TG WEBHOOK] Error:', err);
    res.status(200).json({ ok: true });
  }
}
