import { connection } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

import ErrorController from './ErrorController';
import IError from './IError';

import * as httpStatus from 'http-status-codes';
import GenericException from '../../shared/exceptions/GenericException';
import RedisController from '../../shared/class/RedisController';

const errorController = new ErrorController();
const redisController = new RedisController();

export const errorFindAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const redisResult = await redisController.getCache('ERROR_all');
    if (redisResult) {
      res.status(httpStatus.OK).send(redisResult);
      return;
    }
    const result = await errorController.findAll();
    await redisController.setCache('ERROR_all', result);
    if (result.length === 0) {
      res.status(httpStatus.NO_CONTENT).send();
    }
    else {;
      res.status(httpStatus.OK).json(result);
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
      date: body.date,
      userAgent: body.userAgent,
      code: body.code,
      isNodeError: body.isNodeError,
      appName: body.appName
    }
    const result = await errorController.save(errorObject);
    res.status(httpStatus.CREATED).json(result);
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}
