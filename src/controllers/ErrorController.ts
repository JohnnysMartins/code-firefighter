import { Document } from 'mongoose';
import ErrorModel from '../models/ErrorModel';

export default class ErrorController {

  private _errorDocument: Document;

  constructor(errorDocument?: Document) {
    if (errorDocument) {
      this._errorDocument = errorDocument;
    }
  }

  save() {
    if (this._errorDocument) {
      return this._errorDocument.save();
    }
  }

  findAll() {
    return ErrorModel.find();
  }
}