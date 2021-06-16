import React, { useEffect } from "react";
import { Stack, Heading, useToast } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import { usePixFunnelFunctions } from "src/modules/pix/shared/contexts/PixFunnelContext";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";
import PixSharedRadioGroupImage from "./PixSharedRadioGroupImage";
import { OcclusalCut } from "src/shared/types/User";

const PixSharedOcclusalCutPhotosForm = ({ isCenter = true }: { isCenter?: boolean }) => {
  const { watch, formState } = useFormContext();
  const { profile } = useAuthState();
  const { handleOcclusalCutStep } = usePixFunnelFunctions();
  const { t } = useTranslation();
  const toast = useToast();

  const currentValue = watch("occlusalCut", profile?.customizationParameters?.occlusalCut);

  const OPTIONS = [
    {
      value: OcclusalCut.SIX,
      label: t("pixCustomizationParameters:occlusalCutSixOption"),
      imageSrc: "/img/cut_after_6.jpeg",
    },
    {
      value: OcclusalCut.SEVEN,
      label: t("pixCustomizationParameters:occlusalCutSevenOption"),
      imageSrc: "/img/cut_after_7.jpeg",
    },
  ];
  console.log(formState.dirtyFields);
  useEffect(() => {
    handleOcclusalCutStep({ occlusalCut: currentValue });
  }, [currentValue]);

  useEffect(() => {
    if (formState.dirtyFields.occlusalCut && currentValue === OcclusalCut.SEVEN) {
      toast({
        title: t("pixCustomizationParameters:toastOcclusalCutSevenOption"),
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }, [currentValue, formState.dirtyFields]);

  return (
    <Stack spacing="45px" paddingY="31px" textAlign={isCenter ? "center" : "left"}>
      <Heading fontWeight="500" fontSize="24px" lineHeight="36px">
        {t("pixCustomizationParameters:occlusalCutTitle")}
      </Heading>
      <PixSharedRadioGroupImage
        name="occlusalCut"
        options={OPTIONS}
        width="403px"
        defaultValue={profile?.customizationParameters?.occlusalCut}
      />
    </Stack>
  );
};

export default PixSharedOcclusalCutPhotosForm;
