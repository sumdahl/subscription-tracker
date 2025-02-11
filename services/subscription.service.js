import Subscription from "../models/subscription.model.js";

export const createSubscriptionService = async (body, userId) => {
  const subscription = await Subscription.create({
    ...body,
    user: userId,
  });
  return subscription;
};
