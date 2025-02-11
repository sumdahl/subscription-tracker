import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { redisClient } from "../services/redis.service.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No or invalid token provided",
      });
    }

    const token = authHeader.split(" ")[1];
    //console.log("Token:", token); // Log the token

    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted !== null) {
      return res.status(403).json({
        success: false,
        message: "Token is invalid or user already logged out.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    //console.log("Decoded JWT:", decoded); // Log the decoded token

    // Check if the decoded token contains the user ID
    if (!decoded || !decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication required.",
      });
    }

    req.user = decoded; // Set req.user to the decoded token
    next();
  } catch (error) {
    console.error("JWT verification error:", error); // Log the error
    return res.status(403).json({
      success: false,
      message: `Forbidden: ${
        error.name === "TokenExpiredError" ? "Token expired" : "Invalid token"
      }`,
    });
  }
};
