import React, { useEffect } from "react";
import { Stack, Text, Heading } from "@chakra-ui/core";

import PixImportPhotosProcessingView from "src/modules/pix/pages/Import/components/Views/Processing/PixImportPhotosProcessingView";
import {
  usePixPhotoProcessorFunctions,
  usePixPhotoProcessorState,
} from "src/modules/pix/pages/Import/shared/contexts/PixImportContext";
import { useSubscription } from "@apollo/client";
import { FOLLOW_JOB } from "src/graphql/Subcriptions/Job";
import { FollowJobPayload } from "types/Subscriptions";
import { PhotoProcessorStep } from "src/modules/pix/pages/Import/shared/types/PhotoProcessorContext";
import useTranslation from "next-translate/useTranslation";

const PixImportPhotosProcessingStep = () => {
  const { t } = useTranslation();
  const { jobState } = usePixPhotoProcessorState();
  const { handleError, goToGallery } = usePixPhotoProcessorFunctions();
  const { data, error } = useSubscription<FollowJobPayload>(FOLLOW_JOB, {
    variables: { idJob: jobState.jobId },
  });

  useEffect(() => {
    if (error) {
      handleError(PhotoProcessorStep.PROCESSING, error.message);
    } else if (data) {
      if (data.followJob.progress >= 100) {
        goToGallery(data.followJob);
      }
    }
  }, [data, error]);

  return (
    <Stack
      spacing="125px"
      justify="center"
      align="center"
      minH="calc(100vh - 80px - 68px)"
      textAlign="center"
    >
      <Stack spacing="16px" align="center">
        <Heading fontWeight="bold" fontSize="40px" lineHeight="36px">
          {t("pixImport:uploadStepTitle")}
        </Heading>

        <Text maxW="600px" fontWeight="500" fontSize="16px" lineHeight="23px" textAlign="center">
          {t("pixImport:uploadStepText")}
        </Text>
      </Stack>
      <PixImportPhotosProcessingView jobId={jobState.jobId} progress={data?.followJob.progress} />
    </Stack>
  );
};

export default PixImportPhotosProcessingStep;
