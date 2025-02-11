import { getUserService } from "../services/user.service.js";

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
