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
    const { username, email, password, profilePicture } = req.body;

    if (!username?.trim() || !email?.trim() || !password?.trim()) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(409).json({ message: "Email already in use." });

    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      username
    )}&background=AEFF53&color=000`;

    const user = await User.create({
      username,
      email,
      password,
      profilePicture: profilePicture?.trim() || fallbackAvatar,
    });

    const token = signToken(user._id);
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
    console.error(err);
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

export const updateProfile = async (req, res) => {
  try {
    const { username, profilePicture } = req.body;

    const update = {};
    if (typeof username === "string") update.username = username;
    if (typeof profilePicture === "string")
      update.profilePicture = profilePicture;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { $set: update },
      { new: true, runValidators: true, select: "-password" }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        description: user.description,
      },
      message: "Profile updated",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const baseUrl =
      process.env.SERVER_URL || `http://localhost:${process.env.PORT || 4000}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    // if you use requireAuth, req.userId is available; otherwise pass userId in body
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: fileUrl },
      { new: true, select: "-password" }
    );

    res.json({
      profilePicture: fileUrl,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        description: user.description, 
      },
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};




// export const updateProfile = async (req, res) => {
//   try {
//     const { username, profilePicture } = req.body;
//     const update = {};
//     if (typeof username === "string") update.username = username;
//     if (typeof profilePicture === "string") update.profilePicture = profilePicture;

//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { $set: update },
//       { new: true, runValidators: true, select: "-password" }
//     );
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({ user: { id: user._id, username: user.username, email: user.email, profilePicture: user.profilePicture }, message: "Profile updated" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
