import React from "react";
import { Link, Text, Image } from "@chakra-ui/core";
import { PIX_HOME_ROUTE } from "src/utils/constants/routes";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import PixSharedSidebarNavLinkList from "src/modules/pix/shared/components/Controls/PixSharedSidebarNavLinkList";
import useTranslation from "next-translate/useTranslation";

const PixSharedSidebarProfilView = () => {
  const { t } = useTranslation();

  return (
    <>
      <SharedNextTranslateLink href={PIX_HOME_ROUTE} shallow>
        <Link display="flex" color="white">
          <Image src="/svg/back.svg" mr="20px" />
          {t("pixSidebar:backButton")}
        </Link>
      </SharedNextTranslateLink>
      <Text fontWeight="bold" fontSize="16px" lineHeight="24px" color="white">
        {t("pixSidebar:settingText")}
      </Text>

      <PixSharedSidebarNavLinkList
        navLinks={[
          { label: "profileNavLink", query: { page: "profile", stage: "home" } },
          /*{ label: "languageNavLink", query: { page: "profile", stage: "language" } },*/
          { label: "subscriptionNavLink", query: { page: "profile", stage: "subscription" } },
          { label: "paymentNavLink", query: { page: "profile", stage: "payment" } },
        ]}
      />
    </>
  );
};

export default PixSharedSidebarProfilView;
