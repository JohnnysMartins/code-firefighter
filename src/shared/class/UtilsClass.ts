export default class UtilsClass {
  constructor () {}

  public parseEntityToRedis (object: any) {
    let newObject = {};
    Object.getOwnPropertyNames(object).map(attr => {
      if (object[attr]) {
        newObject[attr] = object[attr];
      }
    });
    return JSON.stringify(newObject);
  }

  public parseRedisToEntity (object) {
    return JSON.parse(object);
  }
}