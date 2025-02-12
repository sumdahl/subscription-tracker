import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  // deleteAllSubscription,
  deleteSubscription,
  getUserSubscription,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/user/:id", authenticateUser, getUserSubscription);
subscriptionRouter.post("/create", authenticateUser, createSubscription);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE a subscription" })
);
subscriptionRouter.delete("/delete/:id", authenticateUser, deleteSubscription);
// subscriptionRouter.delete("/delete/", authenticateUser, deleteAllSubscription);

subscriptionRouter.get("/user/:id", (req, res) =>
  res.send({ title: "GET all user's subscription" })
);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "CANCEL user's subscription" })
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "UPCOMING upcoming renewals" })
);

export default subscriptionRouter;
