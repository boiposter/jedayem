require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const { initDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDB();

// ===== SECURITY MIDDLEWARE =====

// Helmet — sets various HTTP security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com", "https://cdn.jsdelivr.net"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdnjs.cloudflare.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  },
  crossOriginEmbedderPolicy: false,
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  xContentTypeOptions: true,
  xFrameOptions: { action: 'deny' }
}));

// Rate limiting — global
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'طلبات كثيرة، حاول بعد شوي' },
  standardHeaders: true,
  legacyHeaders: false
});
app.use(globalLimiter);

// Auth-specific rate limiter (stricter)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: 'محاولات كثيرة، حاول بعد ١٥ دقيقة' },
  standardHeaders: true,
  legacyHeaders: false
});

// CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://jedayem.com' : '*',
  credentials: true
}));

// HPP — HTTP Parameter Pollution protection
app.use(hpp());

// Body parsing with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true
}));

// ===== ROUTES =====
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api', apiRoutes);

// Serve HTML pages
const pages = ['index', 'odds', 'live', 'account', 'faq'];
pages.forEach(page => {
  const route = page === 'index' ? '/' : `/${page}`;
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, 'views', `${page}.html`));
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'صار خطأ في السيرفر' });
});

app.listen(PORT, () => {
  console.log(`🏟️  Jedayem running on http://localhost:${PORT}`);
});

module.exports = app;
