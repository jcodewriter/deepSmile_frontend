import React from "react";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Wrap,
  Box,
  Radio,
  RadioGroup,
} from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

const SourceInput = ({ data }: { data: { name: string; value: string; text: string }[] }) => {
  const { register, errors, watch } = useFormContext();
  const { t } = useTranslation();
  const isOtherSource = watch("source");

  return (
    <FormControl id="source" as="fieldset" isInvalid={!!errors.source} isRequired>
      <FormLabel fontWeight="bold" fontSize="16px" lineHeight="20px">
        {t("pixSignup:sourceLabel")}
      </FormLabel>
      <RadioGroup>
        <Wrap spacing="24px">
          {data.map((elem) => (
            <Box key={`${elem.name}_${elem.value}`}>
              <Radio
                name={elem.name}
                ref={register}
                value={elem.value}
                isChecked={isOtherSource === elem.value}
                fontSize="16px"
                lineHeight="20px"
                colorScheme="cyan"
                border="1px solid #CCCCCC"
              >
                {t(`pixSignup:${elem.text}`)}
              </Radio>
            </Box>
          ))}
        </Wrap>
      </RadioGroup>
      {isOtherSource === "otherSource" && (
        <Input
          name="otherSource"
          mt="20px"
          placeholder={t("pixSignup:sourcePlaceholder")}
          ref={register}
          border="1px solid #CCCCCC"
        />
      )}
      <FormErrorMessage>{errors.source && errors.source.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SourceInput;
