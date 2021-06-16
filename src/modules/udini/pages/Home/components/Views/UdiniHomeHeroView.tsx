import { Image, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";

/* //eslint-disable-next-line
const ScrollButton = ({ onClick, order }: { onClick: any; order: number }) => {
  return (
    <VStack
      order={order}
      as="button"
      onClick={onClick}
      justifySelf={{ base: "center", sm: "end" }}
      _focus={{ boxShadow: "box-shadow: none !important", outline: "0 !important" }}
      gridColumn={{ base: "initial", sm: "span 2" }}
      mt={{ base: "60px", sm: "initial" }}
    >
      <Text
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="600"
        fontSize="13px"
        lineHeight="16px"
        letterSpacing="0.15em"
        textTransform="uppercase"
        color="#4F4F4F"
      >
        Scroll
      </Text>
      <Image src="/svg/chevron_down.svg" />
    </VStack>
  );
}; */
//eslint-disable-next-line
const ScrollButtonMobile = ({ onClick }: { onClick: any }) => {
  return (
    <VStack
      display={{ base: "inherit", sm: "none" }}
      as="button"
      onClick={onClick}
      _focus={{ boxShadow: "box-shadow: none !important", outline: "0 !important" }}
    >
      <Text
        //mt="80px"
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="600"
        fontSize="13px"
        lineHeight="16px"
        letterSpacing="0.15em"
        textTransform="uppercase"
        color="#4F4F4F"
      >
        Scroll
      </Text>
      <Image src="/svg/chevron_down.svg" />
    </VStack>
  );
};

//eslint-disable-next-line
const ScrollButtonDesktop = ({ onClick }: { onClick: any }) => {
  return (
    <VStack
      display={{ base: "none", sm: "inherit" }}
      as="button"
      onClick={onClick}
      position="absolute"
      top="10.5%"
      left="85%"
      _focus={{ boxShadow: "box-shadow: none !important", outline: "0 !important" }}
      gridColumn={{ base: "initial", sm: "span 2" }}
      mt={{ base: "60px", sm: "initial" }}
    >
      <Text
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="600"
        fontSize="13px"
        lineHeight="16px"
        letterSpacing="0.15em"
        textTransform="uppercase"
        color="#4F4F4F"
      >
        Scroll
      </Text>
      <Image src="/svg/chevron_down.svg" />
    </VStack>
  );
};

//eslint-disable-next-line
const UdiniHomeHeroView = ({ onClick }: { onClick: any }) => {
  const { t } = useTranslation();

  return (
    <MainBox minH="calc(100vh - 148px)" paddingY={{ base: 0, sm: "40px" }}>
      <SimpleGrid
        templateColumns={{ base: "1fr", sm: "1.5fr 1fr" }}
        alignItems="center"
        justifyItems="center"
        rowGap="20px"
      >
        <ScrollButtonDesktop onClick={onClick} />
        <Stack
          spacing="49px"
          order={{ base: 2, sm: 1 }}
          alignItems={{ base: "center", sm: "flex-start" }}
          justifyItems={{ base: "center", sm: "flex-start" }}
        >
          <Text
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="normal"
            fontSize={{ base: "42px", sm: "76px" }}
            lineHeight={{ base: "56px", sm: "83px" }}
            maxWidth={{ base: "328px", sm: "662px" }}
          >
            {t("udiniHomeV2:heroTitle")}
          </Text>

          <Text
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="normal"
            fontSize="20px"
            lineHeight="25px"
            letterSpacing="0.05em"
            maxWidth={{ base: "450px", sm: "500px" }}
          >
            {t("udiniHomeV2:heroText")}
          </Text>
          <ScrollButtonMobile onClick={onClick} />
        </Stack>

        <Image
          order={{ base: 1, sm: 2 }}
          src="/svg/home/udini_diagonal_logo.svg"
          transform="rotate(132.29)"
          minW="260px"
          maxW="550px"
          w="100%"
          height="auto"
        />
      </SimpleGrid>
    </MainBox>
  );
};

export default UdiniHomeHeroView;
