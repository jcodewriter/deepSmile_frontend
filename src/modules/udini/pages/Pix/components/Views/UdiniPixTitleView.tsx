import React, { useState, useEffect } from "react";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { CarouselPictureStacked } from "src/modules/udini/shared/components/Controls/UdiniSharedCarouselControl";
import { Flex, Box, Image } from "@chakra-ui/core";
import {
  BaseText,
  MidTitle,
  Subtitle,
  Info,
} from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { PIX_SIGNUP_ROUTE } from "src/utils/constants/routes";

const PICTURES = Array.from({ length: 8 }, (_, k) => [
  `/img/pix/${k + 1}_avant.jpeg`,
  `/img/pix/${k + 1}_apres.jpeg`,
]);

const UdiniPixTitleView = () => {
  const { t } = useTranslation();
  const [currentCarousel, setCurrentCarousel] = useState(0);

  useEffect(() => {
    const next = (currentCarousel + 1) % PICTURES.length;
    const id = setTimeout(() => setCurrentCarousel(next), 4000);
    return () => clearTimeout(id);
  }, [currentCarousel]);

  return (
    <MainBox
      pt="50px"
      pb="20px"
      boxStyle={{ width: { base: "100vw", md: "80vw" } }}
      backgroundColor="#FFFFFF"
    >
      <Flex direction={{ base: "column", md: "row" }}>
        <Box width={{ base: "90%", md: "50%" }} mb="20px">
          <Image src="/svg/PixPlusProductLogo.svg" />
          <Box mt="12px" ml="5px">
            <BaseText fontSize="16px" fontWeight="bold" color="brandBlue.100">
              {t("udiniPix:heroSectionTarget")}
            </BaseText>
            <MidTitle color="#000000" mt="20px">
              {t("udiniPix:heroSectionTitle")}
            </MidTitle>
            <Subtitle color="#000000" mt="10px">
              {t("udiniPix:heroSectionText")}
            </Subtitle>
            <Info textDecoration="underline" mt="20px">
              {t("udiniPix:heroSectionPromotion")}
            </Info>
            <Box mt="40px">
              <SharedGradientButtonLink href={PIX_SIGNUP_ROUTE} background="white" color="black">
                {t("udiniPix:heroSectionBtn")}
              </SharedGradientButtonLink>
            </Box>
          </Box>
        </Box>
        <Flex
          direction="column"
          align="center"
          width={{ base: "90%", md: "50%" }}
          my={{ base: "20px", md: 0 }}
        >
          <Flex direction="row" w="100%">
            <CarouselPictureStacked pictures={PICTURES} />
            <Flex direction="column" ml="15px">
              <Info height="50%">{t("udiniPix:heroSectionBefore")}</Info>
              <Info>{t("udiniPix:heroSectionAfter")}</Info>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </MainBox>
  );
};

export default UdiniPixTitleView;
