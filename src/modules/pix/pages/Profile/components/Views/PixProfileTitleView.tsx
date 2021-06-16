import React from "react";
import useTranslation from "next-translate/useTranslation";
import { Flex, Text } from "@chakra-ui/core";

const PixProfileTitleView = () => {
  const { t } = useTranslation();
  return (
    <Flex direction="row" paddingTop="74px" paddingRight="80px">
      <Text
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="40px"
        lineHeight="32px"
        color="#212B36"
      >
        {t("profile:profileTitle")}
      </Text>
    </Flex>
  );
};

export default PixProfileTitleView;
