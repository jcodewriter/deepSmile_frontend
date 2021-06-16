import React from "react";
import { Flex, SimpleGrid, Stack, Image } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import {
  Subtitle,
  BaseText,
  Menu,
} from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

const UdiniHomeUdiniKeyView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="#232323">
      <Stack spacing="65px" align="center" mt={{ base: "50px", md: "80px" }} mb="130px">
        <BaseText
          color="#FFFFFF"
          fontSize={{ base: "60px", sm: "120px" }}
          lineHeight="108.9%"
          fontWeight="bold"
          textAlign="center"
        >
          {t("udiniHome:processSectionTitle")}
        </BaseText>
        <SimpleGrid columns={{ base: 1, md: 3 }} columnGap="40px">
          <Flex direction="row" justify="center" mt="50px" gridRow={{ base: "4", md: "initial" }}>
            <Flex direction="column">
              <Subtitle color="brandBlue.100" textAlign={{ base: "center", md: "initial" }}>
                {`● ${t("udiniHome:processSectionClinicalTitle")}`}
              </Subtitle>
              <Menu color="#FFFFFF" textAlign={{ base: "center", md: "initial" }}>
                {`- ${t("udiniHome:processSectionClinicalFirstItem")}`}
                <br />
                {`- ${t("udiniHome:processSectionClinicalSecondItem")}`}
              </Menu>
            </Flex>
          </Flex>
          <Flex justify="center">
            <Image src={"/svg/home/key.svg"} gridRow={{ base: "1", md: "initial" }} />
          </Flex>
          <Flex direction="column" mt="50px" align={{ base: "center", md: "initial" }}>
            <Subtitle
              color="brandPink.100"
              ml={{ base: "0px", md: "15px" }}
              textAlign={{ base: "center", md: "initial" }}
            >
              {`● ${t("udiniHome:processSectionWorkflowTitle")}`}
            </Subtitle>
            <Subtitle
              color="brandPink.100"
              ml={{ base: "0px", md: "15px" }}
              textAlign={{ base: "center", md: "initial" }}
            >
              {t("udiniHome:processSectionWorkflowFirstItem")}
              <br />
              {t("udiniHome:processSectionWorkflowSecondItem")}
              <br />
              {t("udiniHome:processSectionWorkflowThirdItem")}
            </Subtitle>
          </Flex>
          <Flex
            direction="row"
            justify="center"
            mt="50px"
            align={{ base: "center", md: "initial" }}
            gridColumn={{ base: "initial", md: "1 / 4" }}
          >
            <Flex direction="column">
              <Subtitle color="brandPurple.100" textAlign={{ base: "center", md: "initial" }}>
                {`● ${t("udiniHome:processSectionTechTitle")}`}
              </Subtitle>
              <Menu color="#FFFFFF" textAlign={{ base: "center", md: "initial" }}>
                {`- ${t("udiniHome:processSectionTechFirstItem")}`}
                <br />
                {`- ${t("udiniHome:processSectionTechSecondItem")}`}
              </Menu>
            </Flex>
          </Flex>
        </SimpleGrid>
      </Stack>
    </MainBox>
  );
};

export default UdiniHomeUdiniKeyView;
