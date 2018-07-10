import { Request, Response, NextFunction, Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import { errorPost, errorFindAll } from '../../entities/Error/ErrorBusiness'

import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

const router = Router();

const postChecking = [
  check('name').exists(),
  check('message').exists(),
  check('trace').exists()
];

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  errorFindAll(req, res, next);
});

router.post('/', postChecking, (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new UnprocessableEntityException(errors.array()));
    return;
  }
  errorPost(req, res, next);
});

export default router;