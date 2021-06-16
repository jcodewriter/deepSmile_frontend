import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import {
  CarouselButton,
  CarouselTexts,
} from "src/modules/udini/shared/components/Controls/UdiniSharedCarouselControl";
import { BigTitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

const UdiniAboutTitleView = () => {
  const { t } = useTranslation();
  const [currentCarousel, setCurrentCarousel] = useState(0);

  useEffect(() => {
    const next = (currentCarousel + 1) % titles.length;
    const id = setTimeout(() => setCurrentCarousel(next), 4000);
    return () => clearTimeout(id);
  }, [currentCarousel]);

  const titles = [
    t("udiniAbout:firstCarouselText"),
    t("udiniAbout:secondCarouselText"),
    t("udiniAbout:thirdCarouselText"),
  ];

  return (
    <MainBox minHeight="700px" backgroundColor="brandGrey.900">
      <Flex direction="column" marginTop="60px" marginBottom="100px">
        <Flex direction="row" justify="start" ml="10px" mb="40px">
          {titles.map((_, i: number) => (
            <CarouselButton
              onClick={() => setCurrentCarousel(i)}
              active={currentCarousel === i}
              key={i}
            />
          ))}
        </Flex>
        <CarouselTexts texts={titles} active={currentCarousel} Text={BigTitle} alignSelf="center" />
      </Flex>
    </MainBox>
  );
};

export default UdiniAboutTitleView;
