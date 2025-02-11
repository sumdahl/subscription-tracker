import { Router } from "express";
import { getUserById, getUsers } from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticateUser, getUsers);
userRouter.get("/:id", authenticateUser, getUserById);
userRouter.post("/", (req, res) => res.send({ title: "CREATE new users" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE new users" }));
userRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE new users" })
);

export default userRouter;
