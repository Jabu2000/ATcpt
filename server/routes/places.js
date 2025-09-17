import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import Place from "../models/Places.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

["uploads/comments", "uploads/places"].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(
      null,
      file.fieldname === "images" ? "uploads/comments/" : "uploads/places/"
    ),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
router.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// router.get("/", async (req, res) => {
//   const { q, category } = req.query;
//   const filter = {};
//   if (category) filter.category = category;
//   if (q)
//     filter.$or = [
//       { name: new RegExp(q, "i") },
//       { cuisine: new RegExp(q, "i") },
//       { address: new RegExp(q, "i") },
//     ];
//   const places = await Place.find(filter).sort({
//     rating: -1,
//     createdAt: -1,
//   });
//   res.json(places);
// });

// GET /api/places?query=&type=
router.get("/", async (req, res) => {
  const { query, type } = req.query;
  const filter = {};
  if (type) filter.type = type;
  if (query) filter.name = { $regex: query, $options: "i" };
  try {
    const places = await Place.find(filter).sort({ rating: -1, createdAt: -1 });
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", protect, async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({ error: "Invalid ID" });

  const place = await Place.findById(req.params.id).populate({
    path: "comments",
    populate: { path: "user", select: "username profilePicture" },
  });

  if (!place)
    return res.status(404).json({ error: "Place not found" });

  place.openStatus = Place.prototype.getOpenStatus.call(place);

  // ✅ check if user has saved this place
  const isSaved = req.user?.savedItems?.some(
    (id) => id.toString() === place._id.toString()
  );

  res.json({ ...place.toObject(), isSaved });
});

router.post("/", upload.array("images", 5), async (req, res) => {
  const newPlace = new Place({
    ...req.body,
    images: req.files?.map((f) => `/uploads/places/${f.filename}`) || [],
  });
  await newPlace.save();
  res.json(newPlace);
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const updateData = { ...req.body };
  if (req.file) {
    updateData.images = updateData.images || [];
    updateData.images.push(`/uploads/places/${req.file.filename}`);
  }
  const updated = await Place.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );
  if (!updated) return res.status(404).json({ error: "Not found" });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  const deleted = await Place.findByIdAndDelete(req.params.id);
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

      const place = await Place.findById(id);
      if (!place)
        return res.status(404).json({ error: "Place not found" });

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

      place.comments.push(newComment);
      await place.save();

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

    const place = await Place.findById(id);
    if (!place)
      return res.status(404).json({ error: "Place not found" });

    const comment = place.comments.id(commentId);
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
    await place.save();

    res.json(place);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

export default router;
