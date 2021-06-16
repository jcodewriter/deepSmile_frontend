import React, { useEffect } from "react";

import { Stack, Text } from "@chakra-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import PixSharedSelectInput from "src/modules/pix/shared/components/Forms/PixSharedSelectInput";
import PixSharedPageTileView from "src/modules/pix/shared/components/Views/PixSharedPageTileView";
import useTranslation from "next-translate/useTranslation";

interface FormData {
  language: string;
}

const PixLanguageForm = () => {
  const methods = useForm<FormData>({ mode: "onBlur" });
  const { t, lang } = useTranslation();
  const onSubmit = methods.handleSubmit((values) => {
    console.log(values);
  });

  const options = [
    { value: "fr", label: "pixLanguage:frOption" },
    { value: "en", label: "pixLanguage:engOption" },
  ];

  useEffect(() => {
    methods.setValue("language", lang);
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} style={{ height: "100%" }}>
        <Stack padding="50px 80px" spacing="24px" h="100%" bg="brandGrey.100">
          <PixSharedPageTileView isProfile pageTitle={t("pixLanguage:pageTitle")} />
          <Stack spacing="43px">
            <Text fontWeight="500" fontSize="16px" lineHeight="20px" color="#000000">
              {t("pixLanguage:text")}
            </Text>
            <PixSharedSelectInput
              name="language"
              label={t("pixLanguage:label")}
              options={options}
            />
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default PixLanguageForm;
