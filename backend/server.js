import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import exhibitionRoutes from './routes/exhibitionRoutes.js';
import bannerRoutes from './routes/bannerRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; padding: 60px 20px; background-color: #12100e; color: #ffffff; min-height: 100vh; box-sizing: border-box;">
      <h1 style="color: #b89851; font-size: 2.2rem; margin-bottom: 10px;">👑 WOWO Studio Luxury Couture API</h1>
      <p style="color: #dddddd; font-size: 1.1rem; max-width: 600px; margin: 0 auto 25px;">
        Backend REST API Server is <strong style="color: #28a745;">LIVE & ONLINE 🟢</strong> on Render!
      </p>
      <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
        <a href="/api/health" style="background-color: #b89851; color: #ffffff; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold;">📡 Healthcheck API</a>
        <a href="/api/products" style="background-color: #333; color: #b89851; border: 1px solid #b89851; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold;">🛍️ Products API</a>
        <a href="/api/exhibitions" style="background-color: #333; color: #b89851; border: 1px solid #b89851; padding: 10px 20px; border-radius: 20px; text-decoration: none; font-weight: bold;">📅 Exhibitions API</a>
      </div>
    </div>
  `);
});

// Base API Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'WOWO Studio Luxury Couture API',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/exhibitions', exhibitionRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 WOWO Studio Express Server running on port ${PORT}`);
  console.log(`📡 Healthcheck API: http://localhost:${PORT}/api/health`);
});
