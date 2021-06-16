import React from "react";
import { Box, Stack } from "@chakra-ui/core";
import { MidTitle, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";
import UdiniSharedTwoBlocksContainer from "src/modules/udini/shared/components/Views/UdiniSharedTwoBlocksContainer";

const UdiniHomeDescriptionView = () => {
  const { t } = useTranslation();

  return (
    <UdiniSharedTwoBlocksContainer
      sectionBg="#252525"
      marginY="80px"
      spacing={0}
      align={{ base: "center", sm: "flex-start" }}
    >
      <Stack maxW="448px" h="auto" spacing="15px" color="#FFFFFF">
        <MidTitle>{t("udiniHome:presentationSectionTitle")}</MidTitle>
        <CopyText>{t("udiniHome:presentationSectionText")}</CopyText>
      </Stack>
      <Box paddingTop={{ base: "30px", sm: 0 }} w="100%" h="100%" maxW="572px" maxH="368px">
        <ImageWithSkeleton
          src={"/img/home/dentist_to_dentist.png"}
          objectFit="contain"
          maxW="572px"
          maxH="368px"
        />
      </Box>
    </UdiniSharedTwoBlocksContainer>
  );
};

export default UdiniHomeDescriptionView;
