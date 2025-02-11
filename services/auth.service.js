import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import { redisClient } from "./redis.service.js";

export const createUser = async (username, email, password) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists.");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ username, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    await session.commitTransaction();
    session.endSession();
    return { user: newUsers[0], token };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    const error = new Error("Invalid password.");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
  return { token, user };
};

export const logOutUser = async (token) => {
  const decoded = jwt.decode(token);
  if (!decoded) throw new Error("Invalid token");

  //ensures at least 1 seconds expiry
  const expiresIn = Math.max(1, decoded.exp - Math.floor(Date.now() / 1000));
  if (expiresIn < 0) {
    console.log("Expire date should be positive.");
  }

  await redisClient.set(token, "blacklisted", "EX", expiresIn);

  return true;
};
