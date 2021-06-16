import React, { useEffect } from "react";
import { PIX_HOME_ROUTE, pushNext } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";
import hasAuthPermission from "src/modules/pix/shared/utils/hasAuthPermission";
import { useAuthState } from "src/shared/contexts/AuthContext";
import PixSignUp from "src/modules/pix/pages/Signup";
import WithWaitForAuthentication from "src/shared/hocs/WithWaitForAuthentication";
import { Flex, Spinner } from "@chakra-ui/core";

const PixSignUpPage = () => {
  const { isAuthenticated, profile } = useAuthState();
  const { lang } = useTranslation();

  useEffect(() => {
    if (isAuthenticated && profile) {
      if ("statePlan" in profile && hasAuthPermission(profile?.statePlan)) {
        pushNext(PIX_HOME_ROUTE, undefined, { lang });
      }
    }
  }, [isAuthenticated, profile]);

  if (profile && !("statePlan" in profile)) {
    return (
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <Spinner size="xl" color="brandBlue.100" thickness="5px" />
      </Flex>
    );
  }

  return <PixSignUp />;
};

export default WithWaitForAuthentication(PixSignUpPage);
