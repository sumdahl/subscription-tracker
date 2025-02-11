import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import subscriptionRouter from "./routes/subscription.route.js";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { arcjetMiddleware } from "./middlewares/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);

app.use(errorMiddleware);
app.use(arcjetMiddleware);

app.get("/", (_, res) => {
  res.send("Welcome to the world");
});

app.listen(PORT, async () => {
  console.log(
    `Subscription tracker API  is listening on http://localhost:${PORT}`
  );
  await connectToDatabase();
});
