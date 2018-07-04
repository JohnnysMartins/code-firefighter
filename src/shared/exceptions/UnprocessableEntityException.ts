import GenericException from "./GenericException";
import * as httpCodes from 'http-status-codes';

export default class UnprocessableEntityException extends GenericException {
  constructor(errors: Array<any>) {
    super('UnprocessableEntityException', 'Fields validation failed', errors, httpCodes.UNPROCESSABLE_ENTITY);

    Object.setPrototypeOf(this, UnprocessableEntityException.prototype);
  }
}