import React, { useEffect } from "react";
import { Stack, Flex } from "@chakra-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { useAuth } from "src/shared/contexts/AuthContext";
import useTranslation from "next-translate/useTranslation";
import PixSharedInput from "src/modules/pix/shared/components/Forms/PixSharedInput";
import PixLoginFormPasswordInput from "./PixLoginFormPasswordInput";
import { PixMidTitle } from "src/shared/components/Titles";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

interface FormData {
  email: string;
  password: string;
}

const PixLoginForm = () => {
  const formMethods = useForm<FormData>({
    mode: "onBlur",
  });
  const { handleSubmit, formState, setError } = formMethods;
  const { t } = useTranslation();
  const [{ errorMessages }, { logUser }] = useAuth();

  useEffect(() => {
    if (errorMessages.length !== 0) {
      errorMessages.forEach((value) => {
        const field = value.includes("email") ? "email" : "password";
        setError(field, {
          type: "manual",
          message: value,
        });
      });
    }
  }, [errorMessages.length]);

  const onSubmit = handleSubmit((values) => {
    logUser(values.email, values.password);
  });

  return (
    <Stack spacing="30px">
      <PixMidTitle>{t("pixSignIn:cardTitle")}</PixMidTitle>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <Stack spacing="30px">
            <PixSharedInput name="email" label={t("pixSignIn:emailLabel")} type="email" />
            <PixLoginFormPasswordInput />

            <Flex mt="30px" justify="center">
              <SharedGradientButton
                type="submit"
                isLoading={formState.isSubmitting}
                background="brandGrey.100"
                color="black"
              >
                {t("pixSignIn:button")}
              </SharedGradientButton>
            </Flex>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default PixLoginForm;
