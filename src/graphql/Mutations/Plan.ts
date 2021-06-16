import { gql } from "@apollo/client";

const SUBSCRIBE = gql`
  mutation subscribe($plan: SubscriptionPlanEnum!, $cardToken: String!, $coupon: String) {
    subscribe(plan: $plan, cardToken: $cardToken, coupon: $coupon) {
      planState
      threeDSecurePaymentIntentSecret
    }
  }
`;

const SUBSCRIBE2 = gql`
  mutation subscribe2($plan: SubscriptionPlanProductEnum!, $cardToken: String) {
    subscribe2(plan: $plan, cardToken: $cardToken) {
      planState
      threeDSecurePaymentIntentSecret
    }
  }
`;

const CHANGE_PLAN = gql`
  mutation changePlan2($toPlan: SubscriptionPlanProductEnum!, $cardToken: String) {
    changePlan2(toPlan: $toPlan, cardToken: $cardToken) {
      planState
      threeDSecurePaymentIntentSecret
    }
  }
`;

export { SUBSCRIBE, SUBSCRIBE2, CHANGE_PLAN };
