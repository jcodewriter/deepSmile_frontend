import React from "react";
import { Input, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

const PixSignupValidatePasswordInput = () => {
  const { t } = useTranslation();
  const { register, errors, watch } = useFormContext();

  return (
    <FormControl id="validatePassword" isInvalid={!!errors.validatePassword} isRequired>
      <FormLabel
        width="100%"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="20px"
      >
        {t("pixSignup:confirmPasswordLabel")}
      </FormLabel>
      <Input
        background="#FFFFFF"
        border="1px solid #CCCCCC"
        borderRadius="4px"
        fontStyle="normal"
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
        name="validatePassword"
        placeholder="******"
        type={"password"}
        ref={register({
          required: t("form:formRequiredField"),
          validate: (v) => v === watch("password") || t("form:formPasswordMismatch"),
        })}
      />
      <FormErrorMessage>
        {errors.validatePassword && errors.validatePassword.message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default PixSignupValidatePasswordInput;
