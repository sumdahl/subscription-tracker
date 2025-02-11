import User from "../models/user.model.js";

export const getUserService = async () => {
  try {
    const users = await User.find();
    return { users };
  } catch (error) {
    console.error("Error while fetching the users:", error);
    throw error;
  }
};

export const getUserByIdService = async (paramId) => {
  try {
    const user = await User.findById(paramId).select("-password");
    console.log(user);
    if (!user) {
      const error = new Error("User not found.");
      error.statusCode = 404;
      throw error;
    }
    return { user };
  } catch (error) {
    console.log("Error while fetching the user by it's ID.");
    throw error;
  }
};
