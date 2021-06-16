import React from "react";
import { VStack, Text } from "@chakra-ui/core";
import { useAuthState } from "src/shared/contexts/AuthContext";
import useTranslation from "next-translate/useTranslation";

const PixCreditCardView = () => {
  const { profile } = useAuthState();
  const { t } = useTranslation();
  const card = profile?.planInfos?.card;

  if (!card) {
    return (
      <Text
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="20px"
        lineHeight="36px"
        color="#333333"
      >
        {t("pixPayment:paymentNoCard")}
      </Text>
    );
  }
  return (
    <VStack align="flexStart">
      <Text
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="20px"
        color="#222222"
      >
        {t("pixPayment:paymentCardNumber")} **** **** **** {card?.last4}
      </Text>
      <Text
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="14px"
        line-height="20px"
        color="#222222"
      >
        {t("pixPayment:paymentExpiration")} {card?.exp_month}/{card?.exp_year}
      </Text>
      <Text
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="14px"
        line-height="20px"
        color="#222222"
      >
        {t("pixPayment:paymentCVV")} ***
      </Text>
    </VStack>
  );
};

export default PixCreditCardView;
