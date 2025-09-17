import { Router } from "express";
import { register, login, logout, me, updateProfile, uploadProfilePic } from "../controllers/auth.controller.js";

import upload from "../middleware/upload.js";
import requireAuth from "../middleware/auth.middleware.js";

const router = Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", requireAuth, me);

// Upload profile picture (protected)
router.post("/upload-profile", requireAuth, upload.single("profilePic"), uploadProfilePic);

// Update username/profilePicture manually (protected)
router.patch("/profile", requireAuth, updateProfile);

export default router;