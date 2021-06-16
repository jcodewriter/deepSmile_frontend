import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Stack } from "@chakra-ui/core";

import { useForm, FormProvider } from "react-hook-form";
import PixSignupCreateLink from "src/modules/pix/pages/Signup/components/Controls/PixSignupCreateLink";

import { useAuth } from "src/shared/contexts/AuthContext";
import useTranslation from "next-translate/useTranslation";
import PixSharedInput from "src/modules/pix/shared/components/Forms/PixSharedInput";
import PixSignupPasswordInput from "../Controls/Create/PixSignupPasswordInput";
import PixSignupValidatePasswordInput from "../Controls/Create/PixSignupValidatePasswordInput";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";
import { PixSignUpSteps } from "../..";
import { SIGN_UP_STEP } from "src/shared/contexts/AuthContext";
import * as GTagHelper from "src/utils/helpers/GTagHelper";
import { track } from "src/services/Segment/analytics";
import { useSentry } from "src/services/Sentry";

interface FormData {
  email: string;
  password: string;
  validatePassword: string;
}

const PixSignupCreateForm = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<PixSignUpSteps>>;
}) => {
  const { t } = useTranslation();
  const formMethods = useForm<FormData>({
    mode: "onBlur",
  });
  const { handleSubmit, setError, formState } = formMethods;
  const [{ errorMessages }, { signUp }] = useAuth();
  const { log } = useSentry();

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const res = await signUp(email, password);

    if (res === SIGN_UP_STEP.NEW_ACCOUNT) {
      try {
        GTagHelper.event({
          action: "FRONT | New SignUp | STEP 1",
          category: "SIGNUP",
          payload: { email },
        });
        if (typeof window.analytics !== "undefined")
          track("FRONT | New SignUp | STEP 1", {
            email,
          });
      } catch (e) {
        log(e, "error");
      }
      setStep(PixSignUpSteps.INFOS_STEP);
    }
  });

  useEffect(() => {
    if (errorMessages.length !== 0) {
      errorMessages.forEach((value) => {
        const field = value.includes("email") ? "email" : "password";
        setError(field, {
          type: "manual",
          message: value,
        });
      });
    }
  }, [errorMessages.length]);

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <Stack align="center" spacing="50px">
          <PixSharedInput name="email" type="email" label={t("pixSignup:emailLabel")} />
          <PixSignupPasswordInput />
          <PixSignupValidatePasswordInput />
          <SharedGradientButton
            type="submit"
            isLoading={formState.isSubmitting}
            variant="white"
            w="100%"
          >
            {t("pixSignup:goButton")}
          </SharedGradientButton>
          <PixSignupCreateLink />
        </Stack>
      </form>
    </FormProvider>
  );
};

export default PixSignupCreateForm;
