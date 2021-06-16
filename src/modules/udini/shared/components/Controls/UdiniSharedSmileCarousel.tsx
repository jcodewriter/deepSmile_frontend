import React from "react";
import { Flex, Image } from "@chakra-ui/core";
import { CarouselArrowButton } from "./UdiniSharedCarouselControl";

const UdiniSharedSmileCarousel = ({ pictures }: { pictures: string[] }) => {
  const [currentCarousel, setCurrentCarousel] = React.useState(0);

  React.useEffect(() => {
    const next = (currentCarousel + 1) % pictures.length;
    const id = setTimeout(() => setCurrentCarousel(next), 4000);
    return () => clearTimeout(id);
  }, [currentCarousel]);

  const handleClickCarousel = (i: number) => setCurrentCarousel(i);

  return (
    <Flex
      direction="row"
      justify="start"
      overflow="hidden"
      w="auto"
      maxW="550px"
      position="relative"
      h="auto"
      marginLeft={{ base: 0, md: 0, sm: 0 }}
    >
      {pictures.map((e, i: number) => (
        <Image
          key={i}
          alignSelf="flex-start"
          transition="500ms"
          position="relative"
          left={`-${currentCarousel * 100}%`}
          src={e}
          maxWidth="550px"
          maxH="730px"
          w="100%"
          height="auto"
        />
      ))}
      <CarouselArrowButton
        onClick={handleClickCarousel}
        color="brandPink.100"
        active={currentCarousel}
        total={pictures.length}
      />
    </Flex>
  );
};

export default UdiniSharedSmileCarousel;
