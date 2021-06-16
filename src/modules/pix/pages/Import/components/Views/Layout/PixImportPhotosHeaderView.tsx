import React, { useState } from "react";
import { Flex, Link as ChakraLink, Image } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import {
  usePixPhotoProcessorState,
  usePixPhotoProcessorFunctions,
} from "../../../shared/contexts/PixImportContext";
import { PhotoProcessorStep } from "../../../shared/types/PhotoProcessorContext";
import { useRouter } from "next/router";
import PixImportDialog from "../../Control/PixImportDialog";

const getPreviousStep = (currentStep: number) => {
  switch (currentStep) {
    case PhotoProcessorStep.PROCESSING:
      return PhotoProcessorStep.WAITING_FOR_FILES;
    case PhotoProcessorStep.GALLERY:
      return PhotoProcessorStep.WAITING_FOR_FILES;
    case PhotoProcessorStep.COMPOSITE:
      return PhotoProcessorStep.GALLERY;
    default:
      return -1;
  }
};

const PixImportPhotosHeaderView = () => {
  const { t } = useTranslation();
  const { step, jobState } = usePixPhotoProcessorState();
  const router = useRouter();
  const { goToPreviousStep } = usePixPhotoProcessorFunctions();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onGoToPreviousStep = () => {
    const previousStep = getPreviousStep(step);

    if (previousStep === PhotoProcessorStep.WAITING_FOR_FILES && !jobState.downloadCounter) {
      setIsDialogOpen(true);
    } else if (previousStep === -1) {
      router.back();
    } else {
      goToPreviousStep(previousStep);
    }
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };
  const onConfirmDialog = () => {
    onCloseDialog();
    goToPreviousStep(getPreviousStep(step));
  };

  return (
    <>
      <Flex align="center" h="100%" direction="row">
        <ChakraLink
          display="flex"
          onClick={onGoToPreviousStep}
          color="white"
          fontSize="16px"
          lineHeight="22px"
        >
          <Image src="/svg/back.svg" mr="20px" />

          {t("shared:goBack")}
        </ChakraLink>
        <Image
          width="85px"
          height="47px"
          marginX="auto"
          src="/svg/PixSmall.svg"
          alt="Pix Small Icon"
        />
      </Flex>
      <PixImportDialog isOpen={isDialogOpen} onClose={onCloseDialog} onConfirm={onConfirmDialog} />
    </>
  );
};

export default PixImportPhotosHeaderView;
