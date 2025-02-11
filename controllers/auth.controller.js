import { createUser, loginUser } from "../services/auth.services.js";

export const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await createUser(username, email, password);

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "User signed in successfully.",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
