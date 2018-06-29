import ErrorModel from '../models/ErrorModel';
import IError from '../interfaces/IError';
import IController from '../interfaces/IController';
import { Document } from 'mongoose';

export default class ErrorController implements IController<IError> {

  constructor() {}

  save(errorObject: IError) {
    if (errorObject) {
      const model: Document = new ErrorModel(errorObject);
      return model.save();
    }
    else {
      throw 'No Document to save'
    }
  }

  findAll() {
    return ErrorModel.find();
  }
}