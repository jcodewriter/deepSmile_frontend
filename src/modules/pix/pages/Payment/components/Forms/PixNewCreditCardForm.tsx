import React, { useState } from "react";
import { Box, HStack, VStack, Text, Flex } from "@chakra-ui/core";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { useMutation } from "@apollo/client";
import {
  ChangeCreditCardVariables,
  ChangeCreditCardPayload,
} from "src/shared/types/Mutations/User";
import useStripeToast from "src/modules/pix/pages/Signup/shared/hook/useStripeToast";
import useTranslation from "next-translate/useTranslation";
import { CHANGE_CREDIT_CARD } from "src/graphql/Mutations/User";
import { useAuthDispatch } from "src/shared/contexts/AuthContext";

import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

const PixNewreditCardForm = ({ closeModal }: { closeModal: () => void }) => {
  const [cardReady, setCardReady] = useState({ number: false, expiration: false, cvc: false });
  const isCardReady = cardReady.number && cardReady.expiration && cardReady.cvc;
  const { sendSuccessToast, sendStripeErrorToast } = useStripeToast();
  const [changeCreditCard] = useMutation<ChangeCreditCardPayload, ChangeCreditCardVariables>(
    CHANGE_CREDIT_CARD,
    {
      onError: (error) => sendStripeErrorToast(error.message),
    }
  );
  const { getProfile } = useAuthDispatch();

  const stripe = useStripe();
  const elements = useElements();
  const { t } = useTranslation();

  const onSubmit = async () => {
    // Handle card validation using stripe
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (cardNumberElement !== null) {
      const payload = await stripe.createToken(cardNumberElement);
      if (payload.token !== undefined) {
        const res = await changeCreditCard({
          variables: { cardToken: payload.token.id },
        });
        if (res?.data?.changeCreditCard) {
          sendSuccessToast();
          getProfile();
        }
      }
      closeModal();
    }
  };

  return (
    <VStack w="100%" paddingRight="105px" paddingLeft="32px">
      <HStack w="100%" mt="50px" justify="space-between">
        <Text fontWeight="bold" fontSize="14px" lineHeight="20px">
          {t("pixPayment:paymentModalCardNumber")}
        </Text>
        <Box w="384px" border="1px solid #CCCCCC" borderRadius="4px" py="14px" pl="20px">
          <CardNumberElement
            onChange={(e) => {
              if (e.complete) {
                setCardReady((old) => ({ ...old, number: true }));
              }
            }}
          />
        </Box>
      </HStack>
      <HStack w="100%" justify="space-between">
        <Text
          fontWeight="bold"
          fontSize="14px"
          lineHeight="20px"
          fontFamily="Montserrat"
          fontStyle="normal"
          color="#000000"
        >
          {t("pixPayment:paymentModalExpiration")}
        </Text>
        <Box w="384px" border="1px solid #CCCCCC" borderRadius="4px" py="14px" pl="20px">
          <CardExpiryElement
            onChange={(e) => {
              if (e.complete) {
                setCardReady((old) => ({ ...old, expiration: true }));
              }
            }}
          />
        </Box>
      </HStack>
      <HStack w="100%" justify="space-between">
        <Text fontWeight="bold" fontSize="14px" lineHeight="20px">
          {t("pixPayment:paymentModalCVV")}
        </Text>
        <Box w="384px" border="1px solid #CCCCCC" borderRadius="4px" py="14px" pl="20px">
          <CardCvcElement
            onChange={(e) => {
              if (e.complete) {
                setCardReady((old) => ({ ...old, cvc: true }));
              }
            }}
          />
        </Box>
      </HStack>
      <Flex w="100%" justify="flex-end" paddingTop="28px" paddingBottom="118px">
        <SharedGradientButton isDisabled={!isCardReady} onClick={() => onSubmit()} variant="white">
          {t("pixPayment:paymentModalUpdate")}
        </SharedGradientButton>
      </Flex>
    </VStack>
  );
};

export default PixNewreditCardForm;
