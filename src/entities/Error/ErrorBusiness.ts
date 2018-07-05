import { connection } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import ErrorController from './ErrorController';
import IError from './IError';

import * as httpStatus from 'http-status-codes';
import GenericException from '../../shared/exceptions/GenericException';

const errorController = new ErrorController();

export const errorFindAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await errorController.findAll();
    if (result.length === 0) {
      res.status(httpStatus.NO_CONTENT).send();
    }
    else {
      res.status(httpStatus.OK).send(result);
    }
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}

export const errorPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body: IError = req.body;
    const errorObject: IError = {
      name: body.name,
      message: body.message,
      trace: body.trace,
      userAgent: body.userAgent,
      code: body.code,
      isNodeError: body.isNodeError
    }
    const result = await errorController.save(errorObject);
    res.status(httpStatus.CREATED).send(result);
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}
