import React, { useEffect } from "react";
import { Stack, useToast } from "@chakra-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { useAuth } from "src/shared/contexts/AuthContext";
import { FunnelVariables } from "src/modules/pix/shared/types/funnel";
import PixSharedPageTileView from "src/modules/pix/shared/components/Views/PixSharedPageTileView";
import useTranslation from "next-translate/useTranslation";
import PixSharedSidebarLayout from "src/modules/pix/shared/components/Layouts/PixSharedSidebarLayout";
import PixSettingsPhotosTabControl from "../Controls/PixSettingsPhotosTabControl";

const PixSettingsPhotosView = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const methods = useForm<FunnelVariables>({ mode: "onBlur" });
  const [{ errorMessages, profile }, { updateUserCustomizationParameters }] = useAuth();

  const onSubmit = methods.handleSubmit((values) => {
    updateUserCustomizationParameters({
      ...values,
      useMirror: !!values.useMirror,
      useMirrorOcclusal: !!values.useMirrorOcclusal,
      autoSoftwareFlip: !!values.autoSoftwareFlip,
    });

    toast({
      title: t("pixSettingsPhotos:successToastTitle"),
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
    methods.reset();
  });

  useEffect(() => {
    if (errorMessages.length !== 0) {
      console.log("ERROR");
      toast({
        title: t("form:toastErrorTitle"),
        description: t("form:toastPhotoSettingErrorDescription"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [errorMessages.length]);

  useEffect(() => {
    methods.setValue("faceZoomLevel", profile?.customizationParameters?.faceZoomLevel);
    methods.setValue("faceBackgroundColor", profile?.customizationParameters?.faceBackgroundColor);
    methods.setValue("occlusalCut", profile?.customizationParameters?.occlusalCut);
    methods.setValue("intraOralZoomLevel", profile?.customizationParameters?.intraOralZoomLevel);
    methods.setValue("useMirror", profile?.customizationParameters?.useMirror);
    methods.setValue("useMirrorOcclusal", profile?.customizationParameters?.useMirrorOcclusal);
    methods.setValue("autoSoftwareFlip", profile?.customizationParameters?.autoSoftwareFlip);
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} style={{ width: "100%", height: "100%" }}>
        <PixSharedSidebarLayout isDirty={methods.formState.isDirty}>
          <Stack padding="50px 80px" h="100%" bg="brandGrey.100">
            <PixSharedPageTileView isProfile pageTitle={t("pixSettingsPhotos:pageTitle")} />
            <PixSettingsPhotosTabControl />
          </Stack>
        </PixSharedSidebarLayout>
      </form>
    </FormProvider>
  );
};

export default PixSettingsPhotosView;
