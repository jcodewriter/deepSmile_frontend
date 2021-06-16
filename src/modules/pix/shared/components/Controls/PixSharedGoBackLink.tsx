import React from "react";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { Link as ChakraLink } from "@chakra-ui/core";
import { LinkProps } from "next/link";
import useTranslation from "next-translate/useTranslation";

const PixSharedGoBackLink = (props: LinkProps) => {
  const { t } = useTranslation();

  return (
    <SharedNextTranslateLink {...props}>
      <ChakraLink fontSize="16px" lineHeight="22px">
        {t("shared:goBack")}
      </ChakraLink>
    </SharedNextTranslateLink>
  );
};

export default PixSharedGoBackLink;
