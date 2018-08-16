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

export const getAdminUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await userController.find({role: 'admin'}).select({password: false});
    if (result.length) {
      return res.status(httpStatus.OK).send(result[0]);
    }
    return res.status(httpStatus.NO_CONTENT).send();
  }
  catch (err) {
    next(new GenericException(err.name, err.message));
  }
  finally {
    connection.close();
  }
}

export const createAdminUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newAdminUser: IUser = {
      name: 'admin',
      role: 'admin',
      password: 'admin'
    }
    const searchUser = await userController.find({role: 'admin', name: 'admin'});
    if (searchUser.length > 0) {
      throw new GenericException('AdminAlreadyCreatedException', 'System already have a admin user');
    }
    else {
      const result = await userController.save(newAdminUser);
      return res.status(httpStatus.CREATED).send(result);
    }
  }
  catch (e) {
    next(new GenericException(e.name, e.message));
  }
  finally {
    connection.close();
  }
}

export const changeAdminPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [admin] = await userController.find({role: 'admin', name: 'admin'});
    if (!admin._id) {
      throw new GenericException('AdminUserNotFound', 'Unable to find a admin user');
    }
    const result = await admin.update({password: req.body.password});
    return res.status(httpStatus.OK).send(result);
  }
  catch (e) {
    next(new GenericException(e.name, e.message));
  }
  finally {
    connection.close();
  }
}