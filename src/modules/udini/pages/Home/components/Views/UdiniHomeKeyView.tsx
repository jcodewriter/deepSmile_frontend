import { Box, Flex, Image, Text, Stack, SimpleGrid } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";

const BulletTitle = ({ title, color }: { title: string; color: string }) => {
  return (
    <Flex direction="row" alignItems="center">
      <Box w="16px" h="16px" borderWidth="2px" borderRadius={16 / 2} borderColor={color} />
      <Text
        ml="21px"
        color={color}
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="500"
        fontSize={{ base: "24px", md: "30px" }}
        lineHeight={{ base: "29px", md: "37px" }}
        letterSpacing="0.04em"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </Flex>
  );
};

const BulletItem = ({ text }: { text: string }) => {
  return (
    <Text
      color="#333333"
      //fontFamily="Century Gothic"
      fontFamily="Montserrat"
      fontStyle="normal"
      fontWeight="normal"
      fontSize={{ base: "16px", md: "20px" }}
      lineHeight={{ base: "20px", md: "26px" }}
    >
      {text}
    </Text>
  );
};

const UdiniHomeKeyView = () => {
  const { t } = useTranslation();

  const bullets = [
    {
      title: t("udiniHomeV2:key1Title"),
      color: "brandPink.100",
      texts: ["- " + t("udiniHomeV2:key1Text1"), "- " + t("udiniHomeV2:key1Text2")],
    },
    {
      title: t("udiniHomeV2:key2Title"),
      color: "brandBlue.100",
      texts: [
        "- " + t("udiniHomeV2:key2Text1"),
        "- " + t("udiniHomeV2:key2Text2"),
        "- " + t("udiniHomeV2:key2Text3"),
      ],
    },
    {
      title: t("udiniHomeV2:key3Title"),
      color: "brandPurple.100",
      texts: ["- " + t("udiniHomeV2:key3Text1"), "- " + t("udiniHomeV2:key3Text2")],
    },
  ];
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      justifyItems={{ base: "center", md: "initial" }}
      minH="722px"
    >
      <Flex
        flex="1"
        alignItems="center"
        justifyContent="center"
        backgroundColor={{ base: "white", md: "#EEEEEE" }}
        paddingX="16px"
        paddingY="35px"
      >
        <Image
          src="/svg/home/udini_key.svg"
          maxWidth={{ base: "298.995px", md: "483px" }}
          maxHeight={{ base: "289.14px", md: "439px" }}
          height="auto"
          width="100%"
        />
      </Flex>
      <Stack
        flex="1"
        justify="center"
        spacing="55px"
        paddingLeft={{ base: "16px", md: "86px" }}
        paddingRight="16px"
        paddingY={{ base: "35px", md: 0 }}
      >
        {bullets.map((bullet) => (
          <Flex direction="column" key={bullet.title} maxW="532px">
            <BulletTitle color={bullet.color} title={bullet.title} />
            {bullet.texts.map((bulletText) => (
              <BulletItem key={bulletText} text={bulletText} />
            ))}
          </Flex>
        ))}
      </Stack>
    </SimpleGrid>
  );
};

export default UdiniHomeKeyView;
