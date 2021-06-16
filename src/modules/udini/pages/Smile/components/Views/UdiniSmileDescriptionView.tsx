import React from "react";
import { SimpleGrid, Stack } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import { Text } from "src/shared/components/Text/Text";

const UdiniSmileDescriptionView = () => {
  const { t, lang } = useTranslation();
  return (
    <MainBox backgroundColor="brandPink.100">
      <SimpleGrid
        gridRowGap="30px"
        gridColumnGap={{ base: 0, md: "10%" }}
        columns={{ base: 1, md: 3 }}
        py={{ base: "50px", md: "100px" }}
      >
        <Subtitle color="#FFFFFF" fontWeight="bold">
          {t("udiniSmile:presentationSectionFirstBigText")}
        </Subtitle>

        <Stack spacing="40px">
          <Text
            color="white"
            font-family="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
          >
            {t("udiniSmile:presentationSectionSecondBigText")}
          </Text>
          <Text
            color="white"
            font-family="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
          >
            {t("udiniSmile:presentationSectionFirstSmallText")}
          </Text>
        </Stack>
        <Stack spacing={lang === "fr" ? "0px" : "40px"}>
          <Text
            color="white"
            font-family="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
          >
            {t("udiniSmile:presentationSectionSecondSmallText")}
          </Text>
          <Text
            color="white"
            font-family="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize="16px"
            lineHeight="20px"
          >
            {t("udiniSmile:presentationSectionThirdSmallText")}
          </Text>
        </Stack>
      </SimpleGrid>
    </MainBox>
  );
};

export default UdiniSmileDescriptionView;
