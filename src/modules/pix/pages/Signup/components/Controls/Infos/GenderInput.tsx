import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Radio,
  RadioGroup,
} from "@chakra-ui/core";
import { Gender } from "types/User";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

const GENDER_OPTIONS = [
  { value: Gender.MALE, text: "Male" },
  { value: Gender.FEMALE, text: "Female" },
];

const GenderInput = () => {
  const { register, errors, watch } = useFormContext();
  const { t } = useTranslation();

  const gender = watch("gender");

  return (
    <FormControl id="gender" as="fieldset" isInvalid={!!errors.gender} isRequired>
      <HStack spacing="20px" align="center">
        <FormLabel margin="0" fontWeight="bold" fontSize="16px" lineHeight="20px">
          {t("pixSignup:genderLabel")}
        </FormLabel>
        <RadioGroup>
          <HStack spacing="20px" align="center">
            {GENDER_OPTIONS.map((genderOption) => (
              <Radio
                key={genderOption.value}
                ref={register}
                name="gender"
                value={genderOption.value}
                isChecked={gender === genderOption.value}
                fontSize="16px"
                lineHeight="20px"
                colorScheme="cyan"
                position="initial"
                border="1px solid #CCCCCC"
                __focus={{ boxShadow: "none" }}
              >
                {t(`pixSignup:gender${genderOption.text}Option`)}
              </Radio>
            ))}
          </HStack>
        </RadioGroup>
      </HStack>
      <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
    </FormControl>
  );
};

export default GenderInput;
