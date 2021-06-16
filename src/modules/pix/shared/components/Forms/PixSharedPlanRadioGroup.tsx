import React, { useMemo } from "react";
import { Stack, FormControl, FormErrorMessage, RadioGroup, Spinner } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useFormContext } from "react-hook-form";
import { useQuery } from "@apollo/client";
import { PLANS2 } from "src/graphql/Queries/Plan";
import { Plans2Payload } from "types/Queries/Plan";
import { useSentry } from "src/services/Sentry";
import PixSharedRadioCard from "src/modules/pix/shared/components/Forms/PixSharedRadioCard";
import customTheme from "src/utils/theme";
import { useAuthState } from "src/shared/contexts/AuthContext";

const PixSharedPlanRadioGroup = () => {
  const { lang } = useTranslation();
  const { errors } = useFormContext();
  const { data: planData, loading: plansLoading } = useQuery<Plans2Payload>(PLANS2);
  const { log, sendError } = useSentry();
  const { colors } = customTheme;
  const { profile } = useAuthState();

  const priceFormatter = useMemo(() => {
    try {
      return new Intl.NumberFormat(lang, {
        style: "currency",
        currency: planData?.plans2.currency,
        minimumSignificantDigits: 2,
      });
    } catch (e) {
      log(`Unknown locale or currency : ${lang} | ${planData?.plans2.currency}`, "error");
      sendError(e.message);
    }
  }, [planData?.plans2.currency]);

  if (plansLoading) {
    return <Spinner s="xl" />;
  }
  const gradients = [
    [colors.brandBlue["100"], colors.brandBlue["200"]],
    [colors.brandPink["100"], colors.brandPink["300"]],
    [colors.brandBlue["900"], colors.brandPink["900"]],
  ];

  return (
    <FormControl id="plan" as="fieldset" isInvalid={!!errors.plan}>
      <RadioGroup defaultValue={profile?.planInfos?.plan2}>
        <Stack spacing="24px">
          {planData?.plans2?.plans?.map((plan, index) => (
            <PixSharedRadioCard
              key={`${plan.plan}_key`}
              plan={plan}
              priceFormatter={priceFormatter}
              gradient={gradients[index % gradients.length]}
            />
          ))}
        </Stack>
      </RadioGroup>
      <FormErrorMessage>{!!errors.plan && errors.plan.message}</FormErrorMessage>
    </FormControl>
  );
};

export default PixSharedPlanRadioGroup;
