import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateRequest } from '../middleware/validateRequest';
import { loginSchema, refreshTokenSchema, registerSchema, resetPasswordRequestSchema, resetPasswordSchema } from '../validators/authSchemas';

const router = Router();

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/refresh', validateRequest(refreshTokenSchema), authController.refresh);
router.post('/reset-password-request', validateRequest(resetPasswordRequestSchema), authController.resetPasswordRequest);
router.post('/reset-password', validateRequest(resetPasswordSchema), authController.resetPassword);


export default router;