import React from "react";
import { Stack, Flex, FormControl, FormLabel, Input, FormErrorMessage } from "@chakra-ui/core";
import { useForm, FormProvider } from "react-hook-form";

import useTranslation from "next-translate/useTranslation";
import { PixMidTitle } from "src/shared/components/Titles";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";
import { UPDATE_PASSWORD } from "src/graphql/Mutations/User";
import { useMutation } from "@apollo/client";
import { PIX_SIGNIN_ROUTE, pushNext } from "src/utils/constants/routes";

interface FormData {
  password: string;
  confirm: string;
}

interface PixRestoreFormProps {
  token: string;
}

const PixRestoreForm = ({ token }: PixRestoreFormProps) => {
  const formMethods = useForm<FormData>({
    mode: "onBlur",
  });
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  const { handleSubmit, formState, errors, register, watch } = formMethods;
  const { t, lang } = useTranslation();

  const onSubmit = handleSubmit((values) => {
    updatePassword({
      variables: {
        newPassword: values.password,
        resetToken: token,
      },
    });
    pushNext(PIX_SIGNIN_ROUTE, undefined, { lang });
  });

  return (
    <Stack spacing="30px">
      <PixMidTitle>{t("pixResetPassword:formTitle")}</PixMidTitle>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <Stack spacing="30px">
            <FormControl id={"password"} isInvalid={!!errors.password}>
              <FormLabel
                width="100%"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
              >
                {t("pixResetPassword:passwordLabel")}
              </FormLabel>
              <Input
                background="#FFFFFF"
                border="1px solid #CCCCCC"
                borderRadius="4px"
                fontStyle="normal"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                name={"password"}
                type={"password"}
                ref={register({ required: t("form:formRequiredField") })}
              />
              <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
            </FormControl>
            <FormControl id={"confirm"} isInvalid={!!errors.confirm}>
              <FormLabel
                width="100%"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
              >
                {t("pixResetPassword:confirmLabel")}
              </FormLabel>
              <Input
                background="#FFFFFF"
                border="1px solid #CCCCCC"
                borderRadius="4px"
                fontStyle="normal"
                fontWeight="500"
                fontSize="16px"
                lineHeight="20px"
                name={"confirm"}
                type={"password"}
                ref={register({
                  required: t("form:formRequiredField"),
                  validate: (v) => v === watch("password") || t("form:formPasswordMismatch"),
                })}
              />
              <FormErrorMessage>{errors.confirm && errors.confirm.message}</FormErrorMessage>
            </FormControl>

            <Flex mt="30px" justify="center">
              <SharedGradientButton
                type="submit"
                isLoading={formState.isSubmitting}
                background="brandGrey.100"
                color="black"
              >
                {t("pixResetPassword:submitBtn")}
              </SharedGradientButton>
            </Flex>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default PixRestoreForm;
