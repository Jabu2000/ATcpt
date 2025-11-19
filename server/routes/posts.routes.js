import express from "express";
import Post from "../models/Post.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

// Get posts by user
router.get("/user/:id", requireAuth, async (req, res) => {
  const posts = await Post.find({ user: req.params.id }).sort({ createdAt: -1 });
  res.json(posts);
});

// Create post
router.post("/", requireAuth, async (req, res) => {
  const { caption, image } = req.body;
  const post = await Post.create({ user: req.user._id, caption, image });
  res.status(201).json(post);
});

// Delete post
router.delete("/:id", requireAuth, async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;