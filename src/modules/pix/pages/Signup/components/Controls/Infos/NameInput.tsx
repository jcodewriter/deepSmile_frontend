import React from "react";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import { Input, FormControl, FormLabel, FormErrorMessage, SimpleGrid } from "@chakra-ui/core";

const NameInput = () => {
  const { register, errors } = useFormContext();
  const { t } = useTranslation();

  return (
    <SimpleGrid columns={[1, 2, 2]} columnGap="20px" rowGap="40px">
      <FormControl id="firstName" isInvalid={!!errors.firstName} isRequired>
        <FormLabel fontWeight="bold" fontSize="16px" lineHeight="20px">
          {t("pixSignup:firstNameLabel")}
        </FormLabel>
        <Input
          name="firstName"
          border="1px solid #CCCCCC"
          ref={register({ required: t("form:formRequiredField") })}
        />
        <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
      </FormControl>
      <FormControl id="lastName" isInvalid={!!errors.firstName} isRequired>
        <FormLabel fontWeight="bold" fontSize="16px" lineHeight="20px">
          {t("pixSignup:lastNameLabel")}
        </FormLabel>
        <Input
          name="lastName"
          border="1px solid #CCCCCC"
          ref={register({ required: t("form:formRequiredField") })}
        />
        <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
      </FormControl>
    </SimpleGrid>
  );
};

export default NameInput;
