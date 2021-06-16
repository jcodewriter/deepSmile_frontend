import { SubscriptionPlanStateEnum } from "src/shared/types/User";

const hasAuthPermission = (planState = SubscriptionPlanStateEnum.ONBOARDING) => {
  return [
    SubscriptionPlanStateEnum.ACTIVE,
    SubscriptionPlanStateEnum.ACTIVE_WILL_DOWNGRADE,
    SubscriptionPlanStateEnum.ACTIVE_WILL_EXPIRE,
    SubscriptionPlanStateEnum.PAYMENT_PENDING,
    SubscriptionPlanStateEnum.TRIAL,
  ].includes(planState);
};

export default hasAuthPermission;
