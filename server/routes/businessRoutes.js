import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Business from "../models/Business.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST /api/business/register
router.post("/register", async (req, res) => {
  try {
    const {
      businessName,
      location = "",
      contactNumber = "",
      description = "",
      operationHours = "",
      googleRating = null,
      category,
      email,
      password,
    } = req.body;

    if (!businessName || !email || !password || !category) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const existing = await Business.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);

    const business = await Business.create({
      businessName,
      location,
      contactNumber,
      description,
      operationHours,
      googleRating,
      category,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const safeBusiness = business.toObject();
    delete safeBusiness.password;

    res.status(201).json({ token, business: safeBusiness });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/business/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing credentials" });

    const business = await Business.findOne({ email });
    if (!business) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, business.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: business._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const safeBusiness = business.toObject();
    delete safeBusiness.password;

    res.json({ token, business: safeBusiness });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/business/me
router.get("/me", protect, async (req, res) => {
  try {
    const business = await Business.findById(req.user.id).select("-password");
    if (!business) return res.status(404).json({ message: "Business not found" });
    res.json(business);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /api/business/me
router.put("/me", protect, async (req, res) => {
  try {
    const allowedUpdates = [
      "businessName",
      "location",
      "contactNumber",
      "description",
      "operationHours",
      "googleRating",
      "category",
      "email",
      // do not allow raw password update here — create a separate route to change password if desired
    ];

    const updates = {};
    for (const key of allowedUpdates) {
      if (key in req.body) updates[key] = req.body[key];
    }

    const updated = await Business.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json(updated);
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;