import User from "../models/user.model.js";

export const getUserService = async () => {
  const users = await User.find();
  return { users };
};
