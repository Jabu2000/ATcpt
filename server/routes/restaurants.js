import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.js";
import { protect } from "../middleware/auth.middleware.js"; // keep for protected routes

const router = express.Router();

// Ensure upload folders exist
["uploads/comments", "uploads/restaurants"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // file.fieldname will be 'restaurantImages' or 'commentImages'
    const dest =
      file.fieldname === "commentImages"
        ? "uploads/comments/"
        : "uploads/restaurants/";
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// If you want to serve uploads from this router path (optional if served globally)
router.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// GET /api/restaurants?q=&category=
router.get("/", async (req, res) => {
  try {
    const { q, category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (q)
      filter.$or = [
        { name: new RegExp(q, "i") },
        { cuisine: new RegExp(q, "i") },
        { address: new RegExp(q, "i") },
      ];
    const restaurants = await Restaurant.find(filter).sort({
      rating: -1,
      createdAt: -1,
    });
    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// GET /api/restaurants/:id  (PUBLIC: removed `protect`)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid ID" });

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    // compute openStatus
    restaurant.openStatus = restaurant.getOpenStatus
      ? restaurant.getOpenStatus()
      : "";

    // If req.user exists (e.g. your auth middleware ran earlier), compute isSaved
    let isSaved = false;
    if (req.user && Array.isArray(req.user.savedItems)) {
      isSaved = req.user.savedItems.some(
        (sid) => sid.toString() === restaurant._id.toString()
      );
    }

    res.json({ ...restaurant.toObject(), isSaved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch restaurant" });
  }
});

// Create restaurant (example) - expects fieldname 'restaurantImages'
router.post("/", upload.array("restaurantImages", 10), async (req, res) => {
  try {
    const newRestaurant = new Restaurant({
      ...req.body,
      images: req.files?.map((f) => `/uploads/restaurants/${f.filename}`) || [],
    });
    await newRestaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create restaurant" });
  }
});

// Update restaurant - single image example (field 'restaurantImage')
router.put("/:id", upload.single("restaurantImage"), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.images = updateData.images || [];
      updateData.images.push(`/uploads/restaurants/${req.file.filename}`);
    }
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update restaurant" });
  }
});

// Delete restaurant
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete restaurant" });
  }
});

// POST comment - protected. Uses fieldname 'commentImages'
router.post(
  "/:id/comment",
  protect,
  upload.array("commentImages", 5),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { text, ratings } = req.body;

      const restaurant = await Restaurant.findById(id);
      if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

      const newComment = {
        user: {
          _id: req.user._id,
          username: req.user.username,
          profilePicture: req.user.profilePicture || "",
        },
        text,
        ratings: ratings ? JSON.parse(ratings) : {},
        images: req.files
          ? req.files.map((f) => `/uploads/comments/${f.filename}`)
          : [],
      };

      restaurant.comments.unshift(newComment); // newest first
      await restaurant.save();

      // Return the created comment (with its generated _id & timestamps)
      res.status(201).json(restaurant.comments[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add comment" });
    }
  }
);

// DELETE comment - protected
router.delete("/:id/comment/:commentId", protect, async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });

    const comment = restaurant.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // Ensure only owner or admin can delete
    if (
      comment.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    // remove comment
    comment.remove();
    await restaurant.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

export default router;