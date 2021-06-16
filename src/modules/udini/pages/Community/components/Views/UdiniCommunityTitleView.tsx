import React from "react";
import { Stack } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { BigTitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { COMMUNITY_FORM } from "src/utils/constants/routes";

const UdiniCommunityTitleView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="brandGrey.900">
      <Stack marginTop="50px" marginBottom="118px" spacing="40px">
        <BigTitle color="#FFFFFF" width={{ base: "90%", md: "80%" }}>
          {t("udiniCommunity:heroSectionText")}
        </BigTitle>
        <SharedGradientButtonLink href={COMMUNITY_FORM} background="brandGrey.900" color="white">
          {t("udiniCommunity:heroSectionButton")}
        </SharedGradientButtonLink>
      </Stack>
    </MainBox>
  );
};

export default UdiniCommunityTitleView;
