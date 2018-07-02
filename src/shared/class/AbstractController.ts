import { Document, DocumentQuery, Model, Query } from "mongoose";
import { IMongoModel } from "../interfaces/IMongoModel";

export abstract class AController<Interface extends IMongoModel> {

  private _model: Model<Document>;

  constructor(model: Model<Document>) {
    this._model = model;
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

  findAll(): DocumentQuery<Document[], Document> {
    return this._model.find();
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