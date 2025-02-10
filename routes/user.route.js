import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send({ title: "Get all users" }));
userRouter.get("/:id", (req, res) => res.send({ title: "READ specific user" }));
userRouter.post("/", (req, res) => res.send({ title: "CREATE new users" }));
userRouter.put("/:id", (req, res) => res.send({ title: "UPDATE new users" }));
userRouter.delete("/:id", (req, res) =>
  res.send({ title: "DELETE new users" })
);

export default userRouter;
