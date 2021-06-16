import React, { useState, useEffect, useContext } from "react";
import PixSignupCreateForm from "./components/Forms/PixSignupCreateForm";
import PixSignupInfosForm from "./components/Forms/PixSignupInfosForm";
import PixSignupSubscriptionForm from "./components/Forms/PixSignupSubscriptionForm";
import PixSignupPageLayout from "./components/Layouts/PixSignupPageLayout";
import { useAuthState } from "src/shared/contexts/AuthContext";
import { User } from "types/User";
import useTranslation from "next-translate/useTranslation";

import { SmoothScrollContext } from "src/shared/contexts/SmoothScrollContext";

const SIGNUP_FORMS = [PixSignupCreateForm, PixSignupInfosForm, PixSignupSubscriptionForm];

const getStepTitle = (stageQuery: PixSignUpSteps) => {
  switch (stageQuery) {
    case PixSignUpSteps.CREATE_STEP:
      return "stepOneTitle";
    case PixSignUpSteps.INFOS_STEP:
      return "stepTwoTitle";
    case PixSignUpSteps.PLANS_STEP:
      return "stepThreeTitle";
    default:
      return "stepOneTitle";
  }
};

export enum PixSignUpSteps {
  CREATE_STEP,
  INFOS_STEP,
  PLANS_STEP,
}

const getInitialStep = (profile?: User) => {
  if (!profile) return PixSignUpSteps.CREATE_STEP;

  if (!profile?.infos?.lastName && !profile?.infos?.phone) {
    return PixSignUpSteps.INFOS_STEP;
  }

  return PixSignUpSteps.PLANS_STEP;
};

const PïxSignUp = () => {
  const { scroll } = useContext(SmoothScrollContext);
  const { profile } = useAuthState();
  const [step, setStep] = useState(getInitialStep(profile));

  const { t } = useTranslation();

  const SignUpFormComponent = SIGNUP_FORMS[step];

  useEffect(() => {
    scroll && scroll.destroy();
  });

  return (
    <PixSignupPageLayout
      step={step}
      setStep={setStep}
      stepTitle={t(`pixSignup:${getStepTitle(step)}`)}
    >
      <SignUpFormComponent setStep={setStep} />
    </PixSignupPageLayout>
  );
};

export default PïxSignUp;
