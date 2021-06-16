import React from "react";
import { Input, FormControl, FormErrorMessage } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";
import PixSharedFormLabel from "../Views/PixSharedFormLabel";

interface PixInputsProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}

const PixSharedInput = ({ name, label, type = "text", placeholder = "" }: PixInputsProps) => {
  const { register, errors } = useFormContext();
  const { t } = useTranslation();

  return (
    <FormControl id={name} isInvalid={!!errors[name]}>
      {label && <PixSharedFormLabel htmlFor={name}>{label}</PixSharedFormLabel>}
      <Input
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

export default PixSharedInput;
