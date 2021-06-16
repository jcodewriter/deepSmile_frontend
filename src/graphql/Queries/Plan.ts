import { gql } from "@apollo/client";

const PLANS2 = gql`
  query {
    plans2 {
      country
      currency
      plans {
        plan
        price
        numberOfPhotosInPlan
      }
    }
  }
`;

const PREVIEW_CHANGE_PLAN2 = gql`
  query previewChangePlan2($toPlan: SubscriptionPlanProductEnum!) {
    previewChangePlan2(toPlan: $toPlan) {
      amountToPayNow
      planChangeDate
    }
  }
`;

export { PLANS2, PREVIEW_CHANGE_PLAN2 };
