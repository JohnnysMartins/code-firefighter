import { IMongoModel } from './../shared/interfaces/IMongoModel';
export default interface IError extends IMongoModel{
  name: string;
  message: string;
  trace: string;
  code?: number | string;
  userAgent?: string;
  isNodeError?: boolean;
}