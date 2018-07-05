import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator/check';
import { errorPost, errorFindAll } from '../../entities/Error/ErrorBusiness'

import server from '../../shared/server';

import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

export default {
  initRoute() {
    const postChecking = [
      check('name').exists(),
      check('message').exists(),
      check('trace').exists()
    ];
    server.route('/errors')
    .post(postChecking, (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(new UnprocessableEntityException(errors.array()));
        return;
      }
      errorPost(req, res, next);
    })
    .get((req: Request, res: Response, next: NextFunction) => {
      errorFindAll(req, res, next);
    });
  }
}