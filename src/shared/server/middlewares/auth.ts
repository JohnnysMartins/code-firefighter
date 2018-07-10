import { connection } from 'mongoose';
import { Request, Response, NextFunction } from "express";
import ConfigurationController from "../../../entities/Configuration/ConfigurationController";
import ConnectionClass from '../../class/Connection';

import GenericException from '../../exceptions/GenericException';
import AuthUnauthorizedException from '../../exceptions/AuthUnauthorizedException';

const configurationController = new ConfigurationController();
const connectionClass = new ConnectionClass();

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    await connectionClass.connect('auth.ts');
    const authHeader = req.headers.authorization || "";
    const configToken = await configurationController.getAuth();
    if (authHeader === configToken) {
      console.log('[AUTH] Authentication ok');
      next();
    }
    else {
      console.error('[AUTH] Authentication nok');
      next(new AuthUnauthorizedException());
    }
  }
  catch (err) {
    next(new GenericException(err.name, err.error));
  }
}