import React from "react";
import { Box, Heading, Text } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import UdiniTermsOfUseEnglish from "../Contents/UdiniTermsOfUseEnglish";
import UdiniTermsOfUseFrench from "../Contents/UdiniTermsOfUseFrench";

const UdiniTermsOfUseContentView = () => {
  const { t, lang } = useTranslation();

  return (
    <Box
      as="section"
      bg="brandGrey.100"
      paddingTop="120px"
      paddingBottom="75px"
      paddingRight={{ base: "5px", sm: "25px", md: "75px" }}
      paddingLeft={{ base: "5px", sm: "35px", md: "80px" }}
    >
      <Heading fontWeight="bold" fontSize={{ base: "30px", sm: "50px" }} lineHeight="122%">
        {t("udiniTermsOfUse:pageTitle")}.
      </Heading>
      <Text fontWeight="600" fontSize="16px" lineHeight="20px" marginTop="20px" marginBottom="70px">
        {t("udiniTermsOfUse:presentation")}
      </Text>
      {lang === "en" ? <UdiniTermsOfUseEnglish /> : <UdiniTermsOfUseFrench />}
    </Box>
  );
};

export default UdiniTermsOfUseContentView;
