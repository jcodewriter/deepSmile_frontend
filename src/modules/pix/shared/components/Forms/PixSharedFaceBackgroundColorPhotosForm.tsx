import React, { useEffect } from "react";
import { Stack, Heading, HStack, Box, Input } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import { usePixFunnelFunctions } from "src/modules/pix/shared/contexts/PixFunnelContext";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";
import { SketchPicker } from "react-color";

const PixSharedFaceBackgroundColorPhotosForm = () => {
  const { register, watch, setValue } = useFormContext();
  const { profile } = useAuthState();
  const { handleFaceBackgroundColorStep } = usePixFunnelFunctions();
  const { t } = useTranslation();

  const currentValue = watch(
    "faceBackgroundColor",
    profile?.customizationParameters?.faceBackgroundColor
  );

  useEffect(() => {
    handleFaceBackgroundColorStep({ faceBackgroundColor: currentValue });
  }, [currentValue]);

  return (
    <Stack spacing="45px" paddingY="31px" textAlign="center">
      <Heading fontWeight="500" fontSize="24px" lineHeight="36px">
        {t("pixCustomizationParameters:faceBackgroundColorTitle")}
      </Heading>

      <HStack spacing="22px" justify="center">
        <SketchPicker
          color={currentValue}
          onChange={(color) => {
            setValue("faceBackgroundColor", color.hex);
          }}
        />
        <Box h="386px" w="580px" borderRadius="20px" border="1px solid black" bg={currentValue} />

        <Input
          display="none"
          w="319px"
          h="238px"
          type="color"
          ref={register}
          defaultValue={currentValue}
          name="faceBackgroundColor"
          id="faceBackgroundColor"
        />
      </HStack>
    </Stack>
  );
};

export default PixSharedFaceBackgroundColorPhotosForm;
