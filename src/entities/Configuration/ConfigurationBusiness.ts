import { IConfiguration } from './IConfiguration';
import { Request, Response, NextFunction } from 'express';
import { connection } from 'mongoose';

import ConfigurationController from './ConfigurationController';

import * as httpStatus from 'http-status-codes';
import GenericException from '../../shared/exceptions/GenericException';

const configurationController = new ConfigurationController();

export const updateConfiguration = async (req: Request, res: Response, next: NextFunction, configurationObject: IConfiguration) => {
  try {
    const result = await configurationController.saveConfig(configurationObject);
    res.status(httpStatus.OK).send(result);
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}

export const getConfiguration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await configurationController.getConfig();
    res.status(httpStatus.OK).send(result);
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}