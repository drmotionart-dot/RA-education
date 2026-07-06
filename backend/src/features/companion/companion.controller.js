import * as companionService from './companion.service.js';

export async function findMatches(req, res, next) {
  try {
    const result = await companionService.findMatches(req.user.mobile_number);
    res.status(200).json(result);
  } catch (err) { next(err); }
}

export async function sendRequest(req, res, next) {
  try {
    const { to_user_id } = req.validatedBody;
    const result = await companionService.sendRequest(req.user.mobile_number, to_user_id);
    res.status(201).json(result);
  } catch (err) { next(err); }
}

export async function respondToRequest(req, res, next) {
  try {
    const { request_id, action } = req.validatedBody;
    const result = await companionService.respondToRequest(req.user.mobile_number, request_id, action);
    res.status(200).json(result);
  } catch (err) { next(err); }
}

export async function getCompanion(req, res, next) {
  try {
    const result = await companionService.getCompanion(req.user.mobile_number);
    res.status(200).json(result);
  } catch (err) { next(err); }
}

export async function getPendingRequests(req, res, next) {
  try {
    const result = await companionService.getPendingRequests(req.user.mobile_number);
    res.status(200).json(result);
  } catch (err) { next(err); }
}
