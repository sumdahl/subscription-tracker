import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No or invalid token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: `Forbidden: ${
        error.name === "TokenExpiredError" ? "Token expired" : "Invalid token"
      }`,
    });
  }
};
