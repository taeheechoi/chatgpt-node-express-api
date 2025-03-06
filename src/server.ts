import express from 'express';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import routes from './routes/routes';


const app = express();

app.use(express.json());
app.use('/api/auth', apiLimiter, routes);
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;