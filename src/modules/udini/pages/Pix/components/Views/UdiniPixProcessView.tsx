import React from "react";
import { Flex, FlexProps, Image, Grid, SimpleGrid } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import { Subtitle, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

interface GradientCardProps extends FlexProps {
  icon: string;
  title: string;
  text: string;
  gradient: string[];
}

const GradientCard = ({ icon, title, text, gradient, ...rest }: GradientCardProps) => (
  <Flex
    direction="column"
    align="center"
    background={`linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`}
    paddingY="40px"
    paddingX={{ base: "20px", sm: "40px" }}
    {...rest}
  >
    <Image src={icon} height="80px" mb="40px" />
    <Subtitle color="#FFFFFF" mb="20px">
      {title}
    </Subtitle>
    <CopyText color="#FFFFFF">{text}</CopyText>
  </Flex>
);

const UdiniPixProcessView = () => {
  const { t } = useTranslation();
  const cards = [
    {
      icon: "/svg/pix/tooth.svg",
      title: t("udiniPix:processSectionIntegrationTitle"),
      text: t("udiniPix:descriptionSectionIntegrationText"),
      gradient: ["#28D4FF", "#41D9FF"],
    },
    {
      icon: "/svg/pix/customize.svg",
      title: t("udiniPix:descriptionSectionCustomizeTitle"),
      text: t("udiniPix:descriptionSectionCustomizeText"),
      gradient: ["#C8176F", "#B10A97"],
    },
    {
      icon: "/svg/pix/group.svg",
      title: t("udiniPix:descriptionSectionDoneTitle"),
      text: t("udiniPix:descriptionSectionDoneText"),
      gradient: ["#362EFF", "#6804E8"],
    },
  ];
  return (
    <MainBox backgroundColor="#FFFFFF" boxStyle={{ maxWidth: "1000px" }}>
      <Grid
        gridTemplateColumns={{ base: "1fr", lg: "104px 1fr" }}
        gridColumnGap={{ base: 0, lg: "39px" }}
        gridRowGap={{ base: "39px", lg: 0 }}
        paddingTop={{ base: "70px", md: "140px" }}
        paddingBottom={{ base: "40px", md: "80px" }}
        justifyItems={{ base: "center", md: "start" }}
      >
        <Tag>{t("udiniPix:processSectionTag")}</Tag>
        <SimpleGrid
          justifyContent="space-between"
          columns={{ base: 1, md: 3 }}
          rowGap="50px"
          columnGap="5%"
        >
          {cards.map((e, i: number) => (
            <GradientCard
              key={i}
              icon={e.icon}
              title={e.title}
              text={e.text}
              gradient={e.gradient}
              h="500px"
              maxW="280px"
            />
          ))}
        </SimpleGrid>
      </Grid>
    </MainBox>
  );
};

export default UdiniPixProcessView;
