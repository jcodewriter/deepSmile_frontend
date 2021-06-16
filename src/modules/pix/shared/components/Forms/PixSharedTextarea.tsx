import React from "react";
import { Textarea, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

interface PixInputsProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  rules?: HTMLInputElement;
}

const PixSharedTextarea = ({ name, label, type = "text", placeholder = "" }: PixInputsProps) => {
  const { register, errors } = useFormContext();
  const { t } = useTranslation();

  return (
    <FormControl id={name} isInvalid={!!errors[name]}>
      {label && (
        <FormLabel
          fontStyle="normal"
          fontWeight="bold"
          fontSize="14px"
          lineHeight="20px"
          htmlFor={name}
        >
          {label}
        </FormLabel>
      )}
      <Textarea
        resize="none"
        h="250px"
        background="#FFFFFF"
        border="1px solid #CCCCCC"
        borderRadius="4px"
        fontStyle="normal"
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
        name={name}
        type={type}
        placeholder={placeholder}
        ref={register({ required: t("form:formRequiredField") })}
      />
      <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
    </FormControl>
  );
};

export default PixSharedTextarea;
