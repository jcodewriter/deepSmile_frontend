import React, { useEffect } from "react";
import { Stack, Heading } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import { usePixFunnelFunctions } from "src/modules/pix/shared/contexts/PixFunnelContext";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";
import PixSharedRadioGroupImage from "./PixSharedRadioGroupImage";

const PixSharedFaceZoomLevelPhotosForm = () => {
  const { watch } = useFormContext();
  const { profile } = useAuthState();

  const { handleFaceZoomLevelStep } = usePixFunnelFunctions();
  const { t } = useTranslation();

  const currentValue = watch("faceZoomLevel", profile?.customizationParameters?.faceZoomLevel);
  const OPTIONS = [
    {
      value: "LOW",
      label: t("pixCustomizationParameters:faceZoomLevelLowOption"),
      imageSrc: "/img/face_centering_zoom_low.jpeg",
    },
    {
      value: "MEDIUM",
      label: t("pixCustomizationParameters:faceZoomLevelMediumOption"),
      imageSrc: "/img/face_centering_zoom_medium.jpeg",
    },
  ];
  useEffect(() => {
    handleFaceZoomLevelStep({ faceZoomLevel: currentValue });
  }, [currentValue]);

  return (
    <Stack spacing="45px" paddingY="31px">
      <Heading fontWeight="500" fontSize="24px" lineHeight="36px" textAlign="center">
        {t("pixCustomizationParameters:faceZoomLevelTitle")}
      </Heading>
      <PixSharedRadioGroupImage
        name="faceZoomLevel"
        options={OPTIONS}
        width="350px"
        defaultValue={profile?.customizationParameters?.faceZoomLevel}
      />
    </Stack>
  );
};

export default PixSharedFaceZoomLevelPhotosForm;
