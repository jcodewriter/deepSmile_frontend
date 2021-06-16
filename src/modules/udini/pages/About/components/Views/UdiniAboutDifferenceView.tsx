import React from "react";
import { Flex, SimpleGrid, Box, Image, Stack } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { Subtitle, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import WhiteTag from "src/modules/udini/shared/components/Views/UdiniSharedWhiteTagView";

const UdiniAboutDifferenceView = () => {
  const { t } = useTranslation();
  const cards = [
    {
      icon: "/svg/about/medal.svg",
      title: t("udiniAbout:differenceSectionClinicalTitle"),
      text: t("udiniAbout:differenceSectionClinicalText"),
    },
    {
      icon: "/svg/about/community.svg",
      title: t("udiniAbout:differenceSectionCommunityTitle"),
      text: t("udiniAbout:differenceSectionCommunityText"),
    },
    {
      icon: "/svg/about/practitioner.svg",
      title: t("udiniAbout:differenceSectionPractitionerTitle"),
      text: t("udiniAbout:differenceSectionPractitionerText"),
    },
    {
      icon: "/svg/about/transparency.svg",
      title: t("udiniAbout:differenceSectionTransparencyTitle"),
      text: t("udiniAbout:differenceSectionTransparencyText"),
    },
    {
      icon: "/svg/about/agile.svg",
      title: t("udiniAbout:differenceSectionAgileTitle"),
      text: t("udiniAbout:differenceSectionAgileText"),
    },
    {
      icon: "/svg/about/ux.svg",
      title: t("udiniAbout:differenceSectionExperienceTitle"),
      text: t("udiniAbout:differenceSectionExperienceText"),
    },
  ];

  return (
    <MainBox backgroundColor="brandPink.100">
      <Flex direction={{ base: "column", md: "row" }} py="80px">
        <Box width={{ base: "100%", md: "25%" }}>
          <WhiteTag>{t("udiniAbout:differenceSectionTag")}</WhiteTag>
        </Box>
        <SimpleGrid
          alignSelf={{ base: "center", md: "initial" }}
          mt={{ base: "20px", md: 0 }}
          width={{ base: "100%", md: "75%" }}
          maxWidth="90vw"
          columns={{ base: 1, md: 2, lg: 3 }}
          columnGap="20px"
          rowGap={{ base: "50px", md: "70px" }}
        >
          {cards.map((card, i) => (
            <Stack spacing="20px" key={i}>
              <Image src={card.icon} height="65px" />
              <Subtitle color="#FFFFFF" minHeight="60px">
                {card.title}
              </Subtitle>
              <CopyText color="#FFFFFF">{card.text}</CopyText>
            </Stack>
          ))}
        </SimpleGrid>
      </Flex>
    </MainBox>
  );
};

export default UdiniAboutDifferenceView;
