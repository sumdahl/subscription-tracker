import User from "../models/user.model.js";

export const getUserService = async () => {
  const users = await User.find();
  return { users };
};

export const getUserByIdService = async (paramId) => {
  const user = await User.findById(paramId).select("-password");
  console.log(user);
  if (!user) {
    const error = new Error("User not found.");
    error.statusCode = 404;
    throw error;
  }
  return { user };
};
