import { Plan, SubscriptionPlanProductEnum } from "types/User";

export interface Plans2Payload {
  plans2: {
    country?: string;
    currency?: string;
    plans?: Plan[];
  };
}

export interface PreviewChangePlan2Variables {
  toPlan: SubscriptionPlanProductEnum;
}

export interface PreviewChangePlan2Payload {
  previewChangePlan2: {
    amountToPayNow: number;
    planChangeDate: number;
  };
}
