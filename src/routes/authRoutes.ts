import { Router } from 'express';
import { login, refresh, register, resetPassword, resetPasswordRequest } from '../controllers/authController';
import { validateRequest } from '../middleware/validateRequest';
import { loginSchema, refreshTokenSchema, registerSchema, resetPasswordRequestSchema, resetPasswordSchema } from '../validators/authSchemas';

const router = Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh', validateRequest(refreshTokenSchema), refresh);
router.post('/reset-password-request', validateRequest(resetPasswordRequestSchema), resetPasswordRequest);
router.post('/reset-password', validateRequest(resetPasswordSchema), resetPassword);


export default router;