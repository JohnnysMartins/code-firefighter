import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator/check';
import { databaseInsert, databaseFindAll } from '../../entities/Error/ErrorBusiness'

import server from '../../shared/server';

import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

export default {
  initRoute() {
    const postChecking = [
      check('name').exists(),
      check('message').exists(),
      check('trace').exists()
    ];
    server.post('/errors', postChecking, (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(new UnprocessableEntityException(errors.array()));
        return;
      }
      databaseInsert(req, res, next);
    });

    server.get('/errors', (req: Request, res: Response, next: NextFunction) => {
      databaseFindAll(req, res, next);
    });
  }
}