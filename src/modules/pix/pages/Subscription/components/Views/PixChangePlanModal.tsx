import React, { useEffect, useState } from "react";
import PixProfileModalLayout from "src/modules/pix/pages/Profile/ProfileModals/components/Layout/PixProfileModalLayout";
import useTranslation from "next-translate/useTranslation";
import { Card, SubscriptionPlanStateEnum } from "types/User";
import { VStack, Text, Flex } from "@chakra-ui/layout";
import { PixSharedRadioCardProps } from "src/modules/pix/shared/components/Forms/PixSharedRadioCard";
import { useMutation, useLazyQuery } from "@apollo/client";
import { ChangePlanPayload, ChangePlanVariables } from "types/Mutations/Plan";
import { CHANGE_PLAN } from "src/graphql/Mutations/Plan";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Box, HStack, Skeleton } from "@chakra-ui/core";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";
import { useAuthDispatch } from "src/shared/contexts/AuthContext";
import { PREVIEW_CHANGE_PLAN2 } from "src/graphql/Queries/Plan";
import { PreviewChangePlan2Payload, PreviewChangePlan2Variables } from "types/Queries/Plan";
import { formatDateWithSeconds } from "src/utils/helpers/DateHelper";
import SubscriptionPlanView from "./SubscriptionPlanView";

const checkIfCreditCardIsNeeded = (statePlan: SubscriptionPlanStateEnum, card: Card | null) => {
  if (card === null) {
    return true;
  }
  switch (statePlan) {
    case SubscriptionPlanStateEnum.ACTIVE:
    case SubscriptionPlanStateEnum.ACTIVE_WILL_EXPIRE:
    case SubscriptionPlanStateEnum.ACTIVE_WILL_DOWNGRADE:
      return false;
    default:
      return true;
  }
};

const PixChangePlanModal = ({
  statePlan,
  radioCardProps,
  closeModal,
  card,
}: {
  statePlan: SubscriptionPlanStateEnum;
  radioCardProps: PixSharedRadioCardProps;
  closeModal: () => void;
  card: Card | null;
}) => {
  const { t, lang } = useTranslation();
  const [needsToPay, setNeedsToPay] = useState(false);
  const [cardReady, setCardReady] = useState({ number: false, expiration: false, cvc: false });
  const isCardReady = cardReady.number && cardReady.expiration && cardReady.cvc;
  const stripe = useStripe();
  const elements = useElements();
  const { getProfile } = useAuthDispatch();
  const [previewChangePlan, { data: previewChangePlanData, loading }] = useLazyQuery<
    PreviewChangePlan2Payload,
    PreviewChangePlan2Variables
  >(PREVIEW_CHANGE_PLAN2);
  const [changePlan] = useMutation<ChangePlanPayload, ChangePlanVariables>(CHANGE_PLAN, {
    onError: (error) => {
      console.log(error.message);
    },
  });

  /**
   * Fetch the price user will have to pay.
   * We need to fetch in useEffect because modal renders even when closed
   */
  useEffect(() => {
    if (radioCardProps.plan?.plan && previewChangePlanData === undefined) {
      previewChangePlan({ variables: { toPlan: radioCardProps.plan.plan } });
    }
  }, [radioCardProps.plan?.plan, previewChangePlanData]);

  const handleNewCard = async () => {
    if (elements && stripe) {
      const cardNumberElement = elements.getElement(CardNumberElement);
      if (cardNumberElement !== null) {
        const payload = await stripe.createToken(cardNumberElement);
        await handleSubscribe(payload.token?.id);
      }
    }
  };

  const handleSubscribe = async (cardToken?: string) => {
    if (!stripe) {
      console.error("stripe has not loaded yet");
      return;
    } else if (!radioCardProps.plan) {
      console.error("No plan chosen");
      return;
    }
    const res = await changePlan({
      variables: { toPlan: radioCardProps.plan.plan, cardToken: cardToken },
    });
    if (res?.data?.changePlan2 && res?.data.changePlan2.threeDSecurePaymentIntentSecret) {
      const { error: stripeError } = await stripe.confirmCardPayment(
        res.data.changePlan2.threeDSecurePaymentIntentSecret
      );
      if (stripeError) {
        return;
      }
    }
    getProfile();
    closeModal();
  };

  if (!radioCardProps.plan) {
    return null;
  }

  if (loading) {
    return <Skeleton w="650px" h="200px" />;
  }

  return (
    <PixProfileModalLayout
      title={
        needsToPay
          ? t("profile:profileChangePlanAddPaymentMethodTitle")
          : t("profile:profileChangePlanModalTitle")
      }
      subtitle={needsToPay ? t("profile:profileChangePlanAddPaymentMethodSubtitle") : undefined}
      width="710px"
      height={needsToPay ? "552px" : "440px"}
    >
      {needsToPay ? (
        <VStack w="100%" paddingRight="105px" pl="41px">
          <HStack w="100%" mt="50px" justify="space-between">
            <Text
              fontWeight="bold"
              fontSize="14px"
              lineHeight="20px"
              fontFamily="Montserrat"
              fontStyle="normal"
            >
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
            <Text
              fontWeight="bold"
              fontSize="14px"
              lineHeight="20px"
              fontFamily="Montserrat"
              fontStyle="normal"
            >
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
            <SharedGradientButton
              onClick={() => isCardReady && handleNewCard()}
              isDisabled={!isCardReady}
              variant="white"
            >
              {t("pixPayment:paymentModalUpdate")}
            </SharedGradientButton>
          </Flex>
        </VStack>
      ) : (
        <VStack spacing="30px" justify="center" align="center" width="100%">
          <SubscriptionPlanView
            plan={radioCardProps.plan}
            gradient={radioCardProps.gradient}
            priceFormatter={radioCardProps.priceFormatter}
          />
          <Text
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
          >
            {t("pixSubscription:priceToPay")}
            {radioCardProps?.priceFormatter?.format(
              previewChangePlanData?.previewChangePlan2.amountToPayNow ?? 0
            )}
          </Text>
          <Text
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
          >
            {t("pixSubscription:newDate")}
            {formatDateWithSeconds(lang, previewChangePlanData?.previewChangePlan2.planChangeDate)}
          </Text>
          <Flex justify="flex-end" pb="36px" w="100%" pr="55px">
            <SharedGradientButton
              onClick={() =>
                checkIfCreditCardIsNeeded(statePlan, card) ? setNeedsToPay(true) : handleSubscribe()
              }
              variant="white"
            >
              {t("pixSubscription:confirm")}
            </SharedGradientButton>
          </Flex>
        </VStack>
      )}
    </PixProfileModalLayout>
  );
};

export default PixChangePlanModal;
