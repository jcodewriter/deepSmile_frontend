import {
  SubscriptionPlanEnum,
  SubscriptionPlanProductEnum,
  SubscriptionPlanStateEnum,
} from "types/User";

/**
 * Interfaces for Subscribe mutation
 */
export interface SubscribePayload {
  subscribe: {
    planState: SubscriptionPlanStateEnum;
    threeDSecurePaymentIntentSecret: string | null;
  };
}

export interface SubscribeVariables {
  plan: SubscriptionPlanEnum;
  cardToken: string;
}

export interface Subscribe2Payload {
  subscribe2: {
    planState: SubscriptionPlanStateEnum;
    threeDSecurePaymentIntentSecret: string | null;
  };
}

export interface Subscribe2Variables {
  plan: SubscriptionPlanProductEnum;
  cardToken?: string;
}

export interface ChangePlanPayload {
  changePlan2: {
    planState: SubscriptionPlanStateEnum;
    threeDSecurePaymentIntentSecret: string | null;
  };
}

export interface ChangePlanVariables {
  toPlan: SubscriptionPlanProductEnum;
  cardToken?: string;
}
