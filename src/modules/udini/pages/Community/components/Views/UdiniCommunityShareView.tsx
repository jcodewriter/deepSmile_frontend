import React from "react";
import { Flex, Image } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { MidTitle, CopyText } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

const UdiniCommunityShareView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="brandGrey.900">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        width="100%"
        py={{ base: "50px", md: "80px" }}
      >
        <Flex direction="column" width={{ base: "100%", md: "50%" }} ml={{ base: 0, md: "25px" }}>
          <MidTitle
            color="#FFFFFF"
            maxWidth={{ base: "90%", md: "60%" }}
            alignSelf={{ base: "center", md: "initial" }}
          >
            {t("udiniCommunity:ideasSectionTitle")}
          </MidTitle>
          <CopyText
            mt="15px"
            color="#FFFFFF"
            maxWidth={{ base: "90%", md: "60%" }}
            alignSelf={{ base: "center", md: "initial" }}
          >
            {t("udiniCommunity:ideasSectionText")}
          </CopyText>
        </Flex>
        <Flex
          direction="row"
          width={{ base: "90%", md: "50%" }}
          maxHeight="350px"
          mr={{ base: 0, md: "25px" }}
          mt={{ base: "30px", md: 0 }}
        >
          <Image src="/svg/community/share.svg" maxHeight="100%" />
        </Flex>
      </Flex>
    </MainBox>
  );
};

export default UdiniCommunityShareView;
