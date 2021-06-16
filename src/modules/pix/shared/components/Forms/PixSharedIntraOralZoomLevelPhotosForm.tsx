import React, { useEffect } from "react";
import { Stack, Heading } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import { usePixFunnelFunctions } from "src/modules/pix/shared/contexts/PixFunnelContext";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";
import PixSharedRadioGroupImage from "./PixSharedRadioGroupImage";
import { IntraOralZoomLevel } from "src/shared/types/User";

const PixSharedIntraOralZoomLevelPhotosForm = () => {
  const { watch } = useFormContext();
  const { profile } = useAuthState();

  const { handleIntraoralZoomLevelStep } = usePixFunnelFunctions();
  const { t } = useTranslation();

  const currentValue = watch(
    "intraOralZoomLevel",
    profile?.customizationParameters?.intraOralZoomLevel
  );
  const OPTIONS = [
    {
      value: IntraOralZoomLevel.LEVEL_85P,
      label: t("pixCustomizationParameters:faceZoomLevelLowOption"),
      imageSrc: "/img/intra_zoom_low.jpeg",
    },
    {
      value: IntraOralZoomLevel.LEVEL_95P,
      label: t("pixCustomizationParameters:faceZoomLevelMediumOption"),
      imageSrc: "/img/intra_zoom_medium.jpeg",
    },
  ];

  useEffect(() => {
    handleIntraoralZoomLevelStep({ intraOralZoomLevel: currentValue });
  }, [currentValue]);

  return (
    <Stack spacing="45px" paddingY="31px">
      <Heading fontWeight="500" fontSize="24px" lineHeight="36px" textAlign="center">
        {t("pixCustomizationParameters:intraoralZoomTitle")}
      </Heading>
      <PixSharedRadioGroupImage
        options={OPTIONS}
        name="intraOralZoomLevel"
        defaultValue={profile?.customizationParameters?.intraOralZoomLevel}
        width="350px"
      />
    </Stack>
  );
};

export default PixSharedIntraOralZoomLevelPhotosForm;
