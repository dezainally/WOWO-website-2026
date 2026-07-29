import mongoose from 'mongoose';

/**
 * Connects Express Backend to MongoDB Database using Mongoose
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/wowo_studio');
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Non-fatal fallback for development preview if DB is offline
  }
};

export default connectDB;
