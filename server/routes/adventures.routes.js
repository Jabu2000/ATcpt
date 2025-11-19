import express from "express";
import Adventure from "../models/Adventure.js";
import User from "../models/User.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

// --- Get saved adventures ---
router.get("/saved", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedAdventures");
    res.json(user.savedAdventures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load saved adventures" });
  }
});

// --- Add adventure to saved ---
router.post("/saved/:adventureId", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user.savedAdventures.includes(req.params.adventureId)) {
      user.savedAdventures.push(req.params.adventureId);
      await user.save();
    }
    res.json(user.savedAdventures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save adventure" });
  }
});

// --- Remove adventure from saved ---
router.delete("/saved/:adventureId", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.savedAdventures = user.savedAdventures.filter(
      (id) => id.toString() !== req.params.adventureId
    );
    await user.save();
    res.json({ message: "Removed from saved adventures" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to remove adventure" });
  }
});

export default router;