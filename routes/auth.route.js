import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";
import { validateEmail } from "../middlewares/validateEmail.middleware.js";
const authRouter = Router();

authRouter.post("/sign-up", validateEmail, signUp);
authRouter.post("/sign-in", validateEmail, signIn);
authRouter.post("/sign-out", signOut);

export default authRouter;
