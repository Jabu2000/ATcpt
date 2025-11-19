import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// -------- REGISTER --------
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashed,
    });

    return res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err });
  }
});

// -------- LOGIN --------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.json({
      message: "Logged in",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// -------- VERIFY --------
router.get("/verify", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(null);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    res.json(user);
  } catch (err) {
    res.json(null);
  }
});

// -------- LOGOUT --------
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.json({ message: "Logged out" });
});

// -------- DELETE ACCOUNT --------
router.delete("/delete", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(400).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await User.findByIdAndDelete(decoded.id);

    res.clearCookie("token", {
      secure: true,
      sameSite: "none",
      path: "/",
    });

    res.json({ message: "Account deleted" });
  } catch (err) {
    res.status(400).json({ message: "Server error" });
  }
});

export default router;