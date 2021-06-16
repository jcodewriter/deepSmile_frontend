import React from "react";
import { Stack, Wrap } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { COMMUNITY_FORM } from "src/utils/constants/routes";

const PARAGRAPHS = ["First", "Second", "Third"];

const UdiniCommunityDescriptionView = () => {
  const { t } = useTranslation();

  return (
    <MainBox backgroundColor="#FFFFFF">
      <Stack my="70px" align="center" spacing="50px">
        <Wrap
          w="100%"
          spacing="45px"
          paddingX={{ base: "25px", lg: 0 }}
          justify={{ base: "center", lg: "space-between" }}
          align="center"
        >
          {PARAGRAPHS.map((paragraph) => (
            <CopyText maxW="271px" key={paragraph} color="#000000">
              {t(`udiniCommunity:whiteSection${paragraph}Paragraph`)}
            </CopyText>
          ))}
        </Wrap>

        <SharedGradientButtonLink href={COMMUNITY_FORM} background="white" color="black">
          {t("udiniCommunity:whiteSectionButton")}
        </SharedGradientButtonLink>
      </Stack>
    </MainBox>
  );
};

export default UdiniCommunityDescriptionView;
