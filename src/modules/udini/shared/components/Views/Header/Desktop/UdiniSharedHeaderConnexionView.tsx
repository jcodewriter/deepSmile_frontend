import React from "react";
import { HStack } from "@chakra-ui/core";
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
import SharedNextTranslateSwitchLang from "src/shared/components/Controls/SharedNextTranslateSwitchLang";

export interface UdiniSharedHeaderConnexionViewProps {
  hoverColor: string;
  hoverText: string;
}

const UdiniSharedHeaderConnexionView = ({
  hoverColor,
  hoverText,
}: UdiniSharedHeaderConnexionViewProps) => {
  const [{ isAuthenticated }, { disconnect }] = useAuth();
  const { t } = useTranslation();

  return (
    <HStack spacing="20px">
      <UdiniSharedHeaderTextLink
        href={isAuthenticated ? UDINI_HOME_ROUTE : PIX_SIGNIN_ROUTE}
        callback={isAuthenticated ? disconnect : undefined}
      >
        {isAuthenticated ? t("udiniHeader:logoutLink") : t("udiniHeader:loginLink")}
      </UdiniSharedHeaderTextLink>
      <SharedGradientButtonLink
        href={isAuthenticated ? PIX_HOME_ROUTE : PIX_SIGNUP_ROUTE}
        background={hoverColor}
        color={hoverText}
      >
        {isAuthenticated ? t("udiniHeader:goToPixLink") : t("udiniHeader:signupLink")}
      </SharedGradientButtonLink>
      <SharedNextTranslateSwitchLang
        cursor="pointer"
        fontWeight="600"
        color="white"
        _hover={{ color: "brandPink.100" }}
      />
    </HStack>
  );
};

export default UdiniSharedHeaderConnexionView;
