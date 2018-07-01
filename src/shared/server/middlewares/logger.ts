import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  console.warn(`[LOG][${req.method}]: URL - ${req.url} PAYLOAD: ${JSON.stringify(req.body)}`);
  next();
}