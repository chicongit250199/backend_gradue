import { HTTP_ERROR, HttpError } from '../config/error';

export function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new HttpError(HTTP_ERROR.NOT_AUTHENTICATE);
  }
}
