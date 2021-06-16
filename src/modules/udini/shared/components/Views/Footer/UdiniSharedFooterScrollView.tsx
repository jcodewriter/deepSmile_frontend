import { Flex, Image, Text, VStack } from "@chakra-ui/core";

//eslint-disable-next-line
const UdiniSharedFooterScrollView = ({ onClick }: { onClick: any }) => {
  return (
    <VStack
      width={{ base: "19.44%", sm: "9.3%" }}
      position="absolute"
      bottom="0%"
      right="0%"
      justifyContent="center"
    >
      <Flex
        direction="column"
        as="button"
        onClick={onClick}
        _focus={{ boxShadow: "box-shadow: none !important", outline: "0 !important" }}
        alignItems="center"
        padding="5"
        backgroundColor="#4F4F4F"
      >
        <Text
          mb="19px"
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="600"
          fontSize="26px"
          lineHeight="32px"
          letterSpacing="-0.05em"
          color="#BDBDBD"
        >
          Top
        </Text>
        <Image src="/svg/arrow_up.svg" />
      </Flex>
    </VStack>
  );
};

export default UdiniSharedFooterScrollView;
