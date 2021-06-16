import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  FormControl,
  HStack,
  Input,
  FormLabel,
  Flex,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useAuthDispatch, useAuthState } from "src/shared/contexts/AuthContext";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const PixProfileModalInformationForm = ({
  buttonText,
  closeModal,
}: {
  buttonText: string;
  closeModal: () => void;
}) => {
  const { t } = useTranslation();
  const { profile } = useAuthState();
  const { handleSubmit, register, errors, formState, setValue } = useForm<FormData>({
    mode: "onBlur",
  });

  const { updateUserInfos } = useAuthDispatch();

  useEffect(() => {
    setValue("firstName", profile?.infos?.firstName, { shouldValidate: true });
    setValue("lastName", profile?.infos?.lastName, { shouldValidate: true });
    setValue("phone", profile?.infos?.phone, { shouldValidate: true });
  }, []);

  const onSubmit = handleSubmit((values) => {
    updateUserInfos({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
    });
    closeModal();
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%", height: "100%" }}>
      <VStack h="100%" w="100%">
        <Flex direction="column" w="100%" paddingLeft="32px" paddingRight="105px">
          <FormControl id="firstName" isInvalid={!!errors.firstName}>
            <HStack justify="space-between">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalInfoFirstNameLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                name="firstName"
                placeholder={t("profile:profileModalInfoFirstNamePlaceholder")}
                ref={register({ required: true })}
              />
              <FormErrorMessage>{t("form:formRequiredField")}</FormErrorMessage>
            </HStack>
          </FormControl>
          <FormControl id="lastName" isInvalid={!!errors.lastName}>
            <HStack justify="space-between" marginTop="16px">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalInfoLastNameLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                name="lastName"
                placeholder={t("profile:profileModalInfoLastNamePlaceholder")}
                ref={register({ required: true })}
              />
              <FormErrorMessage>{t("form:formRequiredField")}</FormErrorMessage>
            </HStack>
          </FormControl>
          <FormControl id="phone" isInvalid={!!errors.phone}>
            <HStack justify="space-between" marginTop="16px">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalInfoPhoneLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                name="phone"
                placeholder={t("profile:profileModalInfoPhonePlaceholder")}
                ref={register({ required: true })}
              />
              <FormErrorMessage>{t("form:formRequiredField")}</FormErrorMessage>
            </HStack>
          </FormControl>
        </Flex>
        <Flex w="100%" justify="flex-end" paddingTop="28px" paddingRight="105px">
          <SharedGradientButton
            type="submit"
            isLoading={formState.isSubmitting}
            isDisabled={!formState.isValid}
            variant="white"
          >
            {buttonText}
          </SharedGradientButton>
        </Flex>
      </VStack>
    </form>
  );
};

export default PixProfileModalInformationForm;
