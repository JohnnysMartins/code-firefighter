import GenericException from "./GenericException";
import { Request } from "express";

export default class RouteNotFoundException extends GenericException {
  constructor(req: Request) {
    super('RouteNotFoundException', `${req.originalUrl} doesn't exist on this server`);

    Object.setPrototypeOf(this, RouteNotFoundException.prototype);
  }
}