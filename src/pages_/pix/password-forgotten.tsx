import React, { useEffect } from "react";
import { PIX_HOME_ROUTE, PIX_SIGNUP_ROUTE, pushNext } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";
import hasAuthPermission from "src/modules/pix/shared/utils/hasAuthPermission";
import WithWaitForAuthentication from "src/shared/hocs/WithWaitForAuthentication";
import { useAuthState } from "src/shared/contexts/AuthContext";
import PixForgotPassword from "src/modules/pix/pages/ForgotPassword";
import { Flex, Spinner } from "@chakra-ui/core";

const PixForgotPasswordPage = () => {
  const { isAuthenticated, profile } = useAuthState();
  const { lang } = useTranslation();

  useEffect(() => {
    if (isAuthenticated && profile) {
      if ("statePlan" in profile) {
        if (hasAuthPermission(profile?.statePlan)) {
          pushNext(PIX_HOME_ROUTE, undefined, { lang });
        } else {
          pushNext(PIX_SIGNUP_ROUTE, undefined, { lang });
        }
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

  return <PixForgotPassword />;
};

export default WithWaitForAuthentication(PixForgotPasswordPage);
