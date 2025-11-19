import express from "express";
import { requireAuth } from "../middlewares/auth.js";
import User from "../models/User.js";
import Adventure from "../models/Adventure.js";

const router = express.Router();

// GET SAVED ADVENTURES
router.get("/saved", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("savedAdventures");
    res.json(user.savedAdventures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// REMOVE SAVED ADVENTURE
router.delete("/saved/:adventureId", requireAuth, async (req, res) => {
  try {
    const { adventureId } = req.params;
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedAdventures: adventureId },
    });
    res.json({ message: "Removed from saved adventures" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// OPTIONAL: ADD TO SAVED
router.post("/save/:adventureId", requireAuth, async (req, res) => {
  try {
    const { adventureId } = req.params;
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { savedAdventures: adventureId },
    });
    res.json({ message: "Adventure saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;