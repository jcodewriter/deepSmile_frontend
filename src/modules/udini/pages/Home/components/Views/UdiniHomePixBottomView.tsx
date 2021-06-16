import { Flex, Image, Text, Stack, SimpleGrid } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { PRODUCTS_PIX_PRICING_SECTION } from "src/utils/constants/routes";

const UdiniHomePixBottomView = () => {
  const { t } = useTranslation();
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} minH="722px">
      <Flex alignItems="center" justifyContent="center" backgroundColor="brandBlue.100">
        <Image src="/svg/home/pix_logo_white.svg" />
      </Flex>
      <Flex
        textAlign={{ base: "center", md: "left" }}
        alignItems="center"
        justifyContent={{ base: "center", md: "center" }}
      >
        <Stack
          maxWidth="495px"
          spacing="33px"
          align={{ base: "center", md: "initial" }}
          paddingX="15px"
        >
          <Text
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={{ base: "24px", md: "30px" }}
            lineHeight="140.7%"
          >
            {t("udiniHomeV2:bottomViewTitle")}
          </Text>
          <SharedGradientButtonLink href={PRODUCTS_PIX_PRICING_SECTION}>
            {t("udiniHomeV2:bottomViewButton")}
          </SharedGradientButtonLink>
        </Stack>
      </Flex>
    </SimpleGrid>
  );
};

export default UdiniHomePixBottomView;
