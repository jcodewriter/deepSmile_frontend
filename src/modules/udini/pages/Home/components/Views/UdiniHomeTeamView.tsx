import React, { useMemo } from "react";
import { Box, Image, Text, Link, Grid } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

interface TeamProp {
  team: { img: string; linkedin: string; firstName: string; role: string }[];
}

const DesktopView = ({ team }: TeamProp) => (
  <Grid
    templateColumns={{ base: "repeat(0, 0fr)", md: "repeat(5, 1fr)" }}
    gap={0}
    display={{ base: "none", md: "grid" }}
  >
    {team.map(({ img, linkedin, firstName, role }, i: number) => (
      <Box backgroundColor="brandGrey.900" key={i}>
        <Box key={i} opacity="1" transition="500ms" position="relative" top="0" role="group">
          <ImageWithSkeleton src={img} _groupHover={{ opacity: "0.5" }} />
          <Box
            w="100%"
            position="absolute"
            bottom="25px"
            left="15px"
            opacity="0"
            transition="500ms"
            _groupHover={{ opacity: 1 }}
          >
            <Link href={linkedin} isExternal={true}>
              <Image src="/svg/drawer/linkedin_white.svg" width="8%" height="auto"></Image>
            </Link>
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
          </Box>
        </Box>
      </Box>
    ))}
  </Grid>
);

const TabletView = ({ team }: TeamProp) => (
  <Box
    display={{ base: "flex", md: "none" }}
    flexDirection="row"
    justifyContent="flex-start"
    flexWrap="nowrap"
    overflowX="scroll"
    css={`
      /* https://developer.mozilla.org/fr/docs/Web/CSS/::-webkit-scrollbar */
      ::-webkit-scrollbar {
        margin-top: 50px;
        background-color: #c4c4c4;
        height: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background-color: #4f4f4f;
      }
    `}
  >
    {team.map(({ img, linkedin, firstName, role }, i: number) => (
      <Box backgroundColor="brandGrey.900" key={i}>
        <Box key={i} opacity={1} transition="500ms" position="relative" top="0" role="group">
          <Image src={img} minWidth="288px" minHeight="441px" _groupHover={{ opacity: "0.5" }} />
          <Box
            w="100%"
            minWidth="50px"
            position="absolute"
            bottom="25px"
            left="15px"
            opacity="0"
            transition="500ms"
            _groupHover={{ opacity: "1" }}
          >
            <Link href={linkedin} isExternal={true}>
              <Image src="/svg/drawer/linkedin_white.svg" width="8%" height="auto"></Image>
            </Link>
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
          </Box>
        </Box>
      </Box>
    ))}
  </Box>
);

const UdiniHomeTeamView = () => {
  const { t } = useTranslation();

  const team = useMemo(
    () => [
      {
        img: "/img/about/edouard.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName1"),
        lastName: t("udiniAbout:teamSectionPersonLastName1"),
        role: t("udiniAbout:teamSectionPosition1"),
        linkedin: t("udiniAbout:teamSectionLinkedin1"),
      },
      {
        img: "/img/about/hugo.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName2"),
        lastName: t("udiniAbout:teamSectionPersonLastName2"),
        role: t("udiniAbout:teamSectionPosition2"),
        linkedin: t("udiniAbout:teamSectionLinkedin2"),
      },
      {
        img: "/img/about/julien.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName3"),
        lastName: t("udiniAbout:teamSectionPersonLastName3"),
        role: t("udiniAbout:teamSectionPosition3"),
        linkedin: t("udiniAbout:teamSectionLinkedin3"),
      },
      {
        img: "/img/about/aurelien.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName4"),
        lastName: t("udiniAbout:teamSectionPersonLastName4"),
        role: t("udiniAbout:teamSectionPosition4"),
        linkedin: t("udiniAbout:teamSectionLinkedin4"),
      },
      {
        img: "/img/about/achraf.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName5"),
        lastName: t("udiniAbout:teamSectionPersonLastName5"),
        role: t("udiniAbout:teamSectionPosition5"),
        linkedin: t("udiniAbout:teamSectionLinkedin5"),
      },
      {
        img: "/img/about/cyril.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName6"),
        lastName: t("udiniAbout:teamSectionPersonLastName6"),
        role: t("udiniAbout:teamSectionPosition6"),
        linkedin: t("udiniAbout:teamSectionLinkedin6"),
      },
      {
        img: "/img/about/houda.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName7"),
        lastName: t("udiniAbout:teamSectionPersonLastName7"),
        role: t("udiniAbout:teamSectionPosition7"),
        linkedin: t("udiniAbout:teamSectionLinkedin7"),
      },
      {
        img: "/img/about/ahmed.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName8"),
        lastName: t("udiniAbout:teamSectionPersonLastName8"),
        role: t("udiniAbout:teamSectionPosition8"),
        linkedin: t("udiniAbout:teamSectionLinkedin8"),
      },
      {
        img: "/img/about/firas.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName9"),
        lastName: t("udiniAbout:teamSectionPersonLastName9"),
        role: t("udiniAbout:teamSectionPosition9"),
        linkedin: t("udiniAbout:teamSectionLinkedin9"),
      },
      {
        img: "/img/about/najmeddine.png",
        firstName: t("udiniAbout:teamSectionPersonFirstName10"),
        lastName: t("udiniAbout:teamSectionPersonLastName10"),
        role: t("udiniAbout:teamSectionPosition10"),
        linkedin: t("udiniAbout:teamSectionLinkedin10"),
      },
    ],
    []
  );

  return (
    <>
      <DesktopView team={team} />
      <TabletView team={team} />
    </>
  );
};

export default UdiniHomeTeamView;
