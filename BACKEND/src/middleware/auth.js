// BACKEND/src/middleware/auth.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Authentication required" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Only select valid fields
    const user = await User.findById(decoded.id).select("-password");

    if (!user)
      return res.status(401).json({ message: "Invalid token" });

    req.user = { id: user._id, role: user.role }; // FIXED

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}
