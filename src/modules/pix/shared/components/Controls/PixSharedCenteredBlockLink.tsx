import React from "react";
import { Text, Link } from "@chakra-ui/core";
import { PIX_SIGNUP_ROUTE } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";

const PixSharedCenteredBlockLink = () => {
  const { t } = useTranslation();

  return (
    <Text marginTop="40px" fontStyle="normal" fontWeight="bold" fontSize="14px" lineHeight="17px">
      {t("pixCenteredBlock:signUpText")}
      <SharedNextTranslateLink href={`${PIX_SIGNUP_ROUTE}?stage=create`}>
        <Link>{t("pixCenteredBlock:signUpLink")}</Link>
      </SharedNextTranslateLink>
    </Text>
  );
};

export default PixSharedCenteredBlockLink;
