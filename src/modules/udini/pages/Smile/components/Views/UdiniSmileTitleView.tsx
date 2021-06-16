import React from "react";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { Flex, Box, Image } from "@chakra-ui/core";
import {
  BaseText,
  MidTitle,
  Subtitle,
  Info,
} from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { SMILE_FORM } from "src/utils/constants/routes";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

const UdiniSmileTitleView = () => {
  const { t } = useTranslation();
  return (
    <MainBox boxStyle={{ width: "100vw" }} backgroundColor="#FFFFFF" mt="0px" mb="0px">
      <Flex direction={{ base: "column", md: "row" }} align={{ base: "center", md: "stretch" }}>
        <Flex
          direction="row"
          justify={["flex-start", "flex-end", "flex-end", "flex-end", "flex-end", "flex-end"]}
          align="center"
          pr={{ base: 0, md: "50px" }}
          width={{ base: "90%", md: "50%" }}
          py="50px"
        >
          <Box width="90%" mb="20px">
            <Image src="/svg/SmilePlusProductLogo.svg" />
            <Box mt="12px" ml="5px">
              <BaseText fontSize="16px" fontWeight="bold" color="brandPink.100">
                {t("udiniSmile:heroSectionTarget")}
              </BaseText>
              <MidTitle color="#000000" mt="20px">
                {t("udiniSmile:heroSectionTextBig")}
              </MidTitle>
              <Subtitle color="#000000" mt="10px">
                {t("udiniSmile:heroSectionTextSmall")}
              </Subtitle>
              <Info textDecoration="underline" mt="20px">
                {t("udiniSmile:heroSectionRelease")}
              </Info>
              <Box mt="40px">
                <SharedGradientButtonLink href={SMILE_FORM} background="white" color="black">
                  {t("udiniSmile:heroSectionBtn")}
                </SharedGradientButtonLink>
              </Box>
            </Box>
          </Box>
        </Flex>
        <Flex direction="column" align="center" width={{ base: "100%", md: "50%" }}>
          <ImageWithSkeleton
            src={require("public/img/smile/smile_plus_hero.png")}
            height="100%"
            width="100%"
            objectFit="cover"
            objectPosition="left"
          />
        </Flex>
      </Flex>
    </MainBox>
  );
};

export default UdiniSmileTitleView;
