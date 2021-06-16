import React, { useState, useEffect } from "react";
import { Flex, Box, Image } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import {
  CarouselButton,
  CarouselTitleSubtitle,
} from "src/modules/udini/shared/components/Controls/UdiniSharedCarouselControl";

import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { UDINI_ABOUT_ROUTE } from "src/utils/constants/routes";

const UdiniHomeTitleView = () => {
  const { t } = useTranslation();
  const [currentCarousel, setCurrentCarousel] = useState(0);

  useEffect(() => {
    const next = (currentCarousel + 1) % titles.length;
    const id = setTimeout(() => setCurrentCarousel(next), 4000);
    return () => clearTimeout(id);
  }, [currentCarousel]);

  const titles = [
    {
      title: t("udiniHome:firstCarouselTitle"),
      subtitle: t("udiniHome:firstCarouselText"),
    },
    {
      title: t("udiniHome:secondCarouselTitle"),
      subtitle: t("udiniHome:secondCarouselText"),
    },
    {
      title: t("udiniHome:thirdCarouselTitle"),
      subtitle: t("udiniHome:thirdCarouselText"),
    },
  ];

  return (
    <MainBox minHeight="700px" backgroundColor="brandGrey.900">
      <Flex
        direction="column"
        marginTop={{ base: "32px", sm: "16px" }}
        marginBottom="103px"
        align={{ base: "center", md: "initial" }}
      >
        <Flex direction="row" justify="center" mb="14px">
          <Image maxH="249px" src={"/svg/udini-logo.svg"} />
        </Flex>
        <Flex
          direction="row"
          justify="start"
          mb={{ base: "20px", md: "40px" }}
          alignSelf="flex-start"
        >
          {titles.map((_, i: number) => (
            <CarouselButton
              onClick={() => setCurrentCarousel(i)}
              active={currentCarousel === i}
              key={i}
            />
          ))}
        </Flex>
        <CarouselTitleSubtitle
          texts={titles}
          active={currentCarousel}
          paddingRight={{ base: "15px", md: 0 }}
          maxWidth={{ base: "100%", md: "80%" }}
        />
        <Box mt="30px">
          <SharedGradientButtonLink
            href={UDINI_ABOUT_ROUTE}
            background="brandGrey.900"
            color="white"
          >
            {t("udiniHome:carouselBtn")}
          </SharedGradientButtonLink>
        </Box>
      </Flex>
    </MainBox>
  );
};

export default UdiniHomeTitleView;
