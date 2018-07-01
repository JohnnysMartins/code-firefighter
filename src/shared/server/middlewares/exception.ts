import { Request, Response, NextFunction } from 'express';

import * as httpStatus from 'http-status-codes';

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error('[ERROR]', err.stack)
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
}