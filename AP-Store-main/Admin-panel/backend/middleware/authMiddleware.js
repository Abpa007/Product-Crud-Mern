import jwt from "jsonwebtoken";
import userModel from "../model/userModel/userModel.js";

// Verify JWT token and attach user info
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = { id: decoded.id, isAdmin: decoded.isAdmin };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

// Check if user is admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error during admin check." });
  }
};
