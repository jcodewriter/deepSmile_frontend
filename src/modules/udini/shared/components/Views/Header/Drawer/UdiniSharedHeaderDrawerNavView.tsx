import React from "react";
import { Flex, Stack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { UDINI_HOME_ROUTE, UDINI_PRODUCTS_ROUTE } from "src/utils/constants/routes";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { NavLinkDrawer } from "../../UdiniSharedTextsView";

const UdiniSharedHeaderDrawerNavView = () => {
  const { t } = useTranslation();

  return (
    <Flex justify="center" marginBottom="50px">
      <Stack align="center">
        <SharedNextTranslateLink href={UDINI_HOME_ROUTE}>
          <NavLinkDrawer>{t("udiniHeader:homeLink")}</NavLinkDrawer>
        </SharedNextTranslateLink>
        {/*  <Flex
          align="center"
          cursor="pointer"
          onClick={handleToggle}
          _hover={{
            textDecoration: "underline #C8176F",
          }}
        >
          <NavCollapseDrawer>{t("udiniHeader:productsText")}</NavCollapseDrawer>
          {show ? <ChevronUpIcon boxSize="35px" /> : <ChevronDownIcon boxSize="35px" />}
        </Flex>
        <Collapse isOpen={show}>
          <Flex direction="column">
            <SharedNextTranslateLink href={UDINI_PRODUCT_PIX_ROUTE}>
              <NavLinkDrawer marginY="0px">{t("udiniHeader:productPixLink")}</NavLinkDrawer>
            </SharedNextTranslateLink>
            <SharedNextTranslateLink href={UDINI_PRODUCT_SMILE_ROUTE}>
              <NavLinkDrawer marginY="0px">{t("udiniHeader:productSmileLink")}</NavLinkDrawer>
            </SharedNextTranslateLink>
          </Flex>
        </Collapse> */}

        <SharedNextTranslateLink href={UDINI_PRODUCTS_ROUTE}>
          <NavLinkDrawer>{t("udiniHeader:productsLink")}</NavLinkDrawer>
        </SharedNextTranslateLink>
      </Stack>
    </Flex>
  );
};

export default UdiniSharedHeaderDrawerNavView;
