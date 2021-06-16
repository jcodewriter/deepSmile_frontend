import React from "react";
import { Stack, Image } from "@chakra-ui/core";
import { MidTitle, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import UdiniSharedTwoBlocksContainer from "src/modules/udini/shared/components/Views/UdiniSharedTwoBlocksContainer";

const UdiniHomeAIView = () => {
  const { t } = useTranslation();
  return (
    <UdiniSharedTwoBlocksContainer
      sectionBg="brandPink.100"
      py={{ base: "50px", sm: "120px" }}
      spacing={0}
    >
      <Image src={"/svg/home/ai.svg"} objectFit="contain" />
      <Stack
        paddingTop={{ base: "30px", sm: 0 }}
        spacing="30px"
        maxW="340px"
        alignSelf="center"
        color="#FFFFFF"
      >
        <MidTitle>{t("udiniHome:aiSectionTitle")}</MidTitle>
        <CopyText>{t("udiniHome:aiSectionText")}</CopyText>
      </Stack>
    </UdiniSharedTwoBlocksContainer>
  );
};

export default UdiniHomeAIView;
