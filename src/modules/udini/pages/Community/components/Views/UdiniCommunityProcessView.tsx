import React from "react";
import { Flex, Box, Image, FlexProps, useMediaQuery } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import {
  CopyText,
  BaseText,
  Subtitle,
} from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

interface NumberBubbleProps extends FlexProps {
  children: React.ReactNode;
}
const NumberBubble = ({ children, ...rest }: NumberBubbleProps) => (
  <Flex
    justify="center"
    align="center"
    height="90px"
    width="90px"
    borderRadius="90px"
    position="absolute"
    {...rest}
  >
    <BaseText fontSize="50px" fontWeight="600" color="#FFFFFF">
      {children}
    </BaseText>
  </Flex>
);

const ProcessView = () => {
  const { t } = useTranslation();
  const [isSmall] = useMediaQuery("(max-width: 56.25em)");

  return (
    <>
      <Box position="relative" width={{ base: "80%", sm: "100%" }} mt={{ base: "200px", sm: 0 }}>
        <Image
          mt="150px"
          src={`/svg/community/zigzag-${isSmall ? "vertical" : "horizontal"}.svg`}
          width={{ base: "90%", sm: "100%" }}
          marginLeft={{ base: "15%", sm: 0 }}
        />
        <NumberBubble
          backgroundColor="#994F9A"
          left={{ base: "10%", sm: "-40px" }}
          top={{ base: "calc(150px - 45px)", sm: `calc(80vw * 0.25 + 85px)` }}
        >
          1
        </NumberBubble>
        <NumberBubble
          backgroundColor="#C71971"
          left={{ base: "10%", sm: "calc(25% + 90px)" }}
          top={{
            base: `calc((100vw * 3) * 0.33 - 45px + 150px)`,
            sm: `calc(80vw * 0.25 + 85px)`,
          }}
        >
          2
        </NumberBubble>
        <NumberBubble
          backgroundColor="#2BD1FD"
          left={{ base: "85%", sm: "calc(50% + 90px)" }}
          top={{ base: `calc((100vw * 3) * 0.66 - 30px + 150px)`, sm: "calc(150px - 45px)" }}
        >
          3
        </NumberBubble>
        <NumberBubble
          backgroundColor="#816BAF"
          left={{ base: "90%", sm: "calc(100% - 50px)" }}
          top={{ base: `calc((100vw * 3) + 10px)`, sm: "calc(150px - 45px)" }}
        >
          4
        </NumberBubble>
        <Box
          maxWidth={{ base: "70%", sm: "240px" }}
          position="absolute"
          top={{ base: "-100px", sm: "50px" }}
          left={{ base: "15%", sm: "0px" }}
        >
          <Subtitle color="#FFFFFF">{t("udiniCommunity:processSectionTopTitle")}</Subtitle>
          <CopyText color="#FFFFFF" mt="15px">
            {t("udiniCommunity:processSectionTopFirstStepText")}
          </CopyText>
        </Box>
        <CopyText
          color="#FFFFFF"
          maxWidth={{ base: "70%", sm: "230px" }}
          position="absolute"
          left={{ base: "50%", sm: "calc(25%)" }}
          top={{ base: `calc((100vw * 3) * 0.30 + 130px)`, sm: `calc(80vw * 0.25 + 200px)` }}
        >
          {t("udiniCommunity:processSectionTopSecondStepText")}
        </CopyText>
        <CopyText
          color="#FFFFFF"
          maxWidth={{ base: "70%", sm: "230px" }}
          position="absolute"
          left={{ base: "10%", sm: "calc(50%)" }}
          top={{ base: `calc((100vw * 3) * 0.55 + 150px)`, sm: "20px" }}
        >
          {t("udiniCommunity:processSectionTopThirdStepText")}
        </CopyText>
        <CopyText
          color="#FFFFFF"
          maxWidth={{ base: "100%", sm: "330px" }}
          minWidth={{ base: "100%", sm: "330px" }}
          position="absolute"
          left={{ base: "15%", sm: "calc(75%)" }}
          top={{ base: `calc((100vw * 3) + 150px)`, sm: `calc(80vw * 0.25 + 110px)` }}
        >
          {t("udiniCommunity:processSectionTopFourthStepText")}
          <br />
          {t("udiniCommunity:processSectionTopFourthStepFirstItem")}
          <br />
          {t("udiniCommunity:processSectionTopFourthStepSecondItem")}
          <br />
          {t("udiniCommunity:processSectionTopFourthStepThirdItem")}
        </CopyText>
      </Box>
      <Box
        position="relative"
        mt={{ base: "850px", sm: "250px" }}
        minHeight={{ base: `calc(100vw * 3 + 300px)`, sm: `calc(80vw * 0.65)` }}
        width={{ base: "80%", sm: "100%" }}
      >
        <Image
          mt="150px"
          src={`/svg/community/zigzag-${isSmall ? "vertical" : "horizontal"}.svg`}
          width={{ base: "90%", sm: "100%" }}
          transform="scaleX(-1)"
          marginLeft={{ base: "15%", sm: 0 }}
        />
        <NumberBubble
          backgroundColor="#994F9A"
          left={{ base: "90%", sm: "-40px" }}
          top="calc(150px - 45px)"
        >
          1
        </NumberBubble>
        <NumberBubble
          backgroundColor="#4CA9DF"
          left={{ base: "25%", sm: "20%" }}
          top={{ base: `calc((100vw * 3) * 0.1 + 150px)`, sm: `calc(80vw * 0.25 + 20px)` }}
        >
          2
        </NumberBubble>
        <NumberBubble
          backgroundColor="#C71971"
          left={{ base: "80%", sm: "calc(33% + 90px)" }}
          top={{ base: `calc((100vw * 3) * 0.3 + 150px)`, sm: "120px" }}
        >
          3
        </NumberBubble>
        <NumberBubble
          backgroundColor="#2AD3FE"
          left={{ base: "5%", sm: "58%" }}
          top={{ base: `calc((100vw * 3) * 0.55 + 120px)`, sm: `calc(80vw * 0.25 + 90px)` }}
        >
          4
        </NumberBubble>
        <NumberBubble
          backgroundColor="#816BAF"
          left={{ base: "65%", sm: "calc(72.5% + 90px)" }}
          top={{
            base: `calc((100vw * 3) * 0.75 + 150px)`,
            sm: `calc((80vw * 0.25) * 0.2 + 140px)`,
          }}
        >
          5
        </NumberBubble>
        <NumberBubble
          backgroundColor="#29D4FF"
          left={{ base: "10%", sm: "calc(100% - 50px)" }}
          top={{ base: `calc((100vw * 3) * 0.9 + 120px)`, sm: `calc(80vw * 0.25 + 110px)` }}
        >
          6
        </NumberBubble>
        <Subtitle
          color="#FFFFFF"
          position="absolute"
          top={{ base: "-250px", sm: "50px" }}
          left={{ base: "15%", sm: "2%" }}
        >
          {t("udiniCommunity:processSectionBottomTitle")}
        </Subtitle>
        <CopyText
          color="#FFFFFF"
          maxWidth={{ base: "100%", sm: "238px" }}
          position="absolute"
          left={{ base: "15%", sm: "0%" }}
          top={{ base: "-200px", sm: `calc(80vw * 0.25 + 150px)` }}
        >
          {t("udiniCommunity:processSectionBottomFirstStepText")}
          <br />
          {t("udiniCommunity:processSectionBottomFirstStepFirstItem")}
          <br />
          {t("udiniCommunity:processSectionBottomFirstStepSecondItem")}
          <br />
          {t("udiniCommunity:processSectionBottomFirstStepThirdItem")}
        </CopyText>
        <CopyText
          color="#FFFFFF"
          minWidth={{ base: "50%", sm: "initial" }}
          maxWidth={{ base: "50%", sm: "230px" }}
          position="absolute"
          left={{ base: "60%", sm: "50%" }}
          top={{ base: `calc((100vw * 3) * 0.125 + 120px)`, sm: "50px" }}
        >
          {t("udiniCommunity:processSectionBottomThirdStepText")}
        </CopyText>
        <CopyText
          color="#FFFFFF"
          maxWidth={{ base: "60%", sm: "230px" }}
          position="absolute"
          left={{ base: "10%", sm: "25%" }}
          top={{ base: `calc((100vw * 3) * 0.33 + 120px)`, sm: `calc(80vw * 0.25 + 150px)` }}
        >
          {t("udiniCommunity:processSectionBottomSecondStepText")}
        </CopyText>
        <CopyText
          color="#FFFFFF"
          minWidth={{ base: "60%", sm: "initial" }}
          maxWidth={{ base: "60%", sm: "230px" }}
          position="absolute"
          left="calc(50%)"
          top={{ base: `calc((100vw * 3) * 0.55 + 120px)`, sm: `calc(80vw * 0.25 + 240px)` }}
        >
          {t("udiniCommunity:processSectionBottomFourthStepText")}
        </CopyText>
        <CopyText
          color="#FFFFFF"
          maxWidth={{ base: "50%", sm: "230px" }}
          position="absolute"
          left={{ base: "10%", sm: "75%" }}
          top={{ base: `calc((100vw * 3) * 0.76 + 150px)`, sm: "120px" }}
        >
          {t("udiniCommunity:processSectionBottomFifthStepText")}
        </CopyText>
        <CopyText
          color="#FFFFFF"
          maxWidth={{ base: "60%", sm: "230px" }}
          minWidth={{ base: "60%", sm: "200px" }}
          position="absolute"
          left={{ base: "10%", sm: "90%" }}
          top={{ base: `calc((100vw * 3) * 1 + 120px)`, sm: `calc(80vw * 0.25 + 240px)` }}
        >
          {t("udiniCommunity:processSectionBottomSixthStepText")}
        </CopyText>
      </Box>
    </>
  );
};

const UdiniCommunityProcessView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="brandGrey.900" boxStyle={{ width: { base: "100vw", sm: "80vw" } }}>
      <Flex direction="column" width="100%" py="80px">
        <Box>
          <Tag>{t("udiniCommunity:processSectionTag")}</Tag>
        </Box>
        <ProcessView />
      </Flex>
    </MainBox>
  );
};

export default UdiniCommunityProcessView;
