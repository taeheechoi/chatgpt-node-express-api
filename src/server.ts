import express from 'express';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import routes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';


const app = express();

app.use(express.json());
app.use('/api/auth', apiLimiter, routes);
app.use('/api/posts', apiLimiter, postRoutes); 
app.use(errorHandler);

const PORT = config.port;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
export { server };

