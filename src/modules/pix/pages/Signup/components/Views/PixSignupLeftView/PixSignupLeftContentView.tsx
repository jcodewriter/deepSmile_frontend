import React from "react";
import { Stack, Heading, Image, Flex } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";

const PixSignupLeftContentView = () => {
  const { t } = useTranslation();
  return (
    <Stack spacing="25px" marginX="45px" alignItems="center">
      <Flex justify="center" align="center">
        <Image src="/svg/PixSmall.svg" alt="Pix+ logo" />
      </Flex>
      <Stack pt="63px" spacing="45px">
        {Array.of(1, 2, 3).map((value) => (
          <Stack key={value} direction="row">
            <Image src="/svg/checkmark-round.svg" alt="check mark" />
            <Heading fontWeight="bold" fontSize="24px" lineHeight="28px">
              {t(`pixSignup:valuePropositionTitle${value}`)}
            </Heading>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default PixSignupLeftContentView;
