import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/athena_library';
  try {
    const conn = await mongoose.connect(uri);
    console.log(`[MongoDB Connected] Host: ${conn.connection.host} / Database: ${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to ${uri}: ${error.message}`);
    console.warn(`[Note] Athena will run with resilient fallback mode. Configure MONGO_URI in .env when Atlas or local Mongo is ready.`);
    return false;
  }
}
