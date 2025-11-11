import jwt from "jsonwebtoken";
import fs from "fs";
import Business from "../models/Business.js";

const signToken = (businessId) =>
  jwt.sign({ businessId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req, res) => {
  try {
    const {
      businessName,
      location,
      contactNumber,
      description,
      operationHours,
      googleRating,
      category,
      email,
      password,
      profilePicture,
    } = req.body;

    if (!businessName?.trim() || !email?.trim() || !password?.trim() || !category?.trim()) {
      return res.status(400).json({ message: "All required fields must be filled." });
    }

    const existing = await Business.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use." });

    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
      businessName
    )}&background=AEFF53&color=000`;

    const business = await Business.create({
      businessName,
      location,
      contactNumber,
      description,
      operationHours,
      googleRating,
      category,
      email,
      password,
      profilePicture: profilePicture?.trim() || fallbackAvatar,
    });

    const token = signToken(business._id);

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        business: {
          id: business._id,
          businessName: business.businessName,
          location: business.location,
          contactNumber: business.contactNumber,
          description: business.description,
          operationHours: business.operationHours,
          googleRating: business.googleRating,
          category: business.category,
          email: business.email,
          profilePicture: business.profilePicture,
        },
        token,
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
    if (!email?.trim() || !password?.trim())
      return res.status(400).json({ message: "Email and password required." });

    const business = await Business.findOne({ email });
    if (!business) return res.status(401).json({ message: "Invalid credentials." });

    const isMatch = await business.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = signToken(business._id);
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        business: {
          id: business._id,
          businessName: business.businessName,
          email: business.email,
          profilePicture: business.profilePicture,
          description: business.description,
        },
        token,
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
  try {
    const business = await Business.findById(req.businessId).select("-password");
    if (!business) return res.json({ business: null });

    res.json({ business });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const businessId = req.businessId;
    const {
      businessName,
      description,
      location,
      contactNumber,
      operationHours,
      googleRating,
      category,
      email,
      profilePicture,
    } = req.body;

    const updates = {};
    if (businessName) updates.businessName = businessName.trim();
    if (description) updates.description = description.trim();
    if (location) updates.location = location.trim();
    if (contactNumber) updates.contactNumber = contactNumber.trim();
    if (operationHours) updates.operationHours = operationHours.trim();
    if (googleRating) updates.googleRating = googleRating;
    if (category) updates.category = category.trim();
    if (email) updates.email = email.trim();
    if (profilePicture) updates.profilePicture = profilePicture.trim();

    const business = await Business.findByIdAndUpdate(
      businessId,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!business) return res.status(404).json({ message: "Business not found" });

    res.json({ message: "Profile updated", business });
  } catch (err) {
    console.error("updateProfile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const uploadProfilePic = async (req, res) => {
  try {
    const businessId = req.businessId;

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const baseUrl = process.env.BASE_URL || "https://adventuretimecpt.onrender.com";
    const imageUrl = `${baseUrl}/uploads/profiles/${req.file.filename}`;

    const business = await Business.findByIdAndUpdate(
      businessId,
      { profilePicture: imageUrl },
      { new: true }
    ).select("-password");

    if (!business) {
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "Business not found" });
    }

    res.json({ message: "Profile picture updated", business });
  } catch (err) {
    console.error("uploadProfilePic error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
