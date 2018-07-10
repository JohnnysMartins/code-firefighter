import { Request, Response, NextFunction } from 'express';

import * as httpStatus from 'http-status-codes';
import GenericException from '../../exceptions/GenericException';
import { connection } from 'mongoose';

export default function (err: GenericException, req: Request, res: Response, next: NextFunction) {
  console.error(`[ERROR]: ${err.name}`);
  console.error(err.stack);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.formatError());
  connection.close();
}