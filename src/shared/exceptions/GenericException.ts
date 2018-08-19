import * as httpStatus from 'http-status-codes';

export default class GenericException extends Error {

  public statusCode: number;
  public extras: any;

  constructor(name: string, msg: string, extras?: any, statusCode = httpStatus.INTERNAL_SERVER_ERROR) {
    super(msg);
    this.statusCode = statusCode;
    this.name = name;
    this.extras = extras;

    Object.setPrototypeOf(this, GenericException.prototype);
  }

  formatError() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      extras: this.extras
    }
  }
}