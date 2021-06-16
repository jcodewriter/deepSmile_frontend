import React from "react";
import { Flex, Grid, Image } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

const UdiniPixPartnersView = () => {
  const { t } = useTranslation();
  const partners = [
    {
      img: "/svg/kitview.svg",
      alt: "kitview",
    },
    {
      img: "/svg/orthokis.svg",
      alt: "orthokis",
    },
    {
      img: "/svg/ortholeader.svg",
      alt: "ortholeader",
    },
    {
      img: "/img/pix/orthalis_white.png",
      alt: "orthalis",
    },
  ];

  return (
    <MainBox backgroundColor="brandBlue.100">
      <Flex direction="column" align="center" width="100%" py="80px">
        <Subtitle color="#FFFFFF" textAlign="center" width={{ base: "90%", md: "70%" }}>
          {t("udiniPix:descriptionSectionText")}
        </Subtitle>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
          mt="50px"
          gap={{ base: 0, md: 10 }}
          align="right"
        >
          {partners.map((e, i) => (
            <Image key={i} src={e.img} alt={e.alt} alignSelf="center" />
          ))}
        </Grid>
      </Flex>
    </MainBox>
  );
};

export default UdiniPixPartnersView;
