import React from "react";
import { Select, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

interface PixInputProps {
  name: string;
  options: { value: string; label: string }[];
  label?: string;
}

const PixSharedSelectInput = ({ name, options, label }: PixInputProps) => {
  const { register, errors } = useFormContext();
  const { t } = useTranslation();

  return (
    <FormControl isInvalid={errors[name] ? true : false}>
      {label && (
        <FormLabel color="black" fontWeight="bold" fontSize="16px" lineHeight="20px" htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <Select
        background="#FFFFFF"
        border="1px solid #CCCCCC"
        borderRadius="4px"
        name={name}
        w="400px"
        iconColor="blue"
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
        color="black"
        ref={register({
          required: t("form:formRequiredField"),
        })}
      >
        {options.map((elem) => (
          <option key={elem.value} id={elem.value} value={elem.value}>
            {t(elem.label)}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{errors[name] && errors[name].message}</FormErrorMessage>
    </FormControl>
  );
};

export default PixSharedSelectInput;
