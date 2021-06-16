import React from "react";
import { Flex, Image, SimpleGrid, Link } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { MidTitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

const UdiniCommunitySocialView = () => {
  const { t } = useTranslation();
  const partners = [
    {
      img: "/svg/community/facebook.svg",
      alt: "facebook",
      href: "https://www.facebook.com/udinidental",
    },
    {
      img: "/svg/community/instagram.svg",
      alt: "instagram",
      href: "https://www.instagram.com/udinidental/?hl=fr",
    },
    {
      img: "/svg/community/linkedin.svg",
      alt: "linkedin",
      href: "https://www.linkedin.com/company/45946123/",
    },
  ];

  return (
    <MainBox backgroundColor="#FFFFFF">
      <Flex direction="column" align="center" width="100%" mt="120px" mb="140px">
        <MidTitle color="#000000" textAlign="center" width={{ base: "90%", md: "70%" }}>
          {t("udiniCommunity:socialSectionTitle")}
        </MidTitle>
        <SimpleGrid
          mt="50px"
          columns={{ base: 1, md: 3 }}
          rowGap="50px"
          width={{ base: "100%", md: "60%" }}
          align="center"
        >
          {partners.map((e, i) => (
            <Link key={i} isExternal href={e.href}>
              <Image cursor="pointer" key={i} src={e.img} alt={e.alt} alignSelf="center" />
            </Link>
          ))}
        </SimpleGrid>
      </Flex>
    </MainBox>
  );
};

export default UdiniCommunitySocialView;
