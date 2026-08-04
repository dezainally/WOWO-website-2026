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
