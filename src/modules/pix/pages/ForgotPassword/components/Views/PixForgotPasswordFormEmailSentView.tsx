import React from "react";
import { Stack } from "@chakra-ui/core";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { PIX_SIGNIN_ROUTE } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";
import { PixMidTitle } from "src/shared/components/Titles";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

const PixForgotPasswordFormEmailSentView = ({ display }: { display: string }) => {
  const { t } = useTranslation();

  return (
    <Stack align="center" spacing="30px" display={display}>
      <PixMidTitle>{t("pixForgotPassword:emailSentText")}</PixMidTitle>
      <SharedNextTranslateLink href={PIX_SIGNIN_ROUTE} passHref>
        <SharedGradientButton w="100%" type="submit" background="brandGrey.100" color="black">
          {t("pixForgotPassword:emailSentButton")}
        </SharedGradientButton>
      </SharedNextTranslateLink>
    </Stack>
  );
};

export default PixForgotPasswordFormEmailSentView;
