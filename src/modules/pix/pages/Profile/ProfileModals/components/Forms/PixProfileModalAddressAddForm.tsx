import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import {
  FormControl,
  HStack,
  Input,
  FormLabel,
  VStack,
  Flex,
  FormErrorMessage,
} from "@chakra-ui/core";
import { useForm } from "react-hook-form";
import { useAuthDispatch, useAuthState } from "src/shared/contexts/AuthContext";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

interface FormData {
  address: string;
  zipcode: string;
  city: string;
  country: string;
}

const PixProfileModalAddressAddForm = ({
  buttonText,
  closeModal,
}: {
  buttonText: string;
  closeModal: () => void;
}) => {
  const { t } = useTranslation();
  const { profile } = useAuthState();
  const { updateUserBillingInfos } = useAuthDispatch();

  const { handleSubmit, register, setValue, formState, errors } = useForm<FormData>({
    mode: "onBlur",
  });

  useEffect(() => {
    setValue("address", profile?.billingInfos?.address, { shouldValidate: true });
    setValue("zipcode", profile?.billingInfos?.zipcode, { shouldValidate: true });
    setValue("city", profile?.billingInfos?.city, { shouldValidate: true });
    setValue("country", profile?.billingInfos?.country, { shouldValidate: true });
  }, []);

  const onSubmit = handleSubmit((values) => {
    updateUserBillingInfos({
      address: values.address,
      zipcode: values.zipcode,
      city: values.city,
      country: values.country,
    });
    closeModal();
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%", height: "100%" }}>
      <VStack h="100%" w="100%">
        <Flex direction="column" w="100%" paddingLeft="32px" paddingRight="105px">
          <FormControl id="address" isInvalid={!!errors.address}>
            <HStack justify="space-between">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalAddressStreetLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                name="address"
                placeholder={t("profile:profileModalAddressStreetPlaceholder")}
                ref={register({ required: true })}
              />
              <FormErrorMessage>{t("form:formRequiredField")}</FormErrorMessage>
            </HStack>
          </FormControl>
          <FormControl id="zipcode" isInvalid={!!errors.zipcode}>
            <HStack justify="space-between" marginTop="16px">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalAddressZipcodeLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                placeholder={t("profile:profileModalAddressZipcodePlaceholder")}
                name="zipcode"
                ref={register({ required: true })}
              />
              <FormErrorMessage>{t("form:formRequiredField")}</FormErrorMessage>
            </HStack>
          </FormControl>
          <FormControl id="city" isInvalid={!!errors.city}>
            <HStack justify="space-between" marginTop="16px">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalAddressCityLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                placeholder={t("profile:profileModalAddressCityPlaceholder")}
                name="city"
                ref={register({ required: true })}
              />
              <FormErrorMessage>{t("form:formRequiredField")}</FormErrorMessage>
            </HStack>
          </FormControl>
          <FormControl id="country" isInvalid={!!errors.country}>
            <HStack justify="space-between" marginTop="16px">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalAddressCountryLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                placeholder={t("profile:profileModalAddressCountryPlaceholder")}
                name="country"
                ref={register({ required: true })}
              />
              <FormErrorMessage>{t("form:formRequiredField")}</FormErrorMessage>
            </HStack>
          </FormControl>
        </Flex>
        <Flex w="100%" pt="28px" justify="flex-end" paddingRight="105px">
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

export default PixProfileModalAddressAddForm;
