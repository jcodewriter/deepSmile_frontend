import { Flex, Image, Text, TextProps } from "@chakra-ui/core";

interface UdiniHomeSlidingTitleViewProps extends TextProps {
  id: string;
  flexWidth: string | { base: string; sm: string };
  title: string;
  img: string;
  basemb: string;
  mdmb: string;
  basemt: string;
  mdmt: string;
  imageBaseMargin: string;
  parallaxStart: string;
  parallaxSpeed: string;
  fontSize?: string | { base: string; xs: string; sm: string; md: string; lg: string };
}

const UdiniHomeSlidingTitleView = ({
  id,
  flexWidth,
  title,
  img,
  basemb,
  mdmb,
  basemt,
  mdmt,
  imageBaseMargin,
  parallaxStart,
  parallaxSpeed,
  ...textProps
}: UdiniHomeSlidingTitleViewProps) => {
  return (
    <div id={id}>
      <Flex
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed={parallaxSpeed}
        data-scroll-target={`#${id}`}
        width={flexWidth}
        height="auto"
        overflow="hidden"
        justify="center"
        align="center"
        mb={{ base: basemb, md: mdmb }}
        mt={{ base: basemt, md: mdmt }}
        transform={`translateX(${parallaxStart})`}
      >
        <Text
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight={{ base: "bold", md: "normal" }}
          fontSize={{ base: "44px", sm: "150px", md: "150px" }}
          lineHeight="108.9%"
          {...textProps}
        >
          {title}
        </Text>
        <Image
          ml={{ base: `${imageBaseMargin}`, sm: "78px" }}
          mr={{ base: `${imageBaseMargin}`, sm: "78px" }}
          src={img}
        />
        <Text
          color="transparent"
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="normal"
          style={{ WebkitTextStroke: "2px black" }}
          fontSize={{ base: "44px", sm: "150px", md: "150px" }}
          lineHeight="108.9%"
          {...textProps}
        >
          {title}
        </Text>
      </Flex>
    </div>
  );
};

export default UdiniHomeSlidingTitleView;
