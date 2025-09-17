import express from "express";
import SavedItem from "../models/SavedItem.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Get saved items for current user
router.get("/", async (req, res) => {
  try {
    const items = await SavedItem.find({ userId: req.userId });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get saved items" });
  }
});

// Save an item
router.post("/", async (req, res) => {
  try {
    const { type, refId, details } = req.body;
    const existing = await SavedItem.findOne({ userId: req.userId, type, refId });
    if (existing) return res.status(400).json({ error: "Already saved" });

    const item = new SavedItem({ userId: req.userId, type, refId, details });
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save item" });
  }
});

// Remove an item
router.delete("/:type/:refId", async (req, res) => {
  try {
    const { type, refId } = req.params;
    await SavedItem.deleteOne({ userId: req.userId, type, refId });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove item" });
  }
});

export default router;