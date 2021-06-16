import { useQuery } from "@apollo/client";
import { Box, BoxProps, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { ReactText, useMemo } from "react";
import { PLANS2 } from "src/graphql/Queries/Plan";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { Plans2Payload } from "src/shared/types/Queries/Plan";
import { PIX_SIGNUP_ROUTE } from "src/utils/constants/routes";
import customTheme from "src/utils/theme";

interface GradientCardProps extends BoxProps {
  name: string;
  text: string;
  price: ReactText;
  gradient: string[];
  buttonTextColor: string;
  onClick: () => void;
}

const SubmitButton = ({ color }: { color: string }) => {
  const { t } = useTranslation();

  return (
    <Box
      as="button"
      minWidth="250px"
      minHeight="54px"
      backgroundColor="white"
      borderRadius="27px"
      _focus={{
        outline: "none",
      }}
    >
      <SharedNextTranslateLink href={PIX_SIGNUP_ROUTE}>
        <Text
          color={color}
          fontFamily="Montserrat"
          fontStyle="normal"
          fontWeight="500"
          fontSize={{ base: "16px", md: "20px" }}
          lineHeight={{ base: "19.5px", md: "24px" }}
          textAlign="center"
        >
          {t("udiniProducts:priceCardCreateAccount")}
        </Text>
      </SharedNextTranslateLink>
    </Box>
  );
};

const GradientCard = ({
  name,
  text,
  price,
  gradient,
  buttonTextColor,
  onClick,
}: GradientCardProps) => {
  const { t } = useTranslation();
  return (
    <Flex
      color="#FFFFFF"
      onClick={onClick}
      direction="column"
      align="center"
      background={`linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`}
      paddingTop="73px"
      paddingBottom={{ base: "38px", md: "53px" }}
      paddingX={{ base: "15px", sm: "20px", md: "40px" }}
      minWidth="260px"
      marginBottom={{ base: "50px", md: "0px" }}
      cursor="pointer"
      borderRadius="45px"
      boxShadow="-10px 15px 25px rgba(0, 0, 0, 0.25)"
    >
      <Text
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="600"
        fontSize="40px"
        lineHeight="49px"
        textAlign="center"
      >
        {name}
      </Text>
      <Text
        mt="65px"
        minHeight="54px"
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="500"
        fontSize="22px"
        lineHeight="27px"
        textAlign="center"
        justifySelf="center"
        maxW="222px"
      >
        {text}
      </Text>

      <Text
        mt="33px"
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="600"
        fontSize="60px"
        lineHeight="73px"
        textAlign="center"
      >
        {price ? price : price + "/" + t("udiniProducts:priceFrequency")}
      </Text>
      <Text
        mt="46px"
        mb={{ base: "34px", md: "66px" }}
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="500"
        fontSize="24px"
        lineHeight="29px"
        textAlign="center"
      >
        {t("udiniProducts:priceCardCommitment")}
      </Text>
      <Box alignSelf="center">
        <SubmitButton color={buttonTextColor} />
      </Box>
    </Flex>
  );
};

const UdiniProductsPricingView = () => {
  const { t, lang } = useTranslation();
  const { data: planData } = useQuery<Plans2Payload>(PLANS2);

  const priceFormatter = useMemo(() => {
    try {
      return new Intl.NumberFormat(lang, {
        style: "currency",
        currency: planData?.plans2.currency ?? "USD",
        minimumSignificantDigits: 1,
      });
    } catch (err) {
      console.error(err);
    }
  }, [planData?.plans2.currency]);

  const { colors } = customTheme;

  const gradients = [
    [colors.brandBlue["100"], colors.brandBlue["200"]],
    [colors.brandPink["100"], colors.brandPink["300"]],
    [colors.brandBlue["900"], colors.brandPink["900"]],
  ];

  const buttonTextColors = ["#0082A3", "#B90E88", "#5315F1"];

  return (
    <VStack
      as="section"
      id="pix-pricing"
      marginTop={{ base: "141px", md: "222px" }}
      marginBottom={{ base: "50px", lg: "50px" }}
      paddingX="15px"
    >
      <Text
        maxWidth="932px"
        fontFamily="Montserrat"
        fontWeight="400"
        fontSize={{ base: "42px", md: "80px" }}
        lineHeight={{ base: "46px", md: "98px" }}
        textAlign="center"
      >
        {t("udiniProducts:pricingTitle")}
      </Text>
      <Text
        mt="40px"
        mb="90px"
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="normal"
        fontSize="24px"
        lineHeight="29px"
        textAlign="center"
      >
        {t("udiniProducts:pricingText")}
      </Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} columnGap="54px" rowGap="50px">
        {planData?.plans2?.plans?.map((e, i: number) => {
          const text = t(`udiniPix:pricesSection${e.plan}Text2`, { count: e.numberOfPhotosInPlan });
          const price = priceFormatter?.format(e.price) ?? e.price;
          return (
            <GradientCard
              key={i}
              name={t(`udiniPix:pricesSection${e.plan}Title`)}
              text={text}
              price={price}
              gradient={gradients[i % gradients.length]}
              buttonTextColor={buttonTextColors[i]}
              onClick={() => {
                return;
              }}
            />
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default UdiniProductsPricingView;
