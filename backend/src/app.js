import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { CLIENT_ORIGIN } from './config/constants.js';
import { getDbStatus } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

// Route imports
import dressesRouter from './routes/dresses.routes.js';
import appointmentsRouter from './routes/appointments.routes.js';
import inquiriesRouter from './routes/inquiries.routes.js';
import measurementsRouter from './routes/measurements.routes.js';
import atelierRouter from './routes/atelier.routes.js';

const app = express();

// Determine allowed CORS origins
const configuredOrigins = (CLIENT_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const allowedOrigins = new Set([
  ...configuredOrigins,
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5173'
]);

// Security & Parsing Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // 1. Allow non-browser requests (Render health checks, curl, Postman, server-to-server)
    if (!origin) {
      return callback(null, true);
    }

    const cleanOrigin = origin.replace(/\/+$/, '');

    // 2. Allow explicitly configured origins or local dev ports
    if (allowedOrigins.has(cleanOrigin)) {
      return callback(null, true);
    }

    // 3. Automatically allow all Vercel deployment domains (preview branches & production)
    if (/^https:\/\/([a-zA-Z0-9_-]+\.)*vercel\.app$/.test(cleanOrigin)) {
      return callback(null, true);
    }

    // 4. In development, allow any local origin
    if (process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }

    // 5. Reject other origins gracefully without throwing unhandled server error
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = getDbStatus();
  res.json({
    status: 'ok',
    service: 'Maison Solène Haute Couture API',
    time: new Date().toISOString(),
    uptime: process.uptime(),
    database: dbStatus
  });
});

// API Routes
app.use('/api/dresses', dressesRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/inquiries', inquiriesRouter);
app.use('/api/measurements', measurementsRouter);
app.use('/api/atelier', atelierRouter);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} not found.`
  });
});

// Global Error Handler
app.use(errorHandler);

export default app;
