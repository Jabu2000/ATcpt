import express from "express";
import multer from "multer";
import path from "path";
import Post from "../models/Post.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();


// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/posts"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// CREATE POST
router.post("/", protect, upload.array("images", 10), async (req, res) => {
  try {
    const { content, hashtags } = req.body;
    if (!content) return res.status(400).json({ message: "Content is required" });

    // Map multiple images
    const imagePaths = req.files
      ? req.files.map(
          (file) =>
            `${process.env.SERVER_URL || "http://localhost:4000"}/uploads/posts/${file.filename}`
        )
      : [];

    const newPost = new Post({
      content,
      hashtags: hashtags ? hashtags.split(",").map((tag) => tag.trim()) : [],
      userId: req.user._id,
      images: imagePaths,
    });

    const savedPost = await newPost.save();
    await savedPost.populate("userId", "username profilePicture");
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username profilePicture")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET USER POSTS
router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId })
      .populate("userId", "username profilePicture")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE POST
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    if (post.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ error: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted successfully", postId: req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ADD COMMENT
router.post("/:id/comment", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({ ...req.body, userId: req.user._id });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE COMMENT
router.delete("/:postId/comment/:commentId", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.comments = post.comments.filter((c) => c._id.toString() !== req.params.commentId);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;