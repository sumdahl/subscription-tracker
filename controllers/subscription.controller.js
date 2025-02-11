import {
  createSubscriptionService,
  deleteAllSubscriptionService,
  deleteSubscriptionService,
  getAllSubscriptionByUserService,
} from "../services/subscription.service.js";

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

export const getAllSubscriptionByUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const allSubscription = await getAllSubscriptionByUserService(userId, res);

    if (allSubscription.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subscriptions found for this user.",
      });
    }
    return res
      .status(200)
      .json({ success: true, subscriptions: allSubscription });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscriptionId = req.params.id;
    const deletedSubscription = await deleteSubscriptionService(subscriptionId);
    if (!deleteSubscription) {
      return res.status(404).json({
        success: false,
        message: "No subscription of that ID is found to be deleted.",
      });
    }
    return res.status(200).json({ success: true, deletedSubscription });
  } catch (error) {
    next(error);
  }
};

export const deleteAllSubscription = async (req, res, next) => {
  try {
    const result = await deleteAllSubscriptionService();
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No subscription found to be deleted.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All subscriptions are deleted sucessfully.",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    next(error);
  }
};
