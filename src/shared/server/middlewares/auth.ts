import { connection } from 'mongoose';
import { Request, Response, NextFunction } from "express";
import ConfigurationController from "../../../entities/Configuration/ConfigurationController";
import ConnectionClass from '../../class/Connection';

import * as httpStatus from 'http-status-codes';

const configurationController = new ConfigurationController();
const connectionClass = new ConnectionClass();

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    await connectionClass.connect('auth.ts');
    const authHeader = req.headers.authorization || "";
    const configToken = await configurationController.getAuth();
    if (authHeader === configToken) {
      next();
    }
    else {
      res.status(httpStatus.UNAUTHORIZED).send('Unable to confirm authorization header');
    }
  }
  catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.toString());
  }
  finally {
    connection.close();
  }
}