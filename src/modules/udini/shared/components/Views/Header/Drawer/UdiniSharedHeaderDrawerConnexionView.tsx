import React from "react";
import { Stack } from "@chakra-ui/core";
import {
  PIX_HOME_ROUTE,
  PIX_SIGNIN_ROUTE,
  PIX_SIGNUP_ROUTE,
  UDINI_HOME_ROUTE,
} from "src/utils/constants/routes";
import { useAuth } from "src/shared/contexts/AuthContext";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import UdiniSharedHeaderTextLink from "../../../Controls/Header/UdiniSharedHeaderTextLink";

const UdiniSharedHeaderDrawerConnexionView = () => {
  const [{ isAuthenticated }, { disconnect }] = useAuth();
  const { t } = useTranslation();

  return (
    <Stack align="center" direction="column" spacing="20px">
      <UdiniSharedHeaderTextLink
        href={isAuthenticated ? UDINI_HOME_ROUTE : PIX_SIGNIN_ROUTE}
        callback={isAuthenticated ? disconnect : undefined}
        color="black"
      >
        {isAuthenticated ? t("udiniHeader:logoutLink") : t("udiniHeader:loginLink")}
      </UdiniSharedHeaderTextLink>
      <SharedGradientButtonLink
        href={isAuthenticated ? PIX_HOME_ROUTE : PIX_SIGNUP_ROUTE}
        background="white"
        color="black"
      >
        {isAuthenticated ? t("udiniHeader:goToPixLink") : t("udiniHeader:signupLink")}
      </SharedGradientButtonLink>
    </Stack>
  );
};

export default UdiniSharedHeaderDrawerConnexionView;
