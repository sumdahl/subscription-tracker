import { Router } from "express";
import { getUsers } from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authenticateToken, getUsers);
userRouter.get("/:id", (req, res) => res.send({ title: "READ specific user" }));
userRouter.post("/", (req, res) => res.send({ title: "CREATE new users" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE new users" }));
userRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE new users" })
);

export default userRouter;
