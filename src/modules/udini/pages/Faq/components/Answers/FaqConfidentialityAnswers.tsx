import React from "react";
import { Stack } from "@chakra-ui/core";
import FaqItem from "../Controls/FaqItem";
import useTranslation from "next-translate/useTranslation";

const FaqConfidentialityAnswers = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing="25px">
      <FaqItem question="confidentialityPhotosQuestion">
        <p>{t("udiniFaq:confidentialityPhotosQuestionFirstText")}</p>
        <p>{t("udiniFaq:confidentialityPhotosQuestionLastText")}</p>
      </FaqItem>
      <FaqItem question="confidentialityGDPRQuestion">
        <p>{t("udiniFaq:confidentialityGDPRQuestionText")}</p>
      </FaqItem>
    </Stack>
  );
};

export default FaqConfidentialityAnswers;
