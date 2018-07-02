import { IConfiguration } from './IConfiguration';
import { Request, Response } from 'express';
import { connection } from 'mongoose';

import ConfigurationController from './ConfigurationController';
import ConnectionClass from '../shared/class/Connection';

import * as httpStatus from 'http-status-codes';

const configurationController = new ConfigurationController();
const connectionClass = new ConnectionClass();

export const updateConfiguration = async (req: Request, res: Response, configurationObject: IConfiguration) => {
  try {
    await connectionClass.connect();
    const result = await configurationController.saveConfig(configurationObject);
    res.status(httpStatus.OK).send(result);
  }
  catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.toString());
  }
  finally {
    connection.close();
  }
}

export const getConfiguration = async (req: Request, res: Response) => {
  try {
    await connectionClass.connect();
    const result = await configurationController.getConfig();
    res.status(httpStatus.OK).send(result);
  }
  catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.toString());
  }
  finally {
    connection.close();
  }
}