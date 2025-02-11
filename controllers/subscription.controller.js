import { createSubscriptionService } from "../services/subscription.service.js";

export const createSubscription = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    console.log(userId);
    if (!userId) {
      return res.status(401).json({
        success: false,
        error: "User authentication required.",
      });
    }

    const subscription = await createSubscriptionService(req.body, userId);
    return res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
