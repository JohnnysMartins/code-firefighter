import GenericException from "./GenericException";
import * as httpCodes from 'http-status-codes';

export default class AuthUnauthorizedException extends GenericException {
  constructor() {
    super('AuthUnauthorizedException', 'Unable to confirm authorization header', httpCodes.UNAUTHORIZED);

    Object.setPrototypeOf(this, AuthUnauthorizedException.prototype);
  }
}