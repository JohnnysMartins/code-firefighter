import { Request, Response, NextFunction } from 'express';

import GenericException from '../../exceptions/GenericException';
import { connection } from 'mongoose';

export default function (err: GenericException, req: Request, res: Response, next: NextFunction) {
  console.error(`[ERROR]: ${err.name}`);
  console.error(err.stack);
  connection.close();
  res.status(err.statusCode).send(err.formatError());
}