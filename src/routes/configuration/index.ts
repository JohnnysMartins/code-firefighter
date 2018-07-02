import { updateConfiguration, getConfiguration } from './../../Configuration/ConfigurationBusiness';
import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator/check';

import server from '../../shared/server';

import * as httpStatus from 'http-status-codes';

const postChecking = [
  check('permissions').exists(),
];
server.post('/configuration', postChecking, (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ errors: errors.array() });
  }
  updateConfiguration(req, res, req.body);
});

server.get('/configuration', (req: Request, res: Response) => {
  getConfiguration(req, res);
});