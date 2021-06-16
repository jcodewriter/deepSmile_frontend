import useTranslation from "next-translate/useTranslation";
import { Image, Text, SimpleGrid, Stack } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";

const UdiniProductsHeroView = () => {
  const { t } = useTranslation();

  return (
    <MainBox marginBottom={{ base: "84px", sm: "15px" }}>
      <SimpleGrid
        templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "1.5fr 1fr", lg: "1fr 752px" }}
        justifyItems="center"
      >
        <Stack
          direction="column"
          order={{ base: 2, sm: 1 }}
          maxWidth="554px"
          mt={{ base: 0, sm: "116px" }}
        >
          <SimpleGrid
            order={{ base: 3, sm: 1 }}
            mt={{ base: "25px", sm: "initial" }}
            columnGap="55px"
            rowGap="25px"
            columns={{ base: 1, sm: 3 }}
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="normal"
            fontSize="20px"
            lineHeight="24px"
            letterSpacing="0.15em"
            textTransform="uppercase"
            w="100%"
          >
            <Text
              color="brandBlue.300"
              _selection={{
                color: "white",
                backgroundColor: "brandBlue.300",
              }}
            >
              {t("udiniProducts:heroTag1")}
            </Text>
            <Text
              color="brandPink.900"
              _selection={{
                color: "white",
                backgroundColor: "brandPink.900",
              }}
            >
              {t("udiniProducts:heroTag2")}
            </Text>
            <Text
              color="brandPink.100"
              _selection={{
                color: "white",
                backgroundColor: "brandPink.100",
              }}
            >
              {t("udiniProducts:heroTag3")}
            </Text>
          </SimpleGrid>

          <Text
            order={{ base: 1, sm: 2 }}
            alignSelf="flex-start"
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={{ base: "42px", sm: "80px" }}
            lineHeight={{ base: "56px", sm: "93px" }}
            color="#111111"
            _selection={{
              color: "white",
              backgroundColor: "#111111",
            }}
          >
            {t("udiniProducts:heroTitle")}
          </Text>
          <Text
            order={{ base: 1, sm: 3 }}
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="normal"
            fontSize="20px"
            lineHeight="25px"
            letterSpacing="0.05em"
            color="#111111"
            _selection={{
              color: "white",
              backgroundColor: "brandBlue.100",
            }}
          >
            {t("udiniProducts:heroText")}
          </Text>
        </Stack>
        <Image
          mt={{ base: 0, md: "-15%" }}
          mb={{ base: "-15%", sm: 0 }}
          mr={{ base: "20%" }}
          order={{ base: 1, sm: 2 }}
          src="/img/products/udini_triangle2.png"
          maxW="725px"
          w="100%"
          h="auto"
          zIndex="-1"
        />
      </SimpleGrid>
    </MainBox>
  );
};

export default UdiniProductsHeroView;
