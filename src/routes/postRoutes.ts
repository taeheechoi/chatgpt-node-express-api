import express from 'express';
import { createPost, getPosts, getPostsByUser } from '../controllers/postController';
import { authenticate } from '../middleware/authMiddleware';
import { apiLimiter } from '../middleware/rateLimiter';
import { validateRequest } from '../middleware/validateRequest';
import { createPostSchema } from '../validators/postSchemas';

const router = express.Router();

router.get('/',  authenticate, apiLimiter, getPosts);
router.post('/', authenticate, apiLimiter, validateRequest(createPostSchema), createPost);
router.get('/user', authenticate, apiLimiter, getPostsByUser); 

export default router;
