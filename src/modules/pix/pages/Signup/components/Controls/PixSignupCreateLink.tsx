import React from "react";
import { Text, Link } from "@chakra-ui/core";
import { PIX_SIGNIN_ROUTE } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";

const PixSignupCreateLink = () => {
  const { t } = useTranslation();

  return (
    <Text marginTop="40px" fontWeight="bold" fontSize="14px" lineHeight="17px" textAlign="center">
      {t("pixSignup:alreadyAccountText")}{" "}
      <SharedNextTranslateLink href={PIX_SIGNIN_ROUTE}>
        <Link>{t("pixSignup:alreadyAccountLink")}</Link>
      </SharedNextTranslateLink>
    </Text>
  );
};

export default PixSignupCreateLink;
