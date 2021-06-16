import React from "react";
import { Flex, Stack } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { MidTitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import useTranslation from "next-translate/useTranslation";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

const UdiniSmileAmbitionView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="brandGrey.900">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify={{ base: "initial", md: "space-between" }}
        py="80px"
      >
        <ImageWithSkeleton
          src={require("public/img/smile/smile_plus_smile_design.png")}
          maxW="433px"
          maxH="350px"
          objectFit="contain"
        />
        <Stack spacing="20px" maxW="520px" mt={{ base: "40px", md: 0 }}>
          <Tag>{t("udiniSmile:ambitionSectionTag")}</Tag>
          <MidTitle color="#FFFFFF">{t("udiniSmile:ambitionSectionText")}</MidTitle>
        </Stack>
      </Flex>
    </MainBox>
  );
};

export default UdiniSmileAmbitionView;
