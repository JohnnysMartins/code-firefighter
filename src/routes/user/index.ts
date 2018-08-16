import { check, validationResult } from 'express-validator/check';
import { createAdminUser, getAdminUser, changeAdminPassword } from './../../entities/User/UserBusiness';
import { Request, Response, NextFunction, Router } from 'express';
import UnprocessableEntityException from '../../shared/exceptions/UnprocessableEntityException';

const router = Router();

router.post('/admin', (req: Request, res: Response, next: NextFunction) => {
  createAdminUser(req, res, next);
});

router.get('/admin', (req: Request, res: Response, next: NextFunction) => {
  getAdminUser(req, res, next);
});

const patchAdminChecks = [
  check('password').exists()
];
router.patch('/admin', patchAdminChecks, (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    next(new UnprocessableEntityException(errors.array()));
    return;
  }
  changeAdminPassword(req, res, next);
});

export default router;