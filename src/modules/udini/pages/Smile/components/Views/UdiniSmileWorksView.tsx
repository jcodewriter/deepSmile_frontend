import React from "react";
import { Box, SimpleGrid, Grid } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { Subtitle, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import useTranslation from "next-translate/useTranslation";

const UdiniSmileWorksView = () => {
  const { t } = useTranslation();
  const cards = [
    {
      title: t("udiniSmile:howSection3DTitle"),
      text: t("udiniSmile:howSection3DText"),
    },
    {
      title: t("udiniSmile:howSectionIntegrationTitle"),
      text: t("udiniSmile:howSectionIntegrationTitle"),
    },
    {
      title: t("udiniSmile:howSectionReleaseTitle"),
      text: t("udiniSmile:howSectionReleaseText"),
    },
  ];
  return (
    <MainBox backgroundColor="#FFFFFF">
      <Grid
        gridRowGap="30px"
        gridTemplateColumns={{ base: "1fr", md: "200px 1fr" }}
        py={{ base: "50px", md: "90px" }}
      >
        <Tag>{t("udiniSmile:howSectionTag")}</Tag>
        <SimpleGrid columns={{ base: 1, md: 3 }}>
          {cards.map((e, i: number) => (
            <Box key={i} ml={{ base: 0, md: "80px" }} mb={{ base: "20px", md: 0 }}>
              <Subtitle color="#000000">{e.title}</Subtitle>
              <CopyText color="#000000">{e.text}</CopyText>
            </Box>
          ))}
        </SimpleGrid>
      </Grid>
    </MainBox>
  );
};

export default UdiniSmileWorksView;
