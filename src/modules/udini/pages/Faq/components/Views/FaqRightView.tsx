import React from "react";
import { Box, Heading } from "@chakra-ui/core";
import { Text } from "src/shared/components/Text/Text";
import useTranslation from "next-translate/useTranslation";
import { OnlyChildren } from "src/modules/pix/shared/types/common";

const FaqRightView = ({ children }: OnlyChildren) => {
  const { t } = useTranslation();

  return (
    <Box
      bg="brandGrey.100"
      paddingTop="120px"
      paddingBottom="75px"
      paddingRight={{ base: 0, sm: "25px", md: "75px" }}
      paddingLeft={{ base: 0, sm: "35px", md: "80px" }}
    >
      <Heading fontWeight="bold" fontSize="50px" lineHeight="61px">
        FAQ
      </Heading>
      <Text fontWeight="600" fontSize="16px" lineHeight="20px" marginTop="20px" marginBottom="70px">
        {t("udiniFaq:presentation")}
      </Text>
      {children}
    </Box>
  );
};

export default FaqRightView;
