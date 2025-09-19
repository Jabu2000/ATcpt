import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function requireAuth(req, res, next) {
  const token =
    req.cookies?.token ||
    (req.headers.authorization?.startsWith("Bearer") &&
      req.headers.authorization.split(" ")[1]);

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Normalize userId across app
    req.userId = decoded.userId || decoded.id || decoded._id;

    // Attach minimal user info if needed
    req.user = await User.findById(req.userId).select("_id email");
    if (!req.user) return res.status(401).json({ message: "User not found" });

    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
}

function ensureApiAuth(req, res, next) {
  if (!req.user) {
    // do NOT redirect to '/login' here; return JSON for API routes:
    return res.status(401).json({ msg: "Not authenticated" });
  }
  next();
}

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Simple verifyToken that sets req.userId (no DB lookup)
export const verifyToken = (req, res, next) => {
  try {
    const token =
      req.cookies?.token || (req.headers.authorization?.startsWith("Bearer") && req.headers.authorization.split(" ")[1]);

    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, JWT_SECRET);
    // Expect payload shape: { userId: ... }
    req.userId = decoded.userId || decoded.id || decoded._id;
    return next();
  } catch (err) {
    console.error("verifyToken error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// protect middleware that attaches full user doc to req.user
export const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.userId || decoded.id || decoded._id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.userId = user._id.toString();
    req.user = user;
    next();
  } catch (err) {
    console.error("protect error:", err);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};