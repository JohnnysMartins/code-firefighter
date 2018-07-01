import { Document, DocumentQuery, Model, Query } from "mongoose";
import IError from "../../Error/IError";

export abstract class AController<Interface> {

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

  find(params: IError): DocumentQuery<Document, Document> {
    return this._model.findById(params);
  }

  delete(id: number): Query<IError> {
    return this._model.deleteOne(id);
  }

  update(params: IError): DocumentQuery<Document, Document> {
    return this._model.findOneAndUpdate({ _id: params._id }, params);
  }
}