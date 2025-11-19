import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.routes.js";

const app = express();

// ---------- MIDDLEWARE ----------
app.use(express.json());
app.use(cookieParser());

// IMPORTANT FOR RENDER ↓
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// ---------- DATABASE ----------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error:", err));

// ---------- ROUTES ----------
app.use("/api/auth", authRoutes);

// ---------- START ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on " + PORT));