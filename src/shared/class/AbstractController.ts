import { Document, DocumentQuery, Model, Query } from "mongoose";
import { IMongoModel } from "../interfaces/IMongoModel";

import RedisController from './RedisController';
import IError from "../../entities/Error/IError";

export abstract class AController<Interface extends IMongoModel> {

  private _model: Model<Document>;
  private redisController: RedisController;

  constructor(model: Model<Document>) {
    this._model = model;
    this.redisController = new RedisController();
  }

  save(obj: Interface): Promise<Document> {
    if (obj) {
      const model: Document = new this._model(obj);
      return model.save();
    }
    else {
      throw 'No Document to save';
    }
  }

  findAll(): Promise<IError[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.redisController.getCache('all');
        if (result) {
          resolve(JSON.parse(result));
        }
        else {
          const result = await this._model.find();
          await this.redisController.setCache('all', JSON.stringify(result));
          //@ts-ignore
          resolve(result);
        }
      }
      catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }

  findById(id: number): DocumentQuery<Document, Document> {
    return this._model.findById(id);
  }

  find(params: Interface): DocumentQuery<Document, Document> {
    return this._model.findById(params);
  }

  delete(id: number): Query<Interface> {
    return this._model.deleteOne(id);
  }

  update(params: Interface): DocumentQuery<Document, Document> {
    return this._model.findOneAndUpdate({ _id: params._id }, params);
  }
}