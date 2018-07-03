import { Request, Response } from 'express-serve-static-core';
import { check, validationResult } from 'express-validator/check';
import { databaseInsert, databaseFindAll } from '../../entities/Error/ErrorBusiness'

import server from '../../shared/server';

import * as httpStatus from 'http-status-codes';

const postChecking = [
  check('name').exists(),
  check('message').exists(),
  check('trace').exists()
];
server.post('/errors', postChecking, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }
  databaseInsert(req, res);
});

server.get('/errors', (req: Request, res: Response) => {
  databaseFindAll(req, res);
});