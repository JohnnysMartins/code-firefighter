export default class UtilsClass {
  constructor () {}

  public parseEntityToRedis (object: any) {
    return JSON.stringify(object);
  }

  public parseRedisToEntity (object) {
    return JSON.parse(object);
  }
}