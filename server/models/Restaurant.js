import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      username: { type: String },
      profilePicture: { type: String, default: "" },
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

const daySchema = new mongoose.Schema({
  open: { type: String },
  close: { type: String },
}, { _id: false });

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    cuisine: { type: String },
    images: [{ type: String }],
    rating: { type: Number, min: 0, max: 5 },

    category: {
      type: String,
      enum: [
        "restaurant",
        "coffee",
        "takeaway",
        "Breakfast / Brunch Places",
        "TikTok",
        "Dessert",
        "Buffer",
        "Hangout",
      ],
      required: true,
    },

    about: { type: String },
    website: { type: String },

    openingHours: {
      monday: { type: daySchema, default: {} },
      tuesday: { type: daySchema, default: {} },
      wednesday: { type: daySchema, default: {} },
      thursday: { type: daySchema, default: {} },
      friday: { type: daySchema, default: {} },
      saturday: { type: daySchema, default: {} },
      sunday: { type: daySchema, default: {} },
    },

    comments: [commentSchema],
  },
  { timestamps: true }
);

restaurantSchema.methods.getOpenStatus = function () {
  try {
    const now = new Date();
    // Use server locale; if you want specific tz handling use a lib like moment-timezone
    const currentDay = now
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();
    const hours = this.openingHours?.[currentDay];

    if (!hours || !hours.open || !hours.close) return "Closed today";

    const pad = (s) => (s.length === 4 ? "0" + s : s); // e.g. "9:00" -> "09:00"
    const currentTime = now.toTimeString().slice(0, 5); // "HH:mm"

    // Normalize strings to "HH:mm" if provided as "9:00" or "09:00"
    const open = hours.open.length <= 5 ? pad(hours.open) : hours.open;
    const close = hours.close.length <= 5 ? pad(hours.close) : hours.close;

    if (currentTime >= open && currentTime <= close) {
      return `Open now (closes at ${close})`;
    } else {
      return `Closed, opens at ${open}`;
    }
  } catch (err) {
    return "";
  }
};

export default mongoose.model("Restaurant", restaurantSchema);