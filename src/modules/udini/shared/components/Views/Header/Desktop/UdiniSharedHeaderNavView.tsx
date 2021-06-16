import React from "react";
import { HStack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { UDINI_HOME_ROUTE, UDINI_PRODUCTS_ROUTE } from "src/utils/constants/routes";
import UdiniSharedHeaderTextLink from "../../../Controls/Header/UdiniSharedHeaderTextLink";
import { useRouter } from "next/router";

const UdiniSharedHeaderNavView = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <HStack alignItems="center" spacing="8">
      <UdiniSharedHeaderTextLink
        href={UDINI_HOME_ROUTE}
        isActive={router.pathname.endsWith("/products") ? false : true}
      >
        {t("udiniHeader:homeLink")}
      </UdiniSharedHeaderTextLink>
      <UdiniSharedHeaderTextLink
        href={UDINI_PRODUCTS_ROUTE}
        isActive={router.pathname.endsWith("/products") ? true : false}
      >
        {t("udiniHeader:productsLink")}
      </UdiniSharedHeaderTextLink>
    </HStack>
  );
};

export default UdiniSharedHeaderNavView;
