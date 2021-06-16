import React from "react";
import { HStack, Flex } from "@chakra-ui/core";
import {
  usePixPhotoProcessorFunctions,
  usePixPhotoProcessorDispatch,
  usePixPhotoProcessorState,
} from "src/modules/pix/pages/Import/shared/contexts/PixImportContext";
import {
  PixPhotoProcessorActionType,
  TEMPLATE_STATUTES,
} from "../../../shared/types/PhotoProcessorContext";
import useTranslation from "next-translate/useTranslation";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

interface PixImportPhotosFooterViewProps {
  isComposite: boolean;
  downloadTemplate?: () => void;
}

const PixImportPhotosFooterView = ({
  isComposite,
  downloadTemplate,
}: PixImportPhotosFooterViewProps) => {
  const { t } = useTranslation();
  const { jobState } = usePixPhotoProcessorState();
  const dispatch = usePixPhotoProcessorDispatch();
  const { goToComposite } = usePixPhotoProcessorFunctions();

  function handleDownLoad() {
    dispatch({ type: PixPhotoProcessorActionType.TRIGGER_DOWNLOAD });

    const link = document.createElement("a");
    link.href = jobState.job?.urlZip ?? "";
    link.setAttribute("download", "zip.zip");
    document.body.appendChild(link);
    link.click();
  }

  return isComposite ? (
    <Flex justify="flex-end" align="center" h="100%">
      <SharedGradientButton
        background="white"
        color="black"
        onClick={downloadTemplate}
        isDisabled={jobState.templateStatus === TEMPLATE_STATUTES.UPLOADING}
      >
        {t("pixImport:downloadTemplateButton")}
      </SharedGradientButton>
    </Flex>
  ) : (
    <HStack spacing="70px" h="100%" align="center" justify="center">
      <SharedGradientButton background="white" color="black" onClick={handleDownLoad}>
        {t("pixImport:download")}
      </SharedGradientButton>

      <SharedGradientButton background="white" color="black" onClick={goToComposite}>
        {t("pixImport:createTemplate")}
      </SharedGradientButton>
    </HStack>
  );
};

export default PixImportPhotosFooterView;
