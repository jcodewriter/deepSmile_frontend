import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import UdiniSharedSmileCarousel from "../Controls/UdiniSharedSmileCarousel";
import UdiniSharedInlineEmailForm from "../Form/UdiniSharedInlineEmailForm";

const PICTURES = Array.from({ length: 3 }, (_, k) => `/img/home/smile${k + 1}.png`);

const UdiniSharedSmileView = ({ isHome = false }: { isHome?: boolean }) => {
  const { t } = useTranslation();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} justifyItems={{ base: "center", md: "end" }}>
      <Flex
        paddingY={{ base: "50px", md: "initial" }}
        paddingX="16px"
        align="center"
        justify={{ base: "center", md: "initial" }}
      >
        <Flex maxWidth="514px" direction="column">
          <Text
            alignSelf={{ base: "flex-start", md: "flex-end" }}
            mb={{ base: "15px", md: "initial" }}
            color="brandPink.100"
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight={{ base: "500", md: "600" }}
            fontSize={{ base: "16px", md: "22px" }}
            line-height={{ base: "19px", md: "27px" }}
            letterSpacing="0.15em"
            _selection={{
              color: "white",
              background: "brandPink.100",
            }}
          >
            {t("udiniHomeV2:smileTag")}
          </Text>
          <Image src="/svg/SmilePlusProductLogo.svg" maxW="303px" w="100%" height="auto" />
          <Text
            mt="37px"
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="600"
            fontSize={{ base: "26px", md: "30px" }}
            line-height={{ base: "36px", md: "42px" }}
            _selection={{
              color: "white",
              background: "brandPink.100",
            }}
          >
            {t("udiniHomeV2:smileText1")}
          </Text>
          <Text
            mt="23px"
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={{ base: "20px", md: "24px" }}
            line-height={{ base: "24px", md: "29px" }}
            _selection={{
              color: "white",
              background: "brandBlue.100",
            }}
          >
            {t("udiniHomeV2:smileText2")}
          </Text>
          <Text
            mt="40px"
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="bolder"
            fontSize={{ base: "20px", md: "24px" }}
            line-height={{ base: "24px", md: "29px" }}
            letterSpacing="0.03em"
            _selection={{
              color: "white",
              background: "brandPink.100",
            }}
          >
            {t("udiniHomeV2:smileText3")}
          </Text>
          {isHome && (
            <>
              <Text
                mt="75px"
                mb="20px"
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="normal"
                fontSize="20px"
                lineHeight="25px"
              >
                {t("udiniHomeV2:smileEmailText")}
              </Text>
              <UdiniSharedInlineEmailForm isHome />
            </>
          )}
        </Flex>
      </Flex>
      <Box
        minW="280px"
        maxW="550px"
        w="100%"
        height="auto"
        justifySelf={{ base: "initial", md: "end", lg: "left" }}
        ml={{ lg: "10%" }}
      >
        <UdiniSharedSmileCarousel pictures={PICTURES} />
      </Box>
    </SimpleGrid>
  );
};

export default UdiniSharedSmileView;
