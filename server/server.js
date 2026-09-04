import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import { errorHandler } from './utils/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

import { sanitizeNoSql, securityHeaders } from './middleware/security.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Global Security Middleware
app.use(securityHeaders);

// Bulletproof CORS handler — normalizes trailing slashes to prevent Vercel/Render origin mismatches
const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/+$/, '');
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/+$/, '');
    if (cleanOrigin === clientUrl || cleanOrigin.endsWith('.vercel.app') || cleanOrigin.includes('localhost')) {
      return callback(null, origin);
    }
    return callback(null, origin);
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeNoSql);
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api', apiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'GDC Adilpur API is running', timestamp: new Date().toISOString() });
});

// Global error handler
app.use(errorHandler);

// ──────────── Production: Serve Client Build ────────────
if (process.env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '..', 'client', 'dist');
  app.use(express.static(clientDist));

  // SPA fallback — all non-API routes serve index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

import { startKeepAlive } from './utils/keepAlive.js';

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  // Start Keep-Alive Ping Service (6 AM - 10 PM PKT, every 14 mins)
  startKeepAlive();
});

export default app;
