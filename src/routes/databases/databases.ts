import server from '../../server';
import {
  Request,
  Response
} from 'express-serve-static-core';

server.post('/databases/insert', (req: Request, res: Response) => {
  res.send('Teste');
});

server.get('/databases/all', (req: Request, res: Response) => {
  res.send('test');
});