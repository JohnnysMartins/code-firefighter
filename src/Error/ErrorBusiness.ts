import ConnectionClass from '../shared/class/Connection';
import ErrorController from './ErrorController';
import IError from './IError';

import { connection } from 'mongoose';
import { Request, Response } from 'express-serve-static-core';

import * as httpStatus from 'http-status-codes';

const errorController = new ErrorController();
const connectionClass = new ConnectionClass();

export const databaseFindAll = async (req: Request, res: Response) => {
  try {
    const result = await connectionClass.connect();
    result.run(async () => {
      const result = await errorController.findAll();
      if (result.length === 0) {
        res.status(httpStatus.NO_CONTENT).send();
      }
      else {
        res.status(httpStatus.OK).send(result);
      }
      connection.close();
    });
  }
  catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.toString());
    connection.close();
  }
}

export const databaseInsert = async (req: Request, res: Response, validationResult: Function) => {
  try {
    const result = await connectionClass.connect();
    result.run(async () => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
        }
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
    });
  }
  catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.toString());
    connection.close();
  }
}
