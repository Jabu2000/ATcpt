import jwt from "jsonwebtoken";
import User from "../models/User.js";

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    console.log("🟢 Register request body:", req.body);

    const { username, email, password, profilePicture } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      console.log("❌ Missing fields");
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log("⚠️ Email already in use");
      return res.status(409).json({ message: "Email already in use." });
    }

    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      username
    )}&background=AEFF53&color=000`;

    const user = await User.create({
      username,
      email,
      password,
      profilePicture: profilePicture?.trim() || fallbackAvatar,
    });

    console.log("✅ Created user:", user);

    const token = signToken(user._id);
    console.log("🔐 Token created");

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
        },
        message: "Registered successfully.",
      });
  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: "Server error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "Email and password required." });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials." });

    const token = signToken(user._id);
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          description: user.description,
        },
        message: "Logged in.",
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token", { ...cookieOptions, maxAge: 0 });
  res.status(200).json({ message: "Logged out." });
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  if (!user) return res.json({ user: null });
  res.json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      description: user.description,
    },
  });
};

// --- PATCH /api/auth/profile ---
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware
    const { username, description, profilePicture } = req.body;

    const updates = {};
    if (username !== undefined) updates.username = username.trim();
    if (description !== undefined) updates.description = description.trim();
    if (profilePicture !== undefined) updates.profilePicture = profilePicture;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated", user });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// --- POST /api/auth/upload-profile ---
export const uploadProfilePic = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const baseUrl = process.env.BASE_URL || "https://adventuretimecpt.onrender.com";
    const imageUrl = `${baseUrl}/uploads/profiles/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true }
    ).select("-password");

    if (!user) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile picture updated", user });
  } catch (err) {
    console.error("uploadProfilePic error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
