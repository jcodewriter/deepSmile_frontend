import React from "react";
import { Stack, Heading, HStack, Box } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";

const PixHomeVideosView = () => {
  const { t } = useTranslation();
  return (
    <Stack as="section" spacing="24px">
      <Heading fontWeight="normal" fontSize="20px" lineHeight="24px">
        {t("pixProfileHome:profileHomeWhy")}
      </Heading>
      <HStack spacing="24px">
        {[1, 2, 3].map((value) => (
          <Box
            key={value}
            bg="brandGrey.100"
            border="1px solid #CCCCCC"
            h="322px"
            w="344px"
            borderRadius="4px"
          />
        ))}
      </HStack>
    </Stack>
  );
};

export default PixHomeVideosView;
