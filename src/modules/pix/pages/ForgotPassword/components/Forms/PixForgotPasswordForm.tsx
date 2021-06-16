import React from "react";
import { Stack, Link, Box } from "@chakra-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { PIX_SIGNIN_ROUTE } from "src/utils/constants/routes";

import useTranslation from "next-translate/useTranslation";
import PixSharedInput from "src/modules/pix/shared/components/Forms/PixSharedInput";
import { PixMidTitle } from "src/shared/components/Titles";
import { CopyText } from "src/shared/components/Text/Text";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";
import { RESET_PASSWORD } from "src/graphql/Queries/User";
import { useLazyQuery } from "@apollo/client";

interface FormData {
  email: string;
}

interface PixForgotPasswordFormProps {
  onChangeStatut: () => void;
  display: string;
}

const PixForgotPasswordForm = ({ onChangeStatut, display }: PixForgotPasswordFormProps) => {
  const { t } = useTranslation();
  const formMethods = useForm<FormData>({ mode: "onBlur" });
  const { handleSubmit, formState } = formMethods;
  const [resetPassword] = useLazyQuery(RESET_PASSWORD);
  const onSubmit = handleSubmit((values) => {
    resetPassword({ variables: { email: values.email } });
    onChangeStatut();
  });

  return (
    <Stack spacing="30px" display={display}>
      <Stack spacing="15px">
        <PixMidTitle>{t("pixForgotPassword:cardTitle")}</PixMidTitle>
        <CopyText>{t("pixForgotPassword:cardText")}</CopyText>
      </Stack>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <Stack align="center" spacing="30px">
            <PixSharedInput name="email" label={t("pixForgotPassword:emailLabel")} />
            <SharedGradientButton
              w="100%"
              type="submit"
              isLoading={formState.isSubmitting}
              background="brandGrey.100"
              color="black"
            >
              {t("pixForgotPassword:button")}
            </SharedGradientButton>
          </Stack>
        </form>
      </FormProvider>
      <Box textAlign="center" marginTop="30px">
        <SharedNextTranslateLink href={PIX_SIGNIN_ROUTE} passHref>
          <Link textDecoration="underline" fontWeight="bold" fontSize="14px" lineHeight="20px">
            {t("pixForgotPassword:cardLink")}
          </Link>
        </SharedNextTranslateLink>
      </Box>
    </Stack>
  );
};

export default PixForgotPasswordForm;
