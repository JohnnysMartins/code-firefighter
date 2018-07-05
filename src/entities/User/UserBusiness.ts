import { Request, Response, NextFunction } from "express";
import { connection } from 'mongoose';

import IUser from "./IUser";
import UserController from "./UserController";
import GenericException from '../../shared/exceptions/GenericException';

import * as httpStatus from 'http-status-codes';

const userController = new UserController();

export const postUser = async (req: Request, res: Response, next: NextFunction, userObject: IUser) => {
  try {
    const result = await userController.save(userObject);
    res.status(httpStatus.OK).send(result);
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}

export const putUser = async (req: Request, res: Response, next: NextFunction, userObject: IUser) => {
  try {
    await userController.update(userObject);
    res.status(httpStatus.NO_CONTENT).send();
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction, id: string) => {
  try {
    await userController.delete(id);
    res.status(httpStatus.NO_CONTENT).send();
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}

export const getUser = async (req: Request, res: Response, next: NextFunction, id: string) => {
  try {
    const result = await userController.findById(id);
    res.status(httpStatus.OK).send(result);
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userController.findAll();
    res.status(httpStatus.OK).send(result);
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}