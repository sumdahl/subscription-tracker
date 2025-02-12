import Subscription from "../models/subscription.model.js";

export const createSubscriptionService = async (body, userId) => {
  try {
    const subscription = await Subscription.create({
      ...body,
      user: userId,
    });
    return subscription;
  } catch (error) {
    console.error("Error in creating subscription:", error);
    throw error;
  }
};

export const getUserSubscriptionService = async (userId) => {
  try {
    const allSubscription = await Subscription.find({ user: userId });
    return allSubscription;
  } catch (error) {
    console.error("Error in getting all subscription of the user:", error);
    throw error;
  }
};

export const deleteSubscriptionService = async (subId) => {
  try {
    const deletedSubscription = await Subscription.findOneAndDelete({
      _id: subId,
    });
    return deletedSubscription;
  } catch (error) {
    console.error("Error while deleting the subscription: ", error);
    throw error;
  }
};

export const deleteAllSubscriptionService = async () => {
  try {
    const result = await Subscription.deleteMany({});
    return result;
  } catch (error) {
    console.error("Error while deleting all subscription:", error);
    throw error;
  }
};
