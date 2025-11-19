import mongoose from "mongoose";

const adventureSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  image: String,
}, { timestamps: true });

export default mongoose.model("Adventure", adventureSchema);