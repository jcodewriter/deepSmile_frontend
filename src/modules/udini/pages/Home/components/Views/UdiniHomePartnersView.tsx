import { Flex, SimpleGrid, Text, Stack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

const partners = [
  {
    img: "/img/home/inria_white.png",
    alt: "inria",
    width: "162px",
    height: "69px",
  },
  {
    img: "/img/home/region_sud_white.png",
    alt: "region sud",
    width: "140px",
    height: "78px",
  },
  {
    img: "/img/home/belle_de_mai_white.png",
    alt: "incubateur belle de mai",
    width: "160px",
    height: "160px",
  },
  {
    img: "/img/home/innOralis_white.png",
    alt: "innOralis",
    width: "205px",
    height: "75px",
  },
  {
    img: "/img/home/pays_d_aix_white.png",
    alt: "pays d'aix développement",
    width: "129px",
    height: "128px",
  },
];

const UdiniHomePartnersView = () => {
  const { t } = useTranslation();

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
          {t("udiniHomeV2:partnersTitle")}
        </Text>
        <Text
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="normal"
          fontSize="50px"
          lineHeight="61px"
          color="#FFFFFF"
        >
          {t("udiniHomeV2:partnersText")}
        </Text>
        <SimpleGrid spacing="20px" columns={{ base: 1, sm: 3, md: 5 }} width="100%">
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

export default UdiniHomePartnersView;
