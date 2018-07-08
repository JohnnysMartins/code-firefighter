import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

export default class RedisController {
  private client: RedisClient;
  private getAsync;
  private setAsync;

  constructor() {
    this.client = createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.setAsync = promisify(this.client.set).bind(this.client);
  }

  getCache(key: string): Promise<any> {
    return this.getAsync(key);
  }

  setCache(key: string, value: any, operation: string = 'EX', expireTimer = 15): Promise<any> {
    return this.setAsync(key, value, operation, expireTimer);
  }
}