import { createAdminUser, getHasAdminUser } from './../../entities/User/UserBusiness';
import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

router.post('/admin', (req: Request, res: Response, next: NextFunction) => {
  createAdminUser(req, res, next);
});

router.get('/admin', (req: Request, res: Response, next: NextFunction) => {
  getHasAdminUser(req, res, next);
});

export default router;