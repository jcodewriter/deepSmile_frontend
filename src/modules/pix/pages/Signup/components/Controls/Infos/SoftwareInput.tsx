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

const SoftwareInput = ({ data }: { data: { name: "software"; value: string; text: string }[] }) => {
  const { register, errors, watch } = useFormContext();
  const { t } = useTranslation();
  const isOtherSoftware = watch("software");

  return (
    <FormControl id="software" as="fieldset" isInvalid={!!errors.software} isRequired>
      <FormLabel fontWeight="bold" fontSize="16px" lineHeight="20px">
        {t("pixSignup:softwareLabel")}
      </FormLabel>
      <RadioGroup>
        <Wrap spacing="24px">
          {data.map((elem) => (
            <Box key={`${elem.name}_${elem.value}`}>
              <Radio
                name={elem.name}
                value={elem.value}
                ref={register}
                // Even though chakra doc states that you need a "onChange" when using isChecked, hook-form handles that for us
                isChecked={isOtherSoftware === elem.value}
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
      {isOtherSoftware === "otherSoftware" && (
        <Input
          name="otherSoftware"
          mt="20px"
          placeholder={t("pixSignup:softwarePlaceholder")}
          ref={register}
          border="1px solid #CCCCCC"
        />
      )}
      <FormErrorMessage>{errors.software && errors.software.message}</FormErrorMessage>
    </FormControl>
  );
};

export default SoftwareInput;
