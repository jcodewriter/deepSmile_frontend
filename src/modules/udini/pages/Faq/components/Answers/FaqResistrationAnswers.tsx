import React from "react";
import { Link, Stack } from "@chakra-ui/core";
import FaqItem from "../Controls/FaqItem";
import useTranslation from "next-translate/useTranslation";
import { UDINI_EMAIL } from "src/utils/constants/udini";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { PIX_SIGNUP_ROUTE } from "src/utils/constants/routes";

const FaqResistrationAnswers = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing="25px">
      <FaqItem question="registrationHowToRegisterQuestion">
        {t("udiniFaq:registrationHowToRegisterQuestionBeginText")}{" "}
        <SharedNextTranslateLink href={PIX_SIGNUP_ROUTE}>
          <Link color="#3277cc" _hover={{ color: "#2f6fbf" }}>
            {t("udiniFaq:registrationHowToRegisterQuestionLink")}
          </Link>
        </SharedNextTranslateLink>{" "}
        {t("udiniFaq:registrationHowToRegisterQuestionEndText")}
      </FaqItem>

      <FaqItem question="registrationHowToUseQuestion">
        <p>
          {t("udiniFaq:registrationHowToUseQuestionFirstParagraphBegin")}
          <br />
          {t("udiniFaq:registrationHowToUseQuestionFirstParagraphSecondText")}
          <SharedNextTranslateLink href={PIX_SIGNUP_ROUTE}>
            <Link color="#3277cc" _hover={{ color: "#2f6fbf" }}>
              {t("udiniFaq:registrationHowToRegisterQuestionLink")}
            </Link>
          </SharedNextTranslateLink>

          {t("udiniFaq:registrationHowToUseQuestionFirstParagraphEnd")}
        </p>

        <p>
          {t("udiniFaq:registrationHowToUseQuestionSecondParagraphBegin")}
          <br />
          {t("udiniFaq:registrationHowToUseQuestionSecondParagraphEnd")}
        </p>
      </FaqItem>

      <FaqItem question="registrationWithSoftwareQuestion">
        <p>{t("udiniFaq:registrationWithSoftwareQuestionFirstText")}</p>
        <p>{t("udiniFaq:registrationWithSoftwareQuestionSecondText")}</p>
      </FaqItem>

      <FaqItem question="registrationNoSotwareQuestion">
        {t("udiniFaq:registrationNoSotwareQuestionText")}
      </FaqItem>

      <FaqItem question="registrationNoInternetQuestion">
        {t("udiniFaq:registrationNoInternetQuestionText")}
      </FaqItem>

      <FaqItem question="registrationWebsiteErrorQuestion">
        {t("udiniFaq:registrationWebsiteErrorQuestionFirstText")}
        <br />
        {t("udiniFaq:registrationWebsiteErrorQuestionSecondText")}
        <br />
        {t("udiniFaq:registrationWebsiteErrorQuestionThirdText")}
        <br />
        {t("udiniFaq:registrationWebsiteErrorQuestionLastText")}{" "}
        <Link color="#3277cc" _hover={{ color: "#2f6fbf" }} href={`mailto:${UDINI_EMAIL}`}>
          {UDINI_EMAIL}
        </Link>
      </FaqItem>

      <FaqItem question="registrationForgetToDowloadQuestion">
        {t("udiniFaq:registrationForgetToDowloadQuestionText")}
      </FaqItem>

      <FaqItem question="registrationLoadMultiplePhotosQuestion">
        {t("udiniFaq:registrationLoadMultiplePhotosQuestionText")}
      </FaqItem>

      <FaqItem question="registrationUploadErrorQuestion">
        {t("udiniFaq:registrationUploadErrorQuestionFirstText")}
        <br />
        {t("udiniFaq:registrationUploadErrorQuestionSecondText")}
        <br />
        {t("udiniFaq:registrationUploadErrorQuestionLastText")}{" "}
        <Link color="#3277cc" _hover={{ color: "#2f6fbf" }} href={`mailto:${UDINI_EMAIL}`}>
          {UDINI_EMAIL}
        </Link>
      </FaqItem>
    </Stack>
  );
};

export default FaqResistrationAnswers;
