export default class UtilsClass {
  constructor () {}

  public parseEntityToRedis (object: any) {
    console.log('entity > redis', object)
    return JSON.stringify(object);
  }

  public parseRedisToEntity (object) {
    console.log('redis > entity', object);
    return JSON.parse(object);
  }
}