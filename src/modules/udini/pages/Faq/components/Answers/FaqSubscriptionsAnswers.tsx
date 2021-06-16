import React from "react";
import { Link, Stack } from "@chakra-ui/core";
import FaqItem from "../Controls/FaqItem";
import useTranslation from "next-translate/useTranslation";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { PIX_HOME_ROUTE, PIX_SIGNUP_ROUTE } from "src/utils/constants/routes";

const FaqSubscriptionsAnswers = () => {
  const { t } = useTranslation();

  return (
    <Stack spacing="25px">
      <FaqItem question="subscriptionFreeQuestion">
        {t("udiniFaq:subscriptionFreeQuestionText")}
        <SharedNextTranslateLink href={PIX_SIGNUP_ROUTE}>
          <Link color="#3277cc" _hover={{ color: "#2f6fbf" }}>
            {t("udiniFaq:registrationHowToRegisterQuestionLink")}
          </Link>
        </SharedNextTranslateLink>
        .
      </FaqItem>
      <FaqItem question="subscriptionCancelQuestion">
        <p>
          {t("udiniFaq:subscriptionCancelQuestionFirstText")}{" "}
          <SharedNextTranslateLink href={PIX_SIGNUP_ROUTE}>
            <Link color="#3277cc" _hover={{ color: "#2f6fbf" }}>
              Udini.co
            </Link>
          </SharedNextTranslateLink>
          .
        </p>
        <p>{t("udiniFaq:subscriptionCancelQuestionSecondText")}</p>
        <p>{t("udiniFaq:subscriptionCancelQuestionLastText")}</p>
      </FaqItem>
      <FaqItem question="subscriptionUpdateQuestion">
        <p>
          {t("udiniFaq:subscriptionUpdateQuestionFirstText")}
          <SharedNextTranslateLink href={PIX_HOME_ROUTE}>
            <Link color="#3277cc" _hover={{ color: "#2f6fbf" }}>
              {t("udiniFaq:registrationHowToRegisterQuestionLink")}
            </Link>
          </SharedNextTranslateLink>
        </p>
        <p>{t("udiniFaq:subscriptionUpdateQuestionSecondText")}</p>
        <p>{t("udiniFaq:subscriptionUpdateQuestionLastText")}</p>
      </FaqItem>
    </Stack>
  );
};

export default FaqSubscriptionsAnswers;
