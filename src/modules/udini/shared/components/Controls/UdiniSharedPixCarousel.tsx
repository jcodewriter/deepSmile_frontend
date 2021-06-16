import React from "react";
import { Flex } from "@chakra-ui/core";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";
import { CarouselArrowButton } from "./UdiniSharedCarouselControl";

const UdiniSharedPixCarousel = ({ pictures }: { pictures: string[][] }) => {
  const [currentCarousel, setCurrentCarousel] = React.useState(0);

  React.useEffect(() => {
    const next = (currentCarousel + 1) % pictures.length;
    const id = setTimeout(() => setCurrentCarousel(next), 4000);
    return () => clearTimeout(id);
  }, [currentCarousel]);

  const handleClickCarousel = (i: number) => setCurrentCarousel(i);

  return (
    <Flex
      direction="column"
      align="center"
      w="auto"
      h="auto"
      position="relative"
      maxW="550px"
      marginRight={{ base: 0, sm: 0, md: 0 }}
    >
      <Flex direction="row" justifySelf="flex-start" justify="start" overflow="hidden" w="100%">
        {pictures.map((e, i: number) => (
          <Flex
            direction="column"
            alignSelf="flex-start"
            align="center"
            key={i}
            position="relative"
            transition="500ms"
            maxW="100%"
            left={
              (currentCarousel === i
                ? 0 - i * 100
                : currentCarousel < i
                ? 150 - i * 100
                : -150 - i * 100) + "%"
            }
          >
            {e.map((imgSrc) => (
              <ImageWithSkeleton
                justifySelf="flex-start"
                key={imgSrc}
                src={imgSrc}
                maxW="550px"
                h="365px"
              />
            ))}
          </Flex>
        ))}
      </Flex>
      <CarouselArrowButton
        onClick={handleClickCarousel}
        color="brandBlue.100"
        active={currentCarousel}
        total={pictures.length}
      />
    </Flex>
  );
};

export default UdiniSharedPixCarousel;
