import express from "express";
import Adventure from "../models/Adventure.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get all adventures for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const adventures = await Adventure.find({ user: req.user._id });
    res.json(adventures);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch adventures" });
  }
});

// Create adventure
router.post("/", protect, async (req, res) => {
  try {
    const adventure = await Adventure.create({
      ...req.body,
      user: req.user._id, // attach logged-in user
    });
    res.json(adventure);
  } catch (err) {
    res.status(400).json({ error: "Failed to create adventure" });
  }
});

// Edit adventure
router.put("/:id", protect, async (req, res) => {
  try {
    const adventure = await Adventure.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!adventure) return res.status(404).json({ error: "Not found" });
    res.json(adventure);
  } catch (err) {
    res.status(400).json({ error: "Failed to update adventure" });
  }
});

// Delete adventure
router.delete("/:id", protect, async (req, res) => {
  try {
    await Adventure.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ msg: "Adventure deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete adventure" });
  }
});

export default router;