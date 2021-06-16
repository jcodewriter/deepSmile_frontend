import React from "react";
import withUdiniSharedPageLayout from "src/modules/udini/shared/hocs/withUdiniSharedPageLayout";
import { useForm, FormProvider } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { Stack, Flex, useToast } from "@chakra-ui/core";
import { Title } from "src/shared/components/Titles";
import PixSharedInput from "src/modules/pix/shared/components/Forms/PixSharedInput";
import PixSharedTextarea from "src/modules/pix/shared/components/Forms/PixSharedTextarea";
//import { Menu } from "../../shared/components/Views/UdiniSharedTextsView";
import { useMutation } from "@apollo/client";
import { CONTACT } from "src/graphql/Mutations/Contact";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";
import * as GTagHelper from "src/utils/helpers/GTagHelper";
import { track } from "src/services/Segment/analytics";
import { useSentry } from "src/services/Sentry";

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const UdiniContact = () => {
  const toast = useToast();
  const [contact] = useMutation(CONTACT);
  const formMethods = useForm<FormData>({
    mode: "onBlur",
  });
  const { handleSubmit, formState, reset } = formMethods;
  const { t } = useTranslation();
  const { log } = useSentry();

  const onSubmit = handleSubmit((values) => {
    contact({
      variables: {
        fullName: values.name,
        phone: values.phone,
        email: values.email,
        message: values.message,
      },
    })
      .then(() => {
        toast({
          position: "top",
          title: t("form:toastMessageSentSuccess"),
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        if (process.env.NEXT_PUBLIC_BUILD === "prod") {
          try {
            GTagHelper.event({
              action: "FRONT | New Contact Form",
              category: "Contact",
              payload: { email: values.email },
            });
            if (typeof window.analytics !== "undefined")
              track("FRONT | New Contact Form", {
                email: values.email,
              });
          } catch (e) {
            log(e, "error");
          }
        }
        reset();
      })
      .catch(() => {
        toast({
          position: "top",
          title: t("form:toastMessageSentError"),
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  });

  return (
    <Stack bg="brandGrey.100" align="center" padding="88px">
      <Title>{t("udiniContact:title")}</Title>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit}>
          <Stack wrap="wrap" direction="row" justify="center">
            <Stack paddingTop="40px" w="270px" spacing="36px">
              <PixSharedInput name="name" label={t("udiniContact:nameLabel")} />
              <PixSharedInput name="phone" label={t("udiniContact:phoneLabel")} type="phone" />
              <PixSharedInput name="email" label={t("udiniContact:emailLabel")} type="email" />
            </Stack>
            <Flex
              paddingTop="40px"
              paddingLeft={{ base: "0px", sm: "64px" }}
              w={{ base: "270px", md: "470px" }}
            >
              <PixSharedTextarea name="message" label={t("udiniContact:messageLabel")} />
            </Flex>
          </Stack>
          <Stack marginTop="70px" direction="row" justify="center" /* spacing="30px" */>
            {/* <BaseGradientButton
              as="button"
              type="button"
              childStyle={{ backgroundColor: "brandGrey.100" }}
              styleText={{ color: "#000000", _groupHover: { color: "#FFFFFF" } }}
            >
              <Flex sx={{ color: "#000000", _groupHover: { color: "#FFFFFF" } }}>
                <Icon boxSize="24px" viewBox="0 0 24 10">
                  <path
                    fill="currentColor"
                    d="M0 5.2166C0 2.33927 2.29714 0.0166016 5.14286 0.0166016H20.5714C22.4914 0.0166016 24 1.6806 24 3.6566C24 5.6326 22.4914 7.2966 20.5714 7.2966H5.14286C4.01143 7.2966 3.08571 6.3606 3.08571 5.2166C3.08571 4.0726 4.01143 3.1366 5.14286 3.1366H20.2286C20.6057 3.1366 20.9143 3.4486 20.9143 3.82994C20.9143 4.21127 20.6057 4.52327 20.2286 4.52327C20.2286 4.52327 20.2286 4.52327 20.1943 4.52327H5.14286C4.76571 4.52327 4.45714 4.83527 4.45714 5.2166C4.45714 5.59794 4.76571 5.90994 5.14286 5.90994H20.5714C21.7029 5.90994 22.6286 4.93927 22.6286 3.6566C22.6286 2.37394 21.7029 1.40327 20.5714 1.40327H5.14286C3.05143 1.40327 1.37143 3.10194 1.37143 5.2166C1.37143 7.33127 3.05143 9.02994 5.14286 9.02994H18.8571C19.2343 9.02994 19.5429 9.34194 19.5429 9.72327C19.5429 10.1046 19.2343 10.4166 18.8571 10.4166C18.8571 10.4166 18.8571 10.4166 18.8229 10.4166H5.14286C2.29714 10.4166 0 8.05927 0 5.2166Z"
                  />
                </Icon>
                <Menu display={{ base: "none", sm: "flex" }} marginLeft="9px">
                  {t("udiniContact:fileButton")}
                </Menu>
              </Flex>
            </BaseGradientButton> */}
            <SharedGradientButton
              type="submit"
              isLoading={formState.isSubmitting}
              color="black"
              background="brandGrey.100"
            >
              {t("udiniContact:submitButton")}
            </SharedGradientButton>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  );
};

export default withUdiniSharedPageLayout(UdiniContact, false);
