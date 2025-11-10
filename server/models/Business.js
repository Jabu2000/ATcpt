import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const businessSchema = new mongoose.Schema(
  {
    businessName: { type: String, required: true },
    location: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
    description: { type: String, default: "" },
    operationHours: { type: String, default: "" },
    googleRating: { type: Number, default: null },
    category: {
      type: String,
      enum: ["restaurant", "store", "event", "activity"],
      required: true,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: "" },
  },
  { timestamps: true }
);

// Hash password before save
businessSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare passwords
businessSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Business = mongoose.model("Business", businessSchema);
export default Business;