import server from '../../server';
import {
  Request,
  Response
} from 'express-serve-static-core';
import db from '../../connection';
import ErrorController from '../../controllers/ErrorController';
import ErrorModel from '../../models/ErrorModel';
import { Connection } from 'mongoose';

server.post('/databases/insert', (req: Request, res: Response) => {
  db(async (db: Connection) => {
    const body = req.body();
    const errorController = new ErrorController(new ErrorModel({ message: 'oi' }));
    const result = await errorController.save();
    res.send(result);
    db.close();
  })
});

server.get('/databases/all', (req: Request, res: Response) => {
  console.log('incoming request');
  db(async (db: Connection) => {
    console.log('connection open');
    const errorController = new ErrorController();
    const result = await errorController.findAll();
    res.send(result);
    db.close();
    console.log('connection close');
  })
});