import { updateConfiguration, getConfiguration } from '../../entities/Configuration/ConfigurationBusiness';
import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator/check';

import server from '../../shared/server';

import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

export default {
  initRoute() {
    const postChecking = [
      check('permissions').exists(),
    ];
    server.route('/configuration')
    .post(postChecking, (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(new UnprocessableEntityException(errors.array()));
        return;
      }
      updateConfiguration(req, res, next, req.body);
    })
    .get((req: Request, res: Response, next: NextFunction) => {
      getConfiguration(req, res, next);
    });
  }
}