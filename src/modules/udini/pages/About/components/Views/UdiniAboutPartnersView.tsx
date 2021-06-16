import React from "react";
import { Flex, SimpleGrid, Box } from "@chakra-ui/core";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import useTranslation from "next-translate/useTranslation";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";

const UdiniAboutPartnersView = () => {
  const { t } = useTranslation();
  const partners = [
    {
      img: "/img/about/inria.png",
      alt: "inria",
      width: "162px",
      height: "69px",
    },
    {
      img: "/img/about/region-sud.png",
      alt: "region sud",
      width: "140px",
      height: "78px",
    },
    {
      img: "/img/about/incubateur_belle_de_mai.png",
      alt: "incubateur belle de mai",
      width: "160px",
      height: "160px",
    },
    {
      img: "/img/about/innOralis_logo.png",
      alt: "innOralis",
      width: "205px",
      height: "75px",
    },
    {
      img: "/img/about/pays-daix-developpement.png",
      alt: "pays d'aix développement",
      width: "129px",
      height: "128px",
    },
  ];

  return (
    <Box>
      <MainBox backgroundColor="white">
        <Flex direction="column" width="100%" py="30px">
          <Tag>{t("udiniAbout:partnersSectionTag")}</Tag>
        </Flex>
      </MainBox>
      <SimpleGrid mb="85px" rowGap="20px" columns={{ base: 1, sm: 1, md: 5 }} width="100%">
        {partners.map((e, i) => (
          <Flex key={i} height="150px" align="center" justify="center">
            <ImageWithSkeleton src={e.img} alt={e.alt} maxW={e.width} maxH={e.height} />
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default UdiniAboutPartnersView;
