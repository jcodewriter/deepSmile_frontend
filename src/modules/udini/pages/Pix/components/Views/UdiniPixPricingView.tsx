import React, { useState, useMemo, ReactText } from "react";
import { Flex, BoxProps, Box } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import {
  Subtitle,
  MidTitle,
  BaseText,
  Menu,
} from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";
import SharedGradientButtonLink from "src/shared/components/Button/SharedGradientButton";
import { PIX_SIGNUP_ROUTE } from "src/utils/constants/routes";
import { useQuery } from "@apollo/client";
import { PLANS2 } from "src/graphql/Queries/Plan";
import { Plans2Payload } from "types/Queries/Plan";
import customTheme from "src/utils/theme";

interface GradientCardProps extends BoxProps {
  active: boolean;
  name: string;
  text: string;
  price: ReactText;
  gradient: string[];
  onClick: () => void;
}
const GradientCard = ({ active, name, text, price, gradient, onClick }: GradientCardProps) => (
  <Flex
    onClick={onClick}
    direction="column"
    align="center"
    background={`linear-gradient(90deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`}
    padding={{ base: "30px", sm: "60px" }}
    h="400px"
    width={{ base: "80%", md: "30%" }}
    marginBottom={{ base: "50px", md: "0px" }}
    cursor="pointer"
    outline={active ? "4px solid #D0D0D0" : ""}
    _hover={{
      outline: "4px solid #D0D0D0",
    }}
  >
    <MidTitle color="#FFFFFF" mb="40px" textAlign="center">
      {name}
    </MidTitle>
    <Menu color="#FFFFFF" mb="40px" textAlign="center">
      {text}
    </Menu>
    <BaseText color="#FFFFFF" fontSize="60px" fontWeight="bold" textAlign="center">
      {price}
    </BaseText>
  </Flex>
);

const UdiniPixPricingView = () => {
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

  const [active, setActive] = useState(-1);

  return (
    <MainBox backgroundColor="#FFFFFF">
      <Flex direction="column" align="center" my="70px">
        <MidTitle maxWidth={{ base: "90%", md: "initial" }} color="#000000" textAlign="center">
          {t("udiniPix:pricesSectionTitle")}
        </MidTitle>
        <Subtitle
          maxWidth={{ base: "90%", md: "initial" }}
          color="#000000"
          textAlign="center"
          mt="12px"
        >
          <b>{t("udiniPix:pricesSectionTextBold")}</b>
          {t("udiniPix:pricesSectionTextEnd")}
        </Subtitle>
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "strech" }}
          justify="space-between"
          mt="40px"
        >
          {planData?.plans2?.plans?.map((e, i: number) => {
            const text = t(`pixSignup:plan${e.plan}OptionText`, { count: e.numberOfPhotosInPlan });
            const price = priceFormatter?.format(e.price) ?? e.price;
            return (
              <GradientCard
                key={i}
                active={active === i}
                name={t(`udiniPix:pricesSection${e.plan}Title`)}
                text={text}
                price={price}
                gradient={gradients[i % gradients.length]}
                onClick={() => setActive(i)}
              />
            );
          })}
        </Flex>
        <Box mt="40px">
          <SharedGradientButtonLink href={PIX_SIGNUP_ROUTE} background="white" color="black">
            {t("udiniPix:pricesSectionBtn")}
          </SharedGradientButtonLink>
        </Box>
      </Flex>
    </MainBox>
  );
};

export default UdiniPixPricingView;
