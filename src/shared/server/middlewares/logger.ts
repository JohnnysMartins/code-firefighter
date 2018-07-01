import { Request, Response, NextFunction } from "express";
import * as moment from 'moment';

export default function (req: Request, res: Response, next: NextFunction) {
  const loggerTime = `${moment().format('HH:mm')}`;
  console.warn(`[LOG][${req.method}](${loggerTime}) URL - ${req.url} PAYLOAD: ${JSON.stringify(req.body)}`);
  next();
}