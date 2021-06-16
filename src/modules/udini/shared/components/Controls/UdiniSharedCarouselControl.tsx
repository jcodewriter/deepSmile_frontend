import React from "react";
import { Flex, Box, TextProps, FlexProps, Image } from "@chakra-ui/core";
import { Info, BigTitle, Subtitle } from "../Views/UdiniSharedTextsView";
import ImageWithSkeleton from "src/shared/components/ImageWithSkeleton";

interface CarouselButtonProps {
  onClick: () => void;
  active: boolean;
}

interface CarouselArrowButtonProps {
  onClick: (i: number) => void;
  active: number;
  total: number;
  color: string;
}

export const CarouselArrowButton = ({
  onClick,
  active,
  total,
  color,
}: CarouselArrowButtonProps) => {
  return (
    <Flex
      direction="column"
      width="76px"
      height="76px"
      onClick={() => onClick((active + 1) % total)}
      bottom={0}
      right={0}
      position="absolute"
    >
      <Image
        position="absolute"
        top="50%"
        left="50%"
        mt="-8px"
        src="/img/home/carousel_button.png"
      />
      <Box backgroundColor="#FFFFFF" minHeight="56px" width="100%" />
      <Box backgroundColor={color} minHeight="20px" flexGrow={1} />
    </Flex>
  );
};

export const CarouselButton = ({ onClick, active }: CarouselButtonProps) => (
  <Box
    height="4px"
    width="48px"
    cursor="pointer"
    onClick={onClick}
    backgroundColor={active ? "#C71870" : "#FFFFFF"}
    mr="10px"
    transition="200ms"
  />
);

interface CarouselSelectorButtonProps {
  onClick: (i: number) => void;
  active: number;
  total: number;
}
export const CarouselSelectorButton = ({ onClick, active, total }: CarouselSelectorButtonProps) => (
  <Flex direction="row" align="center" justify="center">
    <Box
      cursor="pointer"
      width="10px"
      height="10px"
      border="2px solid #313131"
      transform="rotate(45deg)"
      borderWidth="0 0 2px 2px"
      onClick={() => onClick(active === 0 ? total - 1 : active - 1)}
    />
    <Info mx="5px">
      {active + 1}/{total}
    </Info>
    <Box
      cursor="pointer"
      width="10px"
      height="10px"
      border="2px solid #313131"
      transform="rotate(45deg)"
      borderWidth="2px 2px 0 0"
      onClick={() => onClick((active + 1) % total)}
    />
  </Flex>
);

interface CarouselTextsProps extends FlexProps {
  texts: (string | React.ReactNode)[];
  active: number;
  Text: React.ReactType;
  styleText?: TextProps;
}

export const CarouselTexts = ({
  texts,
  active,
  Text,
  styleText = {},
  ...rest
}: CarouselTextsProps) => (
  <Flex direction="row" justify="start" overflow="hidden" width="100%" maxWidth="90vw" {...rest}>
    {texts.map((e: string | React.ReactNode, i: number) => (
      <Text
        {...styleText}
        key={i}
        color="brandGrey.100"
        minW="100%"
        position="relative"
        transition="500ms"
        left={(active === i ? 0 - i * 100 : active < i ? 150 - i * 100 : -150 - i * 100) + "%"}
      >
        {e}
      </Text>
    ))}
  </Flex>
);

interface CarouselTitleSubtitleProps extends FlexProps {
  texts: { title: string; subtitle: string }[];
  active: number;
}

export const CarouselTitleSubtitle = ({ texts, active, ...rest }: CarouselTitleSubtitleProps) => (
  <Flex direction="row" justify="start" overflow="hidden" width="100%" maxWidth="90vw" {...rest}>
    {texts.map(({ title, subtitle }, i: number) => (
      <Box
        key={i}
        minW="100%"
        position="relative"
        transition="500ms"
        left={(active === i ? 0 - i * 100 : active < i ? 150 - i * 100 : -150 - i * 100) + "%"}
      >
        <BigTitle color="#FFFFFF">{title}</BigTitle>
        <Subtitle color="#FFFFFF" mt="10px">
          {subtitle}
        </Subtitle>
      </Box>
    ))}
  </Flex>
);

export const CarouselPictureStacked = ({ pictures }: { pictures: string[][] }) => {
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
      marginRight={{ base: "5%", sm: 0 }}
    >
      <Flex direction="row" justify="start" overflow="hidden" w="100%">
        {pictures.map((e, i: number) => (
          <Flex
            direction="column"
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
              <ImageWithSkeleton key={imgSrc} src={imgSrc} mb="20px" maxW="550px" h="365px" />
            ))}
          </Flex>
        ))}
      </Flex>
      {/* <CarouselSelectorButton onClick={onClick} active={active} total={pictures.length} /> */}
      <CarouselArrowButton
        onClick={handleClickCarousel}
        color="brandBlue.100"
        active={currentCarousel}
        total={pictures.length}
      />
    </Flex>
  );
};
