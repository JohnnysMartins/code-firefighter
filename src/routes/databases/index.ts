import server from '../../server';
import {
  Request,
  Response
} from 'express-serve-static-core';
import connected from '../../connection';
import ErrorController from '../../controllers/ErrorController';
import { Connection } from 'mongoose';
import IError from '../../interfaces/IError';

const errorController = new ErrorController();

server.post('/databases/insert', (req: Request, res: Response) => {
  connected(async (connection: Connection) => {
    const body: IError = req.body();
    const errorObject: IError = {
      name: body.name,
      message: body.message,
      trace: body.trace,
      userAgent: body.userAgent,
      code: body.code,
      isNodeError: body.isNodeError
    }
    const result = await errorController.save(errorObject);
    res.send(result);
    connection.close();
  })
});

server.get('/databases/all', (req: Request, res: Response) => {
  connected(async (connection: Connection) => {
    const result = await errorController.findAll();
    res.send(result);
    connection.close();
  })
});