import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { connectDB } from "./configs/db.js";

// Routes
import authRoutes from "./routes/auth.routes.js";
import restaurantRoutes from "./routes/restaurants.js";
import activityRoutes from "./routes/activities.js";
import postRoutes from "./routes/createpostRoutes.js";
import savedRoutes from "./routes/savedRoutes.js";
import storeRoutes from "./routes/stores.js";
import eventRoutes from "./routes/events.js";
import adventureRoutes from "./routes/adventures.js";
import businessRoutes from "./routes/businessRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://adventuretimecpt-mltm.onrender.com"
    ],
  credentials: true
}));

// Ensure uploads folders exist
const uploadsDir = path.join(process.cwd(), "uploads");
const dirs = [
  "posts",
  "restaurants",
  "activities",
  "comments",
  "stores",
  "events",
  "profiles", // ✅ fixed to plural
];
dirs.forEach((d) => {
  const dirPath = path.join(uploadsDir, d);
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
});


// Serve uploads folder
app.use("/uploads", express.static(uploadsDir));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/saved", savedRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/adventures", adventureRoutes);
app.use("/api/businesses", businessRoutes);


// Root
app.get("/", (_req, res) => res.send("API running"));

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: "Server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
