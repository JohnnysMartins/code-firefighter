import ConnectionClass from '../../shared/class/Connection';
import ErrorController from './ErrorController';
import IError from './IError';

import { connection } from 'mongoose';
import { Request, Response } from 'express-serve-static-core';

import * as httpStatus from 'http-status-codes';

const errorController = new ErrorController();
const connectionClass = new ConnectionClass();

export const databaseFindAll = async (req: Request, res: Response) => {
  try {
    await connectionClass.connect();
    const result = await errorController.findAll();
    if (result.length === 0) {
      res.status(httpStatus.NO_CONTENT).send();
    }
    else {
      res.status(httpStatus.OK).send(result);
    }
  }
  catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.toString());
  }
  finally {
    connection.close();
  }
}

export const databaseInsert = async (req: Request, res: Response) => {
  try {
    await connectionClass.connect();
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
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.toString());
  }
  finally {
    connection.close();
  }
}
