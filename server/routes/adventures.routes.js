import express from "express";
import Adventure from "../models/Adventure.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

// Save adventure (push to user saved list)
router.post("/save/:adventureId", requireAuth, async (req, res) => {
  const adv = await Adventure.findById(req.params.adventureId);
  if (!adv) return res.status(404).json({ message: "Adventure not found" });
  req.user.savedAdventures.push(adv._id);
  await req.user.save();
  res.json({ message: "Saved" });
});

// Get saved adventures
router.get("/saved", requireAuth, async (req, res) => {
  const adventures = await Adventure.find({ _id: { $in: req.user.savedAdventures } });
  res.json(adventures);
});

// Remove saved adventure
router.delete("/saved/:id", requireAuth, async (req, res) => {
  req.user.savedAdventures = req.user.savedAdventures.filter(a => a.toString() !== req.params.id);
  await req.user.save();
  res.json({ message: "Removed" });
});

export default router;