import server from '../../server';
import { Request, Response } from 'express-serve-static-core';
import ConnectionClass from '../../connection';
import IError from '../../interfaces/IError';
import ErrorController from '../../controllers/ErrorController';
import { Connection, connection } from 'mongoose';
import { check, validationResult } from 'express-validator/check';
import * as httpStatus from 'http-status-codes';

const errorController = new ErrorController();
const connectionClass = new ConnectionClass();

const postChecking = [
  check('name').exists(), 
  check('message').exists(),
  check('trace').exists()
];
server.post('/databases/insert', postChecking, async (req: Request, res: Response) => {
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
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    connection.close();
  }
});

server.get('/databases/all', async (req: Request, res: Response) => {
  try {
    const result = await connectionClass.connect();
    result.run(async (connection: Connection) => {
      const result = await errorController.findAll();
      if (result.length === 0) {
        res.status(httpStatus.NO_CONTENT).send(result);
      }
      else {
        res.status(httpStatus.OK).send(result);
      }
      connection.close();
    });
  }
  catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    connection.close();
  }
});