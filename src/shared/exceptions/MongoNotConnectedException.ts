export default class MongoNotConnectedException extends Error {
  constructor() {
    super('Not connect to a mongo dabatase');

    Object.setPrototypeOf(this, MongoNotConnectedException.prototype);
  }
}