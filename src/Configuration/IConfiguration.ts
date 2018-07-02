import { IMongoModel } from './../shared/interfaces/IMongoModel';
export interface IConfiguration extends IMongoModel {
  permissions: {
    createErrorLevel1: boolean;
    createErrorLevel2: boolean;
    createErrorLevel3: boolean;
    createErrorLevel4: boolean;
    createErrorLevel5: boolean;
  }
}