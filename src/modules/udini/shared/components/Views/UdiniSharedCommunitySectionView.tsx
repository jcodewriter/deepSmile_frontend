import React from "react";
import { Stack } from "@chakra-ui/core";
import { MidTitle, CopyText } from "./UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { COMMUNITY_FORM } from "src/utils/constants/routes";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";
import UdiniSharedTwoBlocksContainer from "./UdiniSharedTwoBlocksContainer";

const UdiniSharedCommunitySectionView = () => {
  const { t } = useTranslation();
  return (
    <UdiniSharedTwoBlocksContainer
      sectionBg="brandGrey.900"
      paddingY={{ base: "50px", sm: "120px" }}
    >
      <Stack
        direction="column"
        align={{ base: "center", sm: "flex-start" }}
        maxWidth="448px"
        color="#FFFFFF"
        spacing="15px"
      >
        <MidTitle>{t("udiniSharedCommunitySection:title")}</MidTitle>
        <CopyText mb="35px">{t("udiniSharedCommunitySection:text")}</CopyText>
        <SharedGradientButtonLink href={COMMUNITY_FORM} variant="black">
          {t("udiniSharedCommunitySection:button")}
        </SharedGradientButtonLink>
      </Stack>
      <ImageWithSkeleton
        mt={{ base: "35px", md: 0 }}
        src="/svg/udini-icon.svg"
        objectFit="cover"
        maxW="268px"
      />
    </UdiniSharedTwoBlocksContainer>
  );
};

export default UdiniSharedCommunitySectionView;
