import React from "react";
import { Stack, SimpleGrid } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import { CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

const UdiniAboutTechDataView = () => {
  const { t } = useTranslation();
  const texts = [
    {
      title: t("udiniAbout:techSectionTag"),
      text: (
        <>
          {t("udiniAbout:techSectionFirstParagraphBegin")}{" "}
          <b>{t("udiniAbout:techSectionFirstParagraphBold")}</b>{" "}
          {t("udiniAbout:techSectionFirstParagraphEnd")}
          <br />
          <br />
          {t("udiniAbout:techSectionSecondParagraph")}
          <br />
          <br />
          {t("udiniAbout:techSectionThirdParagraph")}
          <br />
          <br />
          {t("udiniAbout:techSectionFourthParagraphBegin")}{" "}
          <b>{t("udiniAbout:techSectionFourthParagraphBold")}</b>{" "}
          {t("udiniAbout:techSectionFourthParagraphEnd")}
          <br />
          <br />
          {t("udiniAbout:techSectionFifthParagraph")}
          <br />
          <br />
          {t("udiniAbout:techSectionSixthParagraph")}
        </>
      ),
    },
    {
      title: t("udiniAbout:dataSectionTag"),
      text: (
        <>
          <b>{t("udiniAbout:dataSectionFirstParagraphBold")}</b>{" "}
          {t("udiniAbout:dataSectionFirstParagraphEnd")}
          <br />
          <br />
          {t("udiniAbout:dataSectionSecondParagraph")}
          <br />
          <br />
          {t("udiniAbout:dataSectionThirdParagraphBegin")}{" "}
          <b>{t("udiniAbout:dataSectionThirdParagraphBold")}</b>{" "}
          {t("udiniAbout:dataSectionThirdParagraphEnd")}
          <br />
          <br />
          {t("udiniAbout:dataSectionFourthParagraph")}
          <br />
          <br />
          {t("udiniAbout:dataSectionFifthParagraph")}
          <br />
          <br />
          {t("udiniAbout:dataSectionSixthParagraph")}
        </>
      ),
    },
  ];

  return (
    <MainBox backgroundColor="#252525">
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        rowGap={{ base: "50px", md: 0 }}
        columnGap={{ base: 0, md: "15%" }}
        py="65px"
      >
        {texts.map((e, i: number) => (
          <Stack key={i} spacing="35px">
            <Tag>{e.title}</Tag>

            <CopyText color="#FFFFFF" maxWidth="90vw">
              {e.text}
            </CopyText>
          </Stack>
        ))}
      </SimpleGrid>
    </MainBox>
  );
};

export default UdiniAboutTechDataView;
