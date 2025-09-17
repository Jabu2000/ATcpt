import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  images: [String],
  ratings: {
    food: { type: Number, default: 0 },
    service: { type: Number, default: 0 },
    vibes: { type: Number, default: 0 },
    overall: { type: Number, default: 0 },
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activity: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", commentSchema);
