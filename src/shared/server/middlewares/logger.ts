import { Request, Response, NextFunction } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  console.warn(`[${req.method}]: URL - ${req.url} IP - ${req.ip}`);
  next();
}