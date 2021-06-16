import React from "react";
import { HStack, Text, Link } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { UDINI_TERMS_AND_CONDITIONS_ROUTE } from "src/utils/constants/routes";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";

const PixSignupCopyrightView = () => {
  const { t } = useTranslation();

  return (
    <HStack spacing="18px">
      <Text fontWeight="bold" fontSize="12px" lineHeight="15px">
        © {t("shared:pixProduct")}
      </Text>

      <SharedNextTranslateLink href={UDINI_TERMS_AND_CONDITIONS_ROUTE}>
        <Link fontWeight="bold" fontSize="12px" lineHeight="15px" target="_blank">
          {t("shared:termsLink")}
        </Link>
      </SharedNextTranslateLink>
    </HStack>
  );
};

export default PixSignupCopyrightView;
