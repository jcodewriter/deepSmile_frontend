import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { Quote } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import {
  CarouselTexts,
  CarouselButton,
} from "src/modules/udini/shared/components/Controls/UdiniSharedCarouselControl";
import useTranslation from "next-translate/useTranslation";

const UdiniAboutQuotesView = () => {
  const { t } = useTranslation();
  const [currentCarousel, setCurrentCarousel] = useState(0);

  useEffect(() => {
    const next = (currentCarousel + 1) % quotes.length;
    const id = setTimeout(() => setCurrentCarousel(next), 4000);
    return () => clearTimeout(id);
  }, [currentCarousel]);

  const quotes = [
    <>
      {t("udiniAbout:testimonialsSectionFirstCarousel")}
      <br />– {t("udiniAbout:testimonialsSectionFirstAuthor")}
    </>,
    <>
      {t("udiniAbout:testimonialsSectionSecondCarousel")}
      <br />– {t("udiniAbout:testimonialsSectionSecondAuthor")}
    </>,
    <>
      {t("udiniAbout:testimonialsSectionThirdCarousel")}
      <br />– {t("udiniAbout:testimonialsSectionThirdAuthor")}
    </>,
  ];

  return (
    <MainBox backgroundColor="brandGrey.900">
      <Flex width="100%" direction="column" align="center" my="100px">
        <CarouselTexts
          texts={quotes}
          active={currentCarousel}
          Text={Quote}
          styleText={{ textAlign: "center" }}
        />
        <Flex direction="row" justify="center" mt="40px">
          {quotes.map((_, i) => (
            <CarouselButton
              onClick={() => setCurrentCarousel(i)}
              active={currentCarousel === i}
              key={i}
            />
          ))}
        </Flex>
      </Flex>
    </MainBox>
  );
};

export default UdiniAboutQuotesView;
