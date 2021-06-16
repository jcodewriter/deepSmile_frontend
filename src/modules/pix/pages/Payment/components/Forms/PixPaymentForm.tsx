import React from "react";

import { Stack, Text } from "@chakra-ui/core";
import PixPaymentTitleView from "src/modules/pix/pages/Payment/components/Views/PixPaymentTitleView";
import { useForm, FormProvider } from "react-hook-form";
import PixPaymentBlock from "src/modules/pix/pages/Payment/components/Blocks/PixPaymentBlock";
import { CreditCardInputs } from "src/modules/pix/shared/types/forms";

const PixPaymentForm = () => {
  const methods = useForm<CreditCardInputs>({ mode: "onBlur" });

  const onSubmit = methods.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <Stack padding="50px 80px" spacing="24px">
          <PixPaymentTitleView />
          <Stack spacing="43px">
            <Text fontSize="16px" lineHeight="20px" color="#000000" opacity="0.8">
              Ajouter un moyen de paiement pour upgrader votre formule
            </Text>
            <PixPaymentBlock />
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default PixPaymentForm;
