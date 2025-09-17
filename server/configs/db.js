import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB || undefined,
    });
    console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};