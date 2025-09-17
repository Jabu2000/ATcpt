import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import Activity from "../models/Activities.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// --- Ensure folders ---
["uploads/comments", "uploads/activities"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// --- Multer ---
const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(
      null,
      file.fieldname === "images" ? "uploads/comments/" : "uploads/activities/"
    ),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// --- Serve uploads ---
router.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// --- CRUD ---
router.get("/", async (req, res) => {
  const { q, category } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (q)
    filter.$or = [
      { name: new RegExp(q, "i") },
      { cuisine: new RegExp(q, "i") },
      { address: new RegExp(q, "i") },
    ];
  const activities = await Activity.find(filter).sort({
    rating: -1,
    createdAt: -1,
  });
  res.json(activities);
});

router.get("/:id", protect, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  const activity = await Activity.findById(req.params.id).populate({
    path: "comments",
    populate: { path: "user", select: "username profilePicture" },
  });
  if (!activity) return res.status(404).json({ error: "Activity not found" });

  activity.openStatus = Activity.prototype.getOpenStatus.call(activity);

  const isSaved = req.user?.savedItems?.some(
    (id) => id.toString() === activity._id.toString()
  );

  res.json({ ...activity.toObject(), isSaved });
});

router.post("/", upload.array("images", 5), async (req, res) => {
  const newActivity = new Activity({
    ...req.body,
    images: req.files?.map((f) => `/uploads/activities/${f.filename}`) || [],
  });
  await newActivity.save();
  res.json(newActivity);
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.images = updateData.images || [];
    updateData.images.push(`/uploads/activities/${req.file.filename}`);
  }
  const updated = await Activity.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await Activity.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted successfully" });
});

// --- Comments ---
router.post(
  "/:id/comment",
  protect,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { text, ratings } = req.body;

      const activity = await Activity.findById(id);
      if (!activity)
        return res.status(404).json({ error: "Activity not found" });

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

      activity.comments.unshift(newComment);
      await activity.save();

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

    const activity = await Activity.findById(id);
    if (!activity) return res.status(404).json({ error: "Activity not found" });

    const comment = activity.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    // Ensure only owner or admin can delete
    // if (
    //   comment.user._id.toString() !== req.user._id.toString() &&
    //   !req.user.isAdmin
    // ) {
    //   return res
    //     .status(403)
    //     .json({ error: "Not authorized to delete this comment" });
    // }
    if (!comment.user._id.equals(req.user._id) && !req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this comment" });
    }

    comment.deleteOne();
    await activity.save();

    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

export default router;
