import React from "react";
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
import { useMutation } from "@apollo/client";
import { UserInfos } from "src/shared/types/User";
import { UPDATE_PASSWORD } from "src/graphql/Mutations/User";
import { useForm } from "react-hook-form";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

interface FormData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PixProfileModalPasswordForm = ({
  buttonText,
  closeModal,
}: {
  buttonText: string;
  closeModal: () => void;
}) => {
  const { t } = useTranslation();
  const [updatePassword] = useMutation<UserInfos>(UPDATE_PASSWORD);

  const { handleSubmit, register, errors, formState, watch } = useForm<FormData>({
    mode: "onBlur",
  });

  const onSubmit = handleSubmit((values) => {
    updatePassword({ variables: { newPassword: values.newPassword } });
    closeModal();
  });

  const getErrorMessage = () => {
    if (errors["confirmPassword"]?.type === "required") {
      return t("form:formRequiredField");
    }
    return errors["confirmPassword"]?.message;
  };

  return (
    <form onSubmit={onSubmit} style={{ width: "100%", height: "100%" }}>
      <VStack h="100%" w="100%">
        <Flex direction="column" w="100%" paddingLeft="32px" paddingRight="105px">
          {/* <FormControl htmlFor="oldPaswword" id="oldPassword">
            <HStack>
              <FormLabel>{t("profile:profileModalPasswordOldLabel")}</FormLabel>
              <Input
                placeholder={t("profile:profileModalPasswordOldPlaceholder")}
                type={"password"}
                ref={register}
              />
            </HStack>
          </FormControl> */}
          <FormControl id="newPassword" isInvalid={!!errors.newPassword}>
            <HStack justify="space-between">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalPasswordNewLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                name="newPassword"
                placeholder={t("profile:profileModalPasswordNewPlaceholder")}
                type={"password"}
                ref={register({ required: true })}
              />
              <FormErrorMessage>{t("form:formRequiredField")}</FormErrorMessage>
            </HStack>
          </FormControl>
          <FormControl id="confirmPassword" isInvalid={!!errors.confirmPassword}>
            <HStack justify="space-between" mt="16px">
              <FormLabel
                fontFamily="Montserrat"
                fontStyle="normal"
                fontWeight="bold"
                fontSize="14px"
                lineHeight="20px"
                color="#000000"
              >
                {t("profile:profileModalPasswordConfirmLabel")}
              </FormLabel>
              <Input
                w="384px"
                h="48px"
                name="confirmPassword"
                placeholder={t("profile:profileModalPasswordConfirmPlaceholder")}
                type={"password"}
                ref={register({
                  required: true,
                  validate: (v) => v === watch("newPassword") || t("form:formPasswordMismatch"),
                })}
              />
              <FormErrorMessage>{getErrorMessage()}</FormErrorMessage>
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

export default PixProfileModalPasswordForm;
