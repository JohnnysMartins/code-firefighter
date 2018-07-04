import { updateConfiguration, getConfiguration } from '../../entities/Configuration/ConfigurationBusiness';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator/check';

import server from '../../shared/server';

import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

const postChecking = [
  check('permissions').exists(),
];
server.post('/configuration', postChecking, (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new UnprocessableEntityException(errors.array()));
    return;
  }
  updateConfiguration(req, res, next, req.body);
});

server.get('/configuration', (req: Request, res: Response, next: NextFunction) => {
  getConfiguration(req, res, next);
});