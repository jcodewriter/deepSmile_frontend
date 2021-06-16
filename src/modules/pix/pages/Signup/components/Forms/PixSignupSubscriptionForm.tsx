import React, { useState } from "react";
import {
  Stack,
  FormControl,
  Box,
  HStack,
  FormLabel,
  Checkbox,
  Text,
  Center,
} from "@chakra-ui/core";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { PIX_FUNNEL_ROUTE, pushNext } from "src/utils/constants/routes";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { SUBSCRIBE2 } from "src/graphql/Mutations/Plan";
import { Subscribe2Payload, Subscribe2Variables } from "types/Mutations/Plan";
import { SubscriptionPlanProductEnum } from "types/User";
import useStripeToast from "src/modules/pix/pages/Signup/shared/hook/useStripeToast";
import useTranslation from "next-translate/useTranslation";
import PixSharedPlanRadioGroup from "src/modules/pix/shared/components/Forms/PixSharedPlanRadioGroup";
import { useAuthDispatch, useAuthState } from "src/shared/contexts/AuthContext";
import { PixMidTitle } from "src/shared/components/Titles";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";
import * as GTagHelper from "src/utils/helpers/GTagHelper";
import { track } from "src/services/Segment/analytics";
import { useSentry } from "src/services/Sentry";

interface FormData {
  plan: SubscriptionPlanProductEnum;
  newsletter: boolean;
  terms: boolean;
}

const PixSignupSubscriptionForm = () => {
  const formMethods = useForm<FormData>({
    mode: "onBlur",
    defaultValues: {
      plan: SubscriptionPlanProductEnum.FREE,
    },
  });
  const { profile } = useAuthState();
  const { updateUserInfos, setHasJustRegistered } = useAuthDispatch();
  const { handleSubmit, register, errors, formState, watch } = formMethods;
  const isNewsletter = watch("newsletter");
  const hasAcceptedTerms = watch("terms");
  const [cardReady, setCardReady] = useState({ number: false, expiration: false, cvc: false });
  const isCardReady = cardReady.number && cardReady.expiration && cardReady.cvc;
  const { sendSuccessToast, sendStripeErrorToast } = useStripeToast();
  const [suscribeMutation] = useMutation<Subscribe2Payload, Subscribe2Variables>(SUBSCRIBE2, {
    onError: (error) => {
      sendStripeErrorToast(error.message);
    },
  });

  const stripe = useStripe();
  const elements = useElements();
  const { t, lang } = useTranslation();
  const { log } = useSentry();

  const isChosenPlanFree = watch("plan") === SubscriptionPlanProductEnum.FREE;
  const onSubmit = handleSubmit(async (values) => {
    const displayToastAndRedirect = () => {
      updateUserInfos({ newsletter: !!values.newsletter });

      try {
        GTagHelper.event({
          action: "FRONT | New SignUp | STEP 3 | User choosed plan",
          category: "SIGNUP",
          payload: { email: profile?.email },
        });
        if (typeof window.analytics !== "undefined")
          track("FRONT | New SignUp | STEP 3 | User choosed plan", {
            email: profile?.email,
          });
      } catch (e) {
        log(e, "error");
      }

      setHasJustRegistered();
      if (!isChosenPlanFree) {
        sendSuccessToast();
      }
      if (process.env.NEXTBUILD === "prod") {
        //TODO: Maxime, plz review deactivation
        // analytics.track("User signed up", {
        //   "First name": profile?.infos?.firstName,
        //   Email: profile?.email,
        // });
      }
      pushNext(PIX_FUNNEL_ROUTE, undefined, { lang });
    };

    // handle FREE plan, update user plan and redirect
    if (values.plan === SubscriptionPlanProductEnum.FREE) {
      const res = await suscribeMutation({ variables: { plan: values.plan } });
      if (res) {
        displayToastAndRedirect();
      }
      return;
    }

    // Handle card validation using stripe
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      console.log("return");
      return;
    }
    const cardNumberElement = elements.getElement(CardNumberElement);
    if (cardNumberElement !== null) {
      const payload = await stripe.createToken(cardNumberElement);
      if (payload.token !== undefined) {
        const res = await suscribeMutation({
          variables: { plan: values.plan, cardToken: payload.token.id },
        });
        if (
          res?.data?.subscribe2 &&
          res?.data.subscribe2.threeDSecurePaymentIntentSecret !== null
        ) {
          const { error: stripeError } = await stripe.confirmCardPayment(
            res?.data.subscribe2.threeDSecurePaymentIntentSecret,
            {
              payment_method: {
                card: cardNumberElement,
              },
            }
          );
          if (stripeError) {
            sendStripeErrorToast(stripeError.type);
            return;
          }
        }
        if (res) {
          displayToastAndRedirect();
        }
      }
    }
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit}>
        <Stack spacing="40px" mb="55px">
          <PixSharedPlanRadioGroup />
          {!isChosenPlanFree && (
            <>
              <PixMidTitle>{t("pixSignup:paymentMethodTitle")}</PixMidTitle>
              <FormLabel>
                <Text as="span" fontWeight="bold" fontSize="14px" lineHeight="20px" color="black">
                  {" "}
                  {t("pixSignup:cardLabel")}
                </Text>

                <Box
                  border="1px solid #CCCCCC"
                  bg="#FFFFFF"
                  fontWeight="500"
                  fontSize="16px"
                  lineHeight="20px"
                  color="black"
                  borderRadius="4px"
                  mt="12px"
                  py="14px"
                  pl="20px"
                >
                  <CardNumberElement
                    onChange={(e) => {
                      if (e.complete) {
                        setCardReady((old) => ({ ...old, number: true }));
                      }
                    }}
                  />
                </Box>
              </FormLabel>
              <HStack spacing="30px">
                <FormLabel flex="0.5">
                  <Text as="span" fontWeight="bold" fontSize="14px" lineHeight="20px" color="black">
                    {t("pixSignup:expirationLabel")}
                  </Text>
                  <Box
                    border="1px solid #CCCCCC"
                    bg="#FFFFFF"
                    fontWeight="500"
                    fontSize="16px"
                    lineHeight="20px"
                    color="black"
                    borderRadius="4px"
                    mt="12px"
                    py="14px"
                    pl="20px"
                  >
                    <CardExpiryElement
                      onChange={(e) => {
                        if (e.complete) {
                          setCardReady((old) => ({ ...old, expiration: true }));
                        }
                      }}
                    />
                  </Box>
                </FormLabel>
                <FormLabel flex="0.5">
                  <Text as="span" fontWeight="bold" fontSize="14px" lineHeight="20px" color="black">
                    {t("pixSignup:cvvLabel")}
                  </Text>

                  <Box
                    border="1px solid #CCCCCC"
                    bg="#FFFFFF"
                    fontWeight="500"
                    fontSize="16px"
                    lineHeight="20px"
                    color="black"
                    borderRadius="4px"
                    py="14px"
                    mt="12px"
                    pl="20px"
                    flex="0.5"
                  >
                    <CardCvcElement
                      onChange={(e) => {
                        if (e.complete) {
                          setCardReady((old) => ({ ...old, cvc: true }));
                        }
                      }}
                    />
                  </Box>
                </FormLabel>
              </HStack>
            </>
          )}
          <Stack spacing="30px">
            <FormControl id="terms" isInvalid={!!errors.terms} w="600px">
              <Checkbox
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                color="black"
                colorScheme="cyan"
                name="terms"
                ref={register}
                defaultIsChecked={hasAcceptedTerms}
                isRequired
              >
                {t("pixSignup:termsOption")}
              </Checkbox>
            </FormControl>
            <FormControl id="newsletter" isInvalid={!!errors.newsletter} w="600px">
              <Checkbox
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                color="black"
                colorScheme="cyan"
                name="newsletter"
                ref={register}
                defaultIsChecked={isNewsletter}
              >
                {t("pixSignup:newsLetterOption")}
              </Checkbox>
            </FormControl>
          </Stack>
          <Center>
            <SharedGradientButton
              type="submit"
              isLoading={formState.isSubmitting}
              isDisabled={
                isChosenPlanFree ? !formState.isValid : !(formState.isValid && isCardReady)
              }
              variant="white"
              w="400px"
            >
              {t(`pixSignup:goButton`)}
            </SharedGradientButton>
          </Center>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default PixSignupSubscriptionForm;
