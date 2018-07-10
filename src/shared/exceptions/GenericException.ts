export default class GenericException extends Error {

  public statusCode;
  public extras;
  constructor(name: string, msg: string, extras?: any, statusCode = 500) {
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