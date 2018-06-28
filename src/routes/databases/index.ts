import server from '../../server';
import {
  Request,
  Response
} from 'express-serve-static-core';
import connected from '../../connection';
import ErrorController from '../../controllers/ErrorController';
import { Connection } from 'mongoose';

const errorController = new ErrorController();

server.post('/databases/insert', (req: Request, res: Response) => {
  connected(async (connection: Connection) => {
    const body = req.body();
    const result = await errorController.save({message: 'oi'});
    res.send(result);
    connection.close();
  })
});

server.get('/databases/all', (req: Request, res: Response) => {
  connected(async (connection: Connection) => {
    const result = await errorController.findAll();
    res.send(result);
    connection.close();
  })
});