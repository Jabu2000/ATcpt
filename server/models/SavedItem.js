import mongoose from "mongoose";

const savedItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["restaurant", "activity", "store", "place", "event", "accommodation"], required: true },
  refId: { type: String, required: true },
  details: { type: Object },
}, { timestamps: true });

const SavedItem = mongoose.model("SavedItem", savedItemSchema);
export default SavedItem;