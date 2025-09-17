import express from "express";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";
import requireAuth from "../middleware/auth.middleware.js";

const router = express.Router();

// Save adventure
router.post("/save/:type/:id", requireAuth, async (req, res) => {
  const { type, id } = req.params;
  const user = await User.findById(req.user.id);

  // Prevent duplicates
  const exists = user.savedAdventures.some(
    (a) => a.type === type && a.refId.toString() === id
  );
  if (!exists) {
    user.savedAdventures.push({ type, refId: id });
    await user.save();
  }

  res.json({ success: true });
});

// Remove adventure
router.delete("/save/:type/:id", requireAuth, async (req, res) => {
  const { type, id } = req.params;
  const user = await User.findById(req.user.id);

  user.savedAdventures = user.savedAdventures.filter(
    (item) => !(item.type === type && item.refId.toString() === id)
  );

  await user.save();
  res.json({ success: true });
});

// Get saved adventures with populated details
router.get("/saved", requireAuth, async (req, res) => {
  const user = await User.findById(req.user.id);

  const populated = await Promise.all(
    user.savedAdventures.map(async (item) => {
      let details = null;
      if (item.type === "restaurant", "activity", "store", "place") {
        details = await Restaurant.findById(item.refId).lean();
      }
      return { ...item.toObject(), details };
    })
  );

  res.json(populated);
});

export default router;