import React, { useEffect, useMemo } from "react";
import { Box, Flex } from "@chakra-ui/core";
import PixSharedHeaderView from "src/modules/pix/shared/components/Views/PixSharedHeaderView";
import PixImportPhotosUploadStep from "./Steps/PixImportPhotosUploadStep";
import PixImportPhotosGalleryStep from "./Steps/PixImportPhotosGalleryStep";
import PixImportPhotosCompositeStep from "./Steps/PixImportPhotosCompositeStep";
import PixImportPhotosEditorStep from "./Steps/PixImportPhotosEditorStep";
import {
  usePixPhotoProcessorState,
  usePixPhotoProcessorDispatch,
  usePixPhotoProcessorFunctions,
} from "src/modules/pix/pages/Import/shared/contexts/PixImportContext";
import {
  PhotoProcessorStep,
  PixPhotoProcessorActionType,
  TEMPLATE_STATUTES,
} from "src/modules/pix/pages/Import/shared/types/PhotoProcessorContext";
import PixImportPhotosProcessingStep from "src/modules/pix/pages/Import/components/Steps/PixImportPhotosProcessingStep";
import PixImportProgressView from "./Views/Layout/PixImportProgressView";

import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import { GET_JOB } from "src/graphql/Queries/Job";
import { getJobPayload } from "src/shared/types/Mutations/Job";
import CommonHelper from "src/utils/helpers/CommonHelper";

const PixImport = () => {
  const { step, editorState } = usePixPhotoProcessorState();
  const router = useRouter();
  const { setCompositeData } = usePixPhotoProcessorFunctions();
  const dispatch = usePixPhotoProcessorDispatch();
  const idJob = router.query.idJob ? router.query.idJob : null;
  const { data } = idJob
    ? useQuery<getJobPayload>(GET_JOB, {
        variables: { where: { id: idJob } },
      })
    : { data: null };

  const templateImageList = useMemo(() => {
    const inputImageMap = new Map(
      data?.job.inputImages?.map((image) => [image.id, { url: image.url, name: image.filename }])
    );

    return data?.job.processedImages.map((processedImage) => {
      const originalUrl = CommonHelper.convertS3Url(
        inputImageMap.get(processedImage.idOriginalImage)?.url ?? ""
      );
      const url = processedImage.url ? CommonHelper.convertS3Url(processedImage.url) : originalUrl;

      return {
        id: processedImage.id,
        type: processedImage.type,
        filename: inputImageMap.get(processedImage.idOriginalImage)?.name ?? "",
        url,
        originalUrl,
      };
    });
  }, [data?.job.inputImages, data?.job.processedImages]);

  useEffect(() => {
    if (templateImageList?.length && data) {
      dispatch({
        type: PixPhotoProcessorActionType.SET_PE_GALLERY,
        processedJob: data?.job,
      });
      setCompositeData(templateImageList);
      dispatch({
        type: PixPhotoProcessorActionType.SET_TEMPLATE_STATUS,
        status: TEMPLATE_STATUTES.SUCCESS,
      });
      dispatch({
        type: PixPhotoProcessorActionType.UPDATE_TEMPLATE_ZIP_URL,
        url: data?.job.urlZip,
      });
      dispatch({
        type: PixPhotoProcessorActionType.SET_COMPOSITE_READ_ONLY,
        readOnly: true,
      });
      dispatch({
        type: PixPhotoProcessorActionType.SET_PE_COMPOSITE,
      });
    }
  }, [templateImageList?.length, data?.job]);

  if (editorState.isOn) return <PixImportPhotosEditorStep />;

  return (
    <Flex direction="column">
      <PixSharedHeaderView />
      <Box as="main" bg="brandGrey.100">
        <PixImportProgressView />
        {step === PhotoProcessorStep.WAITING_FOR_FILES && <PixImportPhotosUploadStep />}
        {step === PhotoProcessorStep.PROCESSING && <PixImportPhotosProcessingStep />}
        {step === PhotoProcessorStep.GALLERY && <PixImportPhotosGalleryStep />}
        {step === PhotoProcessorStep.COMPOSITE && <PixImportPhotosCompositeStep />}
      </Box>
    </Flex>
  );
};

export default PixImport;
