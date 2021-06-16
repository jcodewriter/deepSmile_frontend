import React from "react";
import { Flex } from "@chakra-ui/core";

import useTranslation from "next-translate/useTranslation";
import { MidTitle } from "src/shared/components/Titles";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

interface PixPageWithSidebarTitleProps {
  isProfile?: boolean;
  pageTitle: string;
}

const PixSharedPageTileView = ({ isProfile = false, pageTitle }: PixPageWithSidebarTitleProps) => {
  const { t } = useTranslation();

  return (
    <Flex justify="space-between" align="center">
      <MidTitle>{pageTitle}</MidTitle>
      {isProfile && (
        <SharedGradientButton type="submit" variant="webApp">
          {t("profile:profileSaveButton")}
        </SharedGradientButton>
      )}
    </Flex>
  );
};

export default PixSharedPageTileView;
