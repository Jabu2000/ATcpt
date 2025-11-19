import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./configs/db.js";

import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/posts.routes.js";
import adventureRoutes from "./routes/adventures.routes.js";

dotenv.config();
const app = express();

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// IMPORTANT FOR RENDER ↓
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5000",
  "https://adventuretimecpt.onrender.com", // your render backend origin (if needed for internal)
  "https://adventuretimecpt-mltm.onrender.com", // <-- HOSTINGER frontend domain (you provided)
];

// CORS with credentials support
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ---------- DATABASE ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

// Connect MongoDB
connectDB();

// ---------- ROUTES ----------
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/adventures", adventureRoutes);
// ---------- START ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));
