import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET all saved items
router.get("/", protect, async (req, res) => {
  const user = await User.findById(req.userId).populate("savedItems");
  res.json(user.savedItems);
});

// Save restaurant
router.post("/", protect, async (req, res) => {
  const { type, refId } = req.body;

  if (type !== "restaurant")
    return res.status(400).json({ message: "Invalid save type" });

  const user = await User.findById(req.userId);

  if (!user.savedItems.includes(refId)) {
    user.savedItems.push(refId);
    await user.save();
  }

  res.json({ savedItems: user.savedItems });
});

// Remove saved restaurant
router.delete("/:type/:refId", protect, async (req, res) => {
  const { type, refId } = req.params;

  if (type !== "restaurant")
    return res.status(400).json({ message: "Invalid type" });

  const user = await User.findById(req.userId);

  user.savedItems = user.savedItems.filter(
    (item) => item.toString() !== refId.toString()
  );

  await user.save();

  res.json({ savedItems: user.savedItems });
});

export default router;