import { Request, Response, NextFunction, Router } from 'express';
import { updateConfiguration, getConfiguration } from '../../entities/Configuration/ConfigurationBusiness';
import { check, validationResult } from 'express-validator/check';

import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

const router = Router();

const postChecking = [
  check('permissions').exists(),
];

router.post('/', postChecking, (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new UnprocessableEntityException(errors.array()));
    return;
  }
  updateConfiguration(req, res, next, req.body);
});

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  getConfiguration(req, res, next);
});

export default router;