import React, { Dispatch, SetStateAction, useCallback } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/core";
import { ChevronRightIcon } from "@chakra-ui/icons";
import useTranslation from "next-translate/useTranslation";
import { PixSignUpSteps } from "../..";
import { useAuthState } from "src/shared/contexts/AuthContext";

const PixSignupBreadcrumbs = ({
  step,
  setStep,
}: {
  step: PixSignUpSteps;
  setStep: Dispatch<SetStateAction<PixSignUpSteps>>;
}) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthState();

  const LINKS = [
    {
      text: "stepOne",
      step: PixSignUpSteps.CREATE_STEP,
    },
    {
      text: "stepTwo",
      step: PixSignUpSteps.INFOS_STEP,
    },
    {
      text: "stepThree",
      step: PixSignUpSteps.PLANS_STEP,
    },
  ];

  const isCurrentOrPreviousStep = useCallback(
    (targetStep: PixSignUpSteps) => {
      return targetStep <= step;
    },
    [step]
  );

  const onGoToTargetStep = useCallback(
    (targetStep: PixSignUpSteps) => {
      if (step === PixSignUpSteps.CREATE_STEP) {
        return;
      } else if (targetStep !== PixSignUpSteps.CREATE_STEP) {
        setStep(targetStep);
      }
    },
    [step, isAuthenticated]
  );

  return (
    <Breadcrumb
      marginLeft="auto"
      marginRight="auto"
      marginBottom="40px"
      separator={<ChevronRightIcon color="gray.500" />}
    >
      {LINKS.map((link) => (
        <BreadcrumbItem key={link.text} isCurrentPage={isCurrentOrPreviousStep(link.step)}>
          <BreadcrumbLink
            cursor={link.step !== PixSignUpSteps.CREATE_STEP ? "pointer" : "default"}
            fontSize="16px"
            lineHeight="20px"
            fontWeight={isCurrentOrPreviousStep(link.step) ? "bold" : "normal"}
            color={step === link.step ? "brandBlue.100" : "black"}
            onClick={() => onGoToTargetStep(link.step)}
          >
            {t(`pixSignup:${link.text}`)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

export default PixSignupBreadcrumbs;
