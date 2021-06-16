import React from "react";
import { Stack } from "@chakra-ui/core";
import { MidTitle, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";
import UdiniSharedTwoBlocksContainer from "src/modules/udini/shared/components/Views/UdiniSharedTwoBlocksContainer";

const UdiniHomeExpertiseView = () => {
  const { t } = useTranslation();
  return (
    <UdiniSharedTwoBlocksContainer
      sectionBg="brandGrey.900"
      py={{ base: "50px", md: "80px" }}
      spacing={0}
    >
      <Stack spacing="15px" maxW="362px" h="auto" color="#FFFFFF">
        <MidTitle>{t("udiniHome:expertiseSectionTitle")}</MidTitle>
        <CopyText>{t("udiniHome:expertiseSectionText")}</CopyText>
      </Stack>
      <ImageWithSkeleton
        pt={{ base: "50px", md: 0 }}
        src={"/img/home/clinical_expertise.png"}
        objectFit="cover"
        maxW="572px"
      />
    </UdiniSharedTwoBlocksContainer>
  );
};

export default UdiniHomeExpertiseView;
