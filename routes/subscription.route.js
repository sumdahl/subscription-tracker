import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptionByUser,
} from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "GET all subscription" })
);
subscriptionRouter.get("/:id", authenticateUser, getAllSubscriptionByUser);
subscriptionRouter.post("/create", authenticateUser, createSubscription);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "UPDATE a subscription" })
);
subscriptionRouter.delete("/delete/:id", authenticateUser, deleteSubscription);

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
