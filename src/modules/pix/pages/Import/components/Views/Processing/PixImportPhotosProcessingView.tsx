import React from "react";
import { Stack, Text, Image, HStack } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import PixSharedProgressBar from "src/modules/pix/shared/components/Controls/PixSharedProgressBar";

interface PixImportPhotosProcessingViewProps {
  jobId?: string;
  progress?: number;
}

const PixImportPhotosProcessingView = ({ progress }: PixImportPhotosProcessingViewProps) => {
  const { t } = useTranslation();

  return (
    <Stack
      //cursor="url(/svg/radioImageCursor.svg), auto"
      background="brandBlue.100"
      color="white"
      width="700px"
      height="194px"
      borderRadius="8px"
      justify="center"
      align="center"
      spacing="10px"
      textAlign="center"
      fontSize="16px"
      lineHeight="24px"
    >
      <Image src="/svg/uploadIcon.svg" />
      <Text fontWeight="bold">{t("pixImport:processingStepText")}</Text>
      <HStack spacing="15px">
        <PixSharedProgressBar
          value={progress}
          w="372px"
          h="4px"
          bg="#DDDDDD"
          progressColor="white"
          borderRadius="8px"
        />
        <Text fontWeight="bold" fontSize="12px" lineHeight="24px">
          {progress}%
        </Text>
      </HStack>
    </Stack>
  );
};

export default PixImportPhotosProcessingView;
