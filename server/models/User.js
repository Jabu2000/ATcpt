import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  description: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  savedAdventures: [{ type: mongoose.Schema.Types.ObjectId, ref: "Adventure" }],
}, { timestamps: true });

export default mongoose.model("User", userSchema);