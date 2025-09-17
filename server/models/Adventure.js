import mongoose from "mongoose";

const adventureSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  destination: { type: String, required: true },
  selectedDestination: { type: Object },
  date: { type: String, required: true },
  images: { type: String },
  rating: { type: String }
}, { timestamps: true });

export default mongoose.model("Adventure", adventureSchema);