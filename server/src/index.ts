import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { router as apiRouter } from './routes';

const app = express();

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

const allowedOrigin = process.env.CORS_ORIGIN || true; // true -> reflect request origin in dev
app.use(cors({ origin: allowedOrigin as any, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api', apiRouter);

// 404 handler
app.use((req, res, _next) => {
  if (!res.headersSent) {
    res.status(404).json({ error: 'Not Found' });
  }
});

// Centralized error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(port, () => {
  console.log(`GOSID server listening on http://localhost:${port}`);
});

