import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: String,
      profilePicture: String,
    },
    text: { type: String, required: true },
    ratings: {
      food: { type: Number, default: 0 },
      service: { type: Number, default: 0 },
      vibes: { type: Number, default: 0 },
      overall: { type: Number, default: 0 },
    },
    images: [{ type: String }], // stored as URLs/paths
  },
  { timestamps: true }
);

const activitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    cuisine: { type: String },
    images: [{ type: String }],
    rating: { type: Number, min: 0, max: 5 },

    category: {
      type: String,
      enum: ["IndoorActivities", "OutdoorActivities", "Adventure", "Relaxation", "Cultural", "Friends"],
      required: true,
    },

    // 🆕 About section
    about: { type: String },

    // 🆕 Website / link
    website: { type: String },

    // 🆕 Opening hours (per day)
    openingHours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

activitySchema.methods.getOpenStatus = function () {
  const now = new Date();
  const currentDay = now.toLocaleString("en-US", { weekday: "long" }).toLowerCase();
  const currentTime = now.toTimeString().slice(0, 5); // "HH:mm"

  const todaySchedule = this.openingHours?.[currentDay];
  if (!todaySchedule) return "Closed today";

  const { open, close } = todaySchedule;

  if (currentTime >= open && currentTime <= close) {
    return `Open now (closes at ${close})`;
  } else {
    return `Closed, opens at ${open}`;
  }
};

export default mongoose.model("Activities", activitySchema);