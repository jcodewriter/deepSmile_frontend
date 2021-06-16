import React, { ReactNode, Dispatch, SetStateAction } from "react";
import { Flex, Stack } from "@chakra-ui/core";
import PixSignupBreadcrumbs from "src/modules/pix/pages/Signup/components/Controls/PixSignupBreadcrumbs";
import { PixMidTitle } from "src/shared/components/Titles";
import { PixSignUpSteps } from "../..";

const PixSignupPageLayout = ({
  children,
  stepTitle,
  step,
  setStep,
}: {
  step: PixSignUpSteps;
  children: ReactNode;
  stepTitle: string;
  setStep: Dispatch<SetStateAction<PixSignUpSteps>>;
}) => {
  return (
    <Flex>
      <Flex
        margin="auto"
        paddingRight={{ base: "50px", xs: "50px", sm: "50px", md: "100px", lg: "100px" }}
        paddingLeft={{ base: "50px", xs: "50px", sm: "50px", md: "100px", lg: "100px" }}
        paddingTop="15px"
        direction="column"
      >
        <PixSignupBreadcrumbs step={step} setStep={setStep} />
        <Stack as="main" spacing="50px">
          <PixMidTitle>{stepTitle}</PixMidTitle>
          {children}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PixSignupPageLayout;
