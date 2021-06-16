import React from "react";
import { Flex } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import { UDINI_ABOUT_ROUTE } from "src/utils/constants/routes";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import UdiniSharedCountView from "src/modules/udini/shared/components/Views/UdiniSharedCountView";

const UdiniHomeCountView = () => {
  const { t } = useTranslation();

  return (
    <MainBox backgroundColor="brandGrey.900">
      <Flex direction="column" align="center" mt="80px" mb="130px">
        <Subtitle textAlign="center" color="#FFFFFF" width={{ base: "90%", md: "70%", lg: "50%" }}>
          {t("udiniHome:descriptionSectionText")}
        </Subtitle>
        <UdiniSharedCountView />
        <SharedGradientButtonLink href={UDINI_ABOUT_ROUTE} variant="black">
          {t("udiniHome:descriptionSectionBtn")}
        </SharedGradientButtonLink>
      </Flex>
    </MainBox>
  );
};

export default UdiniHomeCountView;
