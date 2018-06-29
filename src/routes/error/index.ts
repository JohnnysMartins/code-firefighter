import server from '../../shared/server';
import { Request, Response } from 'express-serve-static-core';
import { check, validationResult } from 'express-validator/check';
import { databaseInsert, databaseFindAll } from '../../Error/ErrorBusiness'

const postChecking = [
  check('name').exists(),
  check('message').exists(),
  check('trace').exists()
];
server.post('/error/insert', postChecking, async (req: Request, res: Response) => {
  databaseInsert(req, res, validationResult);
});

server.get('/error/all', async (req: Request, res: Response) => {
  databaseFindAll(req, res);
});