import React from "react";
import { Flex, Image, SimpleGrid, useMediaQuery, Box } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { MidTitle, Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import { SMILE_FORM } from "src/utils/constants/routes";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";

const UdiniIcon = () => {
  const [small] = useMediaQuery("(max-width:69em)");
  return (
    <SimpleGrid columns={small ? 3 : 4} gap="20px">
      {Array(small ? 9 : 12)
        .fill(undefined)
        .map((_, i) => (
          <Image
            key={i}
            src={
              i === (small ? 4 : 5) ? "/svg/udini-icon-pink-small.svg" : "/svg/udini-icon-small.svg"
            }
          />
        ))}
    </SimpleGrid>
  );
};

const UdiniSmileCommunitySectionView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="brandGrey.900">
      <Flex
        direction={{ base: "column", md: "row" }}
        width="100%"
        py={{ base: "60px", md: "100px" }}
        align="center"
      >
        <Flex
          direction="column"
          align={{ base: "center", md: "flex-start" }}
          maxWidth={{ base: "80%", md: "50%" }}
        >
          <MidTitle color="#FFFFFF">{t("udiniSmile:communitySectionTitle")}</MidTitle>
          <Subtitle color="#FFFFFF" mt="15px">
            {t("udiniSmile:communitySectionText")}
          </Subtitle>
          <Box mt="50px" display={{ base: "none", sm: "initial" }}>
            <SharedGradientButtonLink href={SMILE_FORM} background="brandGrey.900" color="white">
              {t("udiniSmile:communitySectionBtn")}
            </SharedGradientButtonLink>
          </Box>
        </Flex>
        <Flex
          direction="row"
          justify={{ base: "center", md: "center" }}
          width="50%"
          mt={{ base: "50px", md: 0 }}
        >
          <UdiniIcon />
        </Flex>
        <Box mt="50px" display={{ base: "initial", sm: "none" }}>
          <SharedGradientButtonLink href={SMILE_FORM} color="white" background="brandGrey.900">
            {t("udiniSmile:communitySectionBtnMobile")}
          </SharedGradientButtonLink>
        </Box>
      </Flex>
    </MainBox>
  );
};

export default UdiniSmileCommunitySectionView;
