import useTranslation from "next-translate/useTranslation";
import { Stack, Flex, SimpleGrid, Text } from "@chakra-ui/core";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";

const UdiniProductsPartnersView = () => {
  const { t } = useTranslation();

  const partners = [
    {
      img: "/svg/products/ortholeader_white.svg",
      alt: "ortholeader",
      width: "167px",
      height: "52px",
    },
    {
      img: "/svg/products/kitview_white.svg",
      alt: "kitview",
      width: "101px",
      height: "71px",
    },
    {
      img: "/svg/products/orthalis_white.svg",
      alt: "orthalis",
      width: "134px",
      height: "78px",
    },
    {
      img: "/svg/products/orthokis_white.svg",
      alt: "orthokis",
      width: "160px",
      height: "46px",
    },
  ];

  return (
    <MainBox bg="#000000" paddingY="62px">
      <Stack spacing="20px" justify="center" align="center" textAlign="center">
        <Text
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="500"
          fontSize="13px"
          lineHeight="16px"
          letterSpacing="0.15em"
          color="#FFFFFF"
          textTransform="uppercase"
        >
          {t("udiniProducts:partnersTitle")}
        </Text>
        <Text
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="normal"
          fontSize="50px"
          lineHeight="61px"
          color="#FFFFFF"
        >
          {t("udiniProducts:partnersText")}
        </Text>
        <SimpleGrid
          spacing="20px"
          columns={{ base: 1, sm: 2, md: 4 }}
          width="100%"
          justifyItems="center"
        >
          {partners.map((e, i) => (
            <Flex key={i} height="150px" align="center" justify="center">
              <ImageWithSkeleton src={e.img} alt={e.alt} maxW={e.width} maxH={e.height} />
            </Flex>
          ))}
        </SimpleGrid>
      </Stack>
    </MainBox>
  );
};

export default UdiniProductsPartnersView;
