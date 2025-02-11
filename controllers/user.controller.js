import {
  getUserByIdService,
  getUserService,
} from "../services/user.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const { users } = await getUserService();
    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const paramId = req.params.id;
    console.log(paramId);
    const { user } = await getUserByIdService(paramId);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
