import React from "react";
import { Flex, Text, Stack, SimpleGrid } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import { Quote, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

const UdiniAboutStoryView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="#FFFFFF">
      <Stack spacing="25px" py="60px">
        <Tag>{t("udiniAbout:storySectionTag")}</Tag>
        <Stack
          spacing="10px"
          width={{ base: "90%", md: "80%", lg: "50%" }}
          alignSelf={{ base: "center", md: "initial" }}
          textAlign={{ base: "center", md: "initial" }}
        >
          <Quote>{t("udiniAbout:storySectionQuote")}</Quote>
          <CopyText>{t("udiniAbout:storySectionAuthor")}</CopyText>
        </Stack>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "center", md: "initial" }}
          alignSelf={{ base: "center", md: "initial" }}
        >
          <Stack mb={{ base: "20px", md: 0 }} order={{ base: 1, md: 2 }} spacing="10px">
            <ImageWithSkeleton
              src={require("public/img/about/clarke.png")}
              height="379px"
              width="277px"
              minW="277px"
            />
            <Text fontSize="10px" fontFamily="Montserrat">
              {t("udiniAbout:storySectionPictureCaption")}
            </Text>
          </Stack>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            columnGap="25px"
            rowGap="45px"
            order={{ base: 2, md: 1 }}
          >
            <CopyText maxW="200px">
              <b>{t("udiniAbout:storySectionLeftParagraphBold")}</b>
              {t("udiniAbout:storySectionLeftParagraph")}
            </CopyText>
            <CopyText maxW="200px">
              {t("udiniAbout:storySectionTopMiddleParagraph")}
              <br />
              <br />
              {t("udiniAbout:storySectionBottomMiddleParagraphFirstWord")}{" "}
              <b>{t("udiniAbout:storySectionBottomMiddleParagraphBold")}</b>
              {t("udiniAbout:storySectionBottomMiddleParagraph")}
            </CopyText>
            <CopyText maxW="200px">
              <b>{t("udiniAbout:storySectionTopRightParagraphBold")}</b>
              <br />
              {t("udiniAbout:storySectionTopRightParagraph")}
              <br />
              <br />
              {t("udiniAbout:storySectionBottomRightParagraph")}{" "}
              <b>{t("udiniAbout:storySectionBottomRightParagraphBold")}</b>
              {t("udiniAbout:storySectionBottomRightParagraphEnd")}
            </CopyText>
          </SimpleGrid>
        </Flex>
      </Stack>
    </MainBox>
  );
};

export default UdiniAboutStoryView;
