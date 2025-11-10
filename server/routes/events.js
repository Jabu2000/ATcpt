import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import Event from "../models/Event.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

["uploads/comments", "uploads/events"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(
      null,
      file.fieldname === "images" ? "uploads/comments/" : "uploads/events/"
    ),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
router.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// GET /api/events?query=&category=
router.get("/", async (req, res) => {
  const { query, category } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (query) {
    filter.$or = [
      { name: { $regex: query, $options: "i" } },
      { cuisine: { $regex: query, $options: "i" } },
      { address: { $regex: query, $options: "i" } },
    ];
  }
  try {
    const events = await Event.find(filter).sort({ rating: -1, createdAt: -1 });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", protect, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  const event = await Event.findById(req.params.id).populate({
    path: "comments",
    populate: { path: "user", select: "username profilePicture" },
  });

  if (!event)
    return res.status(404).json({ error: "Event not found" });

  event.openStatus = Event.prototype.getOpenStatus.call(event);

  // ✅ check if user has saved this event
  const isSaved = req.user?.savedItems?.some(
    (id) => id.toString() === event._id.toString()
  );

  res.json({ ...event.toObject(), isSaved });
});

router.post("/", upload.array("images", 5), async (req, res) => {
  const newEvent = new Event({
    ...req.body,
    images: req.files?.map((f) => `/uploads/events/${f.filename}`) || [],
  });
  await newEvent.save();
  res.json(newEvent);
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.images = updateData.images || [];
    updateData.images.push(`/uploads/events/${req.file.filename}`);
  }
  const updated = await Event.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await Event.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted successfully" });
});

router.post(
  "/:id/comment",
  protect,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { text, ratings } = req.body;

      const event = await Event.findById(id);
      if (!event)
        return res.status(404).json({ error: "Event not found" });

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

      event.comments.push(newComment);
      await event.save();

      // Return only the new comment
      res.status(201).json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add comment" });
    }
  }
);

// ---------------- DELETE COMMENT ----------------
router.delete("/:id/comment/:commentId", protect, async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const event = await Event.findById(id);
    if (!event)
      return res.status(404).json({ error: "Event not found" });

    const comment = event.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // Ensure only owner or admin can delete
    if (
      comment.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this comment" });
    }

    comment.deleteOne();
    await event.save();

    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

export default router;
