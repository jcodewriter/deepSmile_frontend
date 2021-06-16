import { Box, SimpleGrid, Image, Text, Flex, Stack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { PRODUCTS_PIX_PRICING_SECTION } from "src/utils/constants/routes";
import UdiniSharedPixCarousel from "../Controls/UdiniSharedPixCarousel";

const PICTURES = Array.from({ length: 8 }, (_, k) => [
  `/img/pix/${k + 1}_avant.jpeg`,
  `/img/pix/${k + 1}_apres.jpeg`,
]);

const UdiniSharedPixView = () => {
  const { t } = useTranslation();

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      justifyItems={{ base: "center", md: "initial" }}
      mb="72px"
    >
      <Box
        minW="280px"
        maxW="550px"
        w="100%"
        height="auto"
        justifySelf={{ base: "center", md: "start", lg: "right" }}
        mr={{ lg: "10%" }}
      >
        <UdiniSharedPixCarousel pictures={PICTURES} />
      </Box>
      <Flex
        paddingY={{ base: "50px", md: "initial" }}
        paddingX="16px"
        align="center"
        justify={{ base: "center", md: "initial" }}
      >
        <Stack spacing="28px" maxW="500px">
          <Text
            alignSelf={{ base: "flex-start", md: "flex-end" }}
            mb={{ base: "15px", md: "initial" }}
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight={{ base: "500", md: "600" }}
            fontSize={{ base: "16px", md: "22px" }}
            line-height={{ base: "19px", md: "27px" }}
            letterSpacing="0.15em"
            textTransform="uppercase"
            color="brandBlue.100"
            _selection={{
              color: "white",
              backgroundColor: "brandBlue.100",
            }}
          >
            {t("udiniHomeV2:pixTag")}
          </Text>
          <Image src="/svg/PixPlusProductLogo.svg" maxW="212px" w="100%" height="auto" />
          <Text
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize={{ base: "26px", md: "30px" }}
            line-height={{ base: "36px", md: "42px" }}
            _selection={{
              color: "white",
              backgroundColor: "brandBlue.100",
            }}
          >
            {t("udiniHomeV2:pixText1")}
          </Text>
          <Text
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={{ base: "20px", md: "24px" }}
            line-height={{ base: "24px", md: "29px" }}
            _selection={{
              color: "white",
              backgroundColor: "brandPink.100",
            }}
          >
            {t("udiniHomeV2:pixText2")}
          </Text>
          <Text
            mb="56px"
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="bold"
            fontSize={{ base: "20px", md: "24px" }}
            line-height={{ base: "24px", md: "29px" }}
            letterSpacing="0.03em"
            color="#111111"
            _selection={{
              color: "white",
              backgroundColor: "brandBlue.100",
            }}
          >
            {t("udiniHomeV2:pixText3")}
          </Text>
          <SharedGradientButtonLink
            href={PRODUCTS_PIX_PRICING_SECTION}
            variant="white_bg"
            color="black"
          >
            {t("udiniHomeV2:pixButton")}
          </SharedGradientButtonLink>
        </Stack>
      </Flex>
    </SimpleGrid>
  );
};
export default UdiniSharedPixView;
