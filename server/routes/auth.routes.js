import { Router } from "express";
import { register, login, logout, me, updateProfile, uploadProfilePic } from "../controllers/auth.controller.js";

import upload from "../middleware/upload.js";
import protect from "../middleware/auth.middleware.js";

const router = Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, me);

// Upload profile picture (protected)
router.post("/upload-profile", protect, upload.single("profilePic"), uploadProfilePic);

// Update username/profilePicture manually (protected)
router.patch("/profile", protect, updateProfile);

export default router;