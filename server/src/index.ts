import cors from 'cors';
import express from 'express';
import { config } from './config/env';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(config.port, () => {
  console.log(`🚀 API running on http://localhost:${config.port}`);
});
