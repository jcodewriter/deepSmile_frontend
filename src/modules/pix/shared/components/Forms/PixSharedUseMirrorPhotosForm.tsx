import React, { useEffect, useMemo } from "react";
import { Stack, Heading, CheckboxGroup, Flex, Checkbox, Box } from "@chakra-ui/core";
import { useFormContext } from "react-hook-form";
import { usePixFunnelFunctions } from "src/modules/pix/shared/contexts/PixFunnelContext";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";

const PixSharedUseMirrorPhotosForm = () => {
  const { register, watch } = useFormContext();
  const { profile } = useAuthState();
  const { handleUseMirrorStep } = usePixFunnelFunctions();
  const { t } = useTranslation();

  const useMirrorValue = watch("useMirror", profile?.customizationParameters?.useMirror);
  const useMirrorOcclusalValue = watch(
    "useMirrorOcclusal",
    profile?.customizationParameters?.useMirrorOcclusal
  );
  const autoSoftwareFlipValue = watch(
    "autoSoftwareFlip",
    profile?.customizationParameters?.autoSoftwareFlip
  );

  const OPTIONS = [
    {
      value: "useMirror",
      label: t("pixCustomizationParameters:mirrorUseMirrorQuestion"),
      watch: useMirrorValue,
    },
    {
      value: "useMirrorOcclusal",
      label: t("pixCustomizationParameters:mirrorUseMirrorOcclusalQuestion"),
      watch: useMirrorOcclusalValue,
    },
    {
      value: "autoSoftwareFlip",
      label: t("pixCustomizationParameters:mirrorUseMirrorSoftwareQuestion"),
      watch: autoSoftwareFlipValue,
    },
  ];

  useEffect(() => {
    handleUseMirrorStep({
      useMirror: !!useMirrorValue,
      useMirrorOcclusal: !!useMirrorOcclusalValue,
      autoSoftwareFlip: !!autoSoftwareFlipValue,
    });
  }, [useMirrorValue, useMirrorOcclusalValue]);

  const defaultValue = useMemo(() => {
    const values: string[] = [];

    if (useMirrorValue) values.push("useMirror");
    if (useMirrorOcclusalValue) values.push("useMirrorOcclusal");
    if (autoSoftwareFlipValue) values.push("autoSoftwareFlip");

    return values;
  }, []);

  return (
    <Stack spacing="110px" paddingY="31px" textAlign="center">
      <Heading fontWeight="500" fontSize="24px" lineHeight="36px">
        {t("pixCustomizationParameters:mirrorTitle")}
      </Heading>
      <CheckboxGroup defaultValue={defaultValue}>
        <Stack spacing="15px" align="center">
          {OPTIONS.map(({ value, label, watch }) => (
            <Box key={value} pt={value === "autoSoftwareFlip" ? "55px" : "0px"}>
              <Checkbox
                //cursor="url(/svg/radioImageCursor.svg), auto"
                id={value}
                name={value}
                ref={register}
                value={value}
                defaultIsChecked={!!watch}
                size="lg"
                colorScheme="white"
                background={watch === false ? "#FFFFFF" : "brandBlue.100"}
                border="1px solid #DDDDDD"
                borderRadius="3px"
                paddingLeft="26px"
              >
                <Flex
                  align="center"
                  justify="center"
                  fontWeight={watch === false ? "500" : "bold"}
                  fontSize="16px"
                  lineHeight="36px"
                  color={watch === false ? "black" : "#FFFFFF"}
                  w="500px"
                  h="80px"
                  mr="54px"
                >
                  {label}
                </Flex>
              </Checkbox>
            </Box>
          ))}
        </Stack>
      </CheckboxGroup>
    </Stack>
  );
};

export default PixSharedUseMirrorPhotosForm;
