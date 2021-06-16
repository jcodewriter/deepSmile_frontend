import React from "react";
import { Stack } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";
import { Menu, Quote } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import useTranslation from "next-translate/useTranslation";

const UdiniPixTestimonialView = () => {
  const { t } = useTranslation();
  return (
    <MainBox backgroundColor="brandGrey.900">
      <Stack align="center" my="60px" spacing="15px">
        <Quote color="#FFFFFF" textAlign="center" width={{ base: "90%", md: "80%" }}>
          {t("udiniPix:testimonialsSectionQuote")}
        </Quote>
        <Menu color="white" textAlign="center">
          {t("udiniPix:testimonialsSectionAuthor")}
        </Menu>
      </Stack>
    </MainBox>
  );
};

export default UdiniPixTestimonialView;
