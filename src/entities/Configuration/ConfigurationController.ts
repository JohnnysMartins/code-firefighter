import { DocumentQuery, Document } from 'mongoose';
import { IConfiguration } from './IConfiguration';
import configurationModel from './ConfigurationModel';

export default class ConfigurationController {
  constructor() {}

  saveConfig(configObject: IConfiguration): Promise<Document> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await configurationModel.findOneAndUpdate({}, configObject);
        if (!result) {
          const document = new configurationModel(configObject);
          const response = await document.save();
          resolve(response);
        }
        else {
          const response = await result.update(configObject);
          resolve(response);
        }
      }
      catch (err) {
        reject(err);
      }
    });
  }

  getConfig(): DocumentQuery<Document, Document> {
    return configurationModel.findOne();
  }

  getAuth(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const configObject: any = await this.getConfig();
        resolve(configObject.authToken);
      }
      catch (err) {
        reject(err);
      }
    })
  }
}