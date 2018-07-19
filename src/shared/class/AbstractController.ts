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

  findById(id: string): DocumentQuery<Document, Document> {
    return this._model.findById({_id: id});
  }

  find(params: Interface): DocumentQuery<Document[], Document> {
    return this._model.find(params);
  }

  delete(id: string): Query<Interface> {
    return this._model.deleteOne({_id: id});
  }

  update(params: Interface): DocumentQuery<Document, Document> {
    return this._model.findOneAndUpdate({ _id: params._id }, params);
  }
}