// import Activity from "../models/Activity.js";
import User from "../models/User.js";

// Save activity
export const saveActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const activityId = req.params.id;

    const user = await User.findById(userId);

    if (!user.savedActivities.includes(activityId)) {
      user.savedActivities.push(activityId);
      await user.save();
    }

    return res.json({ success: true, message: "Activity saved ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving activity" });
  }
};

// Unsave activity
export const unsaveActivity = async (req, res) => {
  try {
    const userId = req.user._id;
    const activityId = req.params.id;

    await User.findByIdAndUpdate(userId, {
      $pull: { savedActivities: activityId },
    });

    return res.json({ success: true, message: "Activity removed ❌" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error removing activity" });
  }
};