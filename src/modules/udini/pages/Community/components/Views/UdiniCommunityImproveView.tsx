import React from "react";
import { Stack, VStack, Wrap } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { MidTitle, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import useTranslation from "next-translate/useTranslation";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

const UdiniCommunityImproveView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="#313131">
      <Stack spacing="60px" marginY="75px">
        <Wrap justify="center" spacing="45px" align="center">
          <VStack
            maxW="433px"
            maxH={{ base: "auto", sm: "289px" }}
            spacing="25px"
            align="flex-start"
          >
            <Tag>{t("udiniCommunity:greySectionWorkshopTag")}</Tag>
            <MidTitle color="#FFFFFF">{t("udiniCommunity:greySectionWorkshopTitle")}</MidTitle>
            <CopyText color="#FFFFFF">{t("udiniCommunity:greySectionWorkshopText")}</CopyText>
          </VStack>
          <ImageWithSkeleton
            maxW="433px"
            maxH="289px"
            src="/img/community/help_improve.png"
            objectFit="cover"
          />
          <ImageWithSkeleton
            maxW="433px"
            maxH="289px"
            src="/img/community/beta_testing.png"
            objectFit="cover"
          />
          <VStack
            maxW="433px"
            maxH={{ base: "auto", sm: "289px" }}
            spacing="25px"
            align="flex-start"
          >
            <Tag>{t("udiniCommunity:greySectionTestingTag")}</Tag>
            <MidTitle color="#FFFFFF">{t("udiniCommunity:greySectionTestingTitle")}</MidTitle>
            <CopyText color="#FFFFFF">{t("udiniCommunity:greySectionTestingText")}</CopyText>
          </VStack>
        </Wrap>
      </Stack>
    </MainBox>
  );
};

export default UdiniCommunityImproveView;
