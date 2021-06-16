import React, { useMemo } from "react";
import { Flex, Box, Image, Text, SimpleGrid, Link } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import Tag from "src/modules/udini/shared/components/Views/UdiniSharedTagView";
import { MidTitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

const UdiniAboutTeamView = () => {
  const { t } = useTranslation();

  const team = useMemo(
    () => [
      {
        img: "/img/about/edouard_ladroit.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName1"),
        lastName: t("udiniAbout:teamSectionPersonLastName1"),
        role: t("udiniAbout:teamSectionPosition1"),
        linkedin: t("udiniAbout:teamSectionLinkedin1"),
      },
      {
        img: "/img/about/hugo_setbon.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName2"),
        lastName: t("udiniAbout:teamSectionPersonLastName2"),
        role: t("udiniAbout:teamSectionPosition2"),
        linkedin: t("udiniAbout:teamSectionLinkedin2"),
      },
      {
        img: "/img/about/julien_strippoli.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName3"),
        lastName: t("udiniAbout:teamSectionPersonLastName3"),
        role: t("udiniAbout:teamSectionPosition3"),
        linkedin: t("udiniAbout:teamSectionLinkedin3"),
      },
      {
        img: "/img/about/aurelien_thollot.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName4"),
        lastName: t("udiniAbout:teamSectionPersonLastName4"),
        role: t("udiniAbout:teamSectionPosition4"),
        linkedin: t("udiniAbout:teamSectionLinkedin4"),
      },
      {
        img: "/img/about/achraf_ben_hamadou.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName5"),
        lastName: t("udiniAbout:teamSectionPersonLastName5"),
        role: t("udiniAbout:teamSectionPosition5"),
        linkedin: t("udiniAbout:teamSectionLinkedin5"),
      },
      {
        img: "/img/about/cyril_trosset.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName6"),
        lastName: t("udiniAbout:teamSectionPersonLastName6"),
        role: t("udiniAbout:teamSectionPosition6"),
        linkedin: t("udiniAbout:teamSectionLinkedin6"),
      },
      {
        img: "/img/about/houda_chaabouni_chouayakh.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName7"),
        lastName: t("udiniAbout:teamSectionPersonLastName7"),
        role: t("udiniAbout:teamSectionPosition7"),
        linkedin: t("udiniAbout:teamSectionLinkedin7"),
      },
      {
        img: "/img/about/ahmed_rekik.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName8"),
        lastName: t("udiniAbout:teamSectionPersonLastName8"),
        role: t("udiniAbout:teamSectionPosition8"),
        linkedin: t("udiniAbout:teamSectionLinkedin8"),
      },
      {
        img: "/img/about/firas_bouzguenda.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName9"),
        lastName: t("udiniAbout:teamSectionPersonLastName9"),
        role: t("udiniAbout:teamSectionPosition9"),
        linkedin: t("udiniAbout:teamSectionLinkedin9"),
      },
      {
        img: "/img/about/najmeddine_dhieb.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName10"),
        lastName: t("udiniAbout:teamSectionPersonLastName10"),
        role: t("udiniAbout:teamSectionPosition10"),
        linkedin: t("udiniAbout:teamSectionLinkedin10"),
      },
    ],
    []
  );

  return (
    <MainBox backgroundColor="brandGrey.900" overflowX="hidden">
      <Flex direction="column" py="110px">
        <Tag>{t("udiniAbout:teamSectionTag")}</Tag>
        <MidTitle color="#FFFFFF" my="35px" maxW={{ base: "90%", md: "80%", lg: "60%" }}>
          {t("udiniAbout:teamSectionText")}
        </MidTitle>
        <SimpleGrid
          columnGap={0}
          transition="500ms"
          justifyItems="center"
          pt="30px"
          minChildWidth="220px"
        >
          {team.map(({ img, linkedin, firstName, role }, i: number) => (
            <Box key={i} opacity="1" transition="500ms" position="relative" top="0" role="group">
              <ImageWithSkeleton src={img} _groupHover={{ opacity: 0.5 }} />
              <Box
                w="100%"
                position="absolute"
                bottom="25px"
                left="15px"
                opacity="0"
                transition="500ms"
                _groupHover={{ opacity: 1 }}
              >
                <Text
                  color="white"
                  fontFamily="Montserrat"
                  fontStyle="normal"
                  fontWeight="bold"
                  fontSize="30px"
                  lineHeight="100%"
                >
                  {firstName}
                </Text>
                <Text fontFamily="Montserrat" fontSize="12px" fontWeight="600" color="#FFFFFF">
                  {role}
                </Text>
                <Link href={linkedin} isExternal={true}>
                  <Image src="/svg/drawer/linkedin_white.svg"></Image>
                </Link>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </MainBox>
  );
};

export default UdiniAboutTeamView;
