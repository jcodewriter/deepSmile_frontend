import React from "react";
import { Input, FormControl, FormLabel, FormErrorMessage, Text, Link, Flex } from "@chakra-ui/core";

import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { PIX_PASSWORD_FORGOTTEN_ROUTE } from "src/utils/constants/routes";
import { useFormContext } from "react-hook-form";
import useTranslation from "next-translate/useTranslation";

const PixLoginFormPasswordInput = () => {
  const { t } = useTranslation();
  const { register, errors } = useFormContext();

  return (
    <FormControl id="password" isInvalid={!!errors.password}>
      <FormLabel
        width="100%"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="14px"
        lineHeight="20px"
      >
        <Flex justify="space-between">
          <Text>{t("pixSignIn:passwordLabel")}</Text>
          <SharedNextTranslateLink href={PIX_PASSWORD_FORGOTTEN_ROUTE} shallow>
            <Link textDecoration="underline">{t("pixSignIn:passwordForgottenLink")}</Link>
          </SharedNextTranslateLink>
        </Flex>
      </FormLabel>
      <Input
        background="#FFFFFF"
        border="1px solid #CCCCCC"
        borderRadius="4px"
        fontStyle="normal"
        fontWeight="500"
        fontSize="16px"
        lineHeight="20px"
        name="password"
        placeholder="Password"
        type={"password"}
        ref={register({
          required: t("form:formRequiredField"),
        })}
      />
      <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
    </FormControl>
  );
};

export default PixLoginFormPasswordInput;
