import React from "react";
import { Flex, Image, Box } from "@chakra-ui/core";
import {
  BaseText,
  Subtitle,
  CopyText,
  Info,
} from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { UDINI_PRODUCT_SMILE_ROUTE, UDINI_PRODUCT_PIX_ROUTE } from "src/utils/constants/routes";
import UdiniSharedTwoBlocksContainer from "src/modules/udini/shared/components/Views/UdiniSharedTwoBlocksContainer";

const UdiniHomeProductsView = () => {
  const { t } = useTranslation();
  return (
    <UdiniSharedTwoBlocksContainer
      sectionBg="#FFFFFF"
      align={{ base: "center", md: "stretch" }}
      py="80px"
    >
      <Flex direction="column" align="flex-start" width={{ base: "100%", md: "50%" }}>
        <Image src="/svg/PixPlusProductLogo.svg" />
        <Box ml="5px" width={{ base: "100%", md: "80%" }}>
          <BaseText color="brandBlue.100" fontSize="16px" fontWeight="bold" mt="12px">
            {t("udiniHome:productsSectionPixTarget")}
          </BaseText>
          <Subtitle mt="10px">{t("udiniHome:productsSectionPixBold")}</Subtitle>
          <CopyText mt="10px">{t("udiniHome:productsSectionPixText")}</CopyText>
          <BaseText fontSize="12px" fontWeight="500" mt="15px">
            {"udiniHome:productsSectionPixInfo"}
          </BaseText>
          <Info textDecoration="underline" mt="10px">
            {t("udiniHome:productsSectionPixPromotion")}
          </Info>
          <Box mt="30px">
            <SharedGradientButtonLink href={UDINI_PRODUCT_PIX_ROUTE} variant="white">
              {t("udiniHome:productsSectionPixBtn")}
            </SharedGradientButtonLink>
          </Box>
        </Box>
      </Flex>
      <Flex
        direction="column"
        align="flex-end"
        width={{ base: "100%", md: "50%" }}
        mt={{ base: "50px", md: 0 }}
      >
        <Image src="/svg/SmilePlusProductLogo.svg" />
        <BaseText color="brandPink.100" fontSize="16px" fontWeight="bold" mt="12px">
          {t("udiniHome:productsSectionSmileTarget")}
        </BaseText>
        <Flex direction="column" align="flex-end" width={{ base: "100%", md: "80%" }} mt="25px">
          <Subtitle mt="10px" textAlign="end">
            {t("udiniHome:productsSectionSmileBold")}
          </Subtitle>
          <CopyText mt="10px" textAlign="end">
            {t("udiniHome:productsSectionSmileText")}
          </CopyText>
          <Box mt="30px">
            <SharedGradientButtonLink href={UDINI_PRODUCT_SMILE_ROUTE} variant="white">
              {t("udiniHome:productsSectionSmileBtn")}
            </SharedGradientButtonLink>
          </Box>
        </Flex>
      </Flex>
    </UdiniSharedTwoBlocksContainer>
  );
};

export default UdiniHomeProductsView;
