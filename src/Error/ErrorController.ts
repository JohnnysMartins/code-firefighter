import ErrorModel from './ErrorModel';
import IError from './IError';
import { AController } from '../shared/class/AbstractController';

export default class ErrorController extends AController<IError> {

  constructor() {
    super(ErrorModel);
  }
}