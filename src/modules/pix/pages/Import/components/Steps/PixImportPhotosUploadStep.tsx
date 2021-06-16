import React, { useMemo } from "react";
import { Stack, Text, Heading, Skeleton } from "@chakra-ui/core";

import PixImportPhotosDropzone from "src/modules/pix/pages/Import/components/Control/Import/PixImportPhotosDropzone";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";

const PixImportPhotosUploadStepLayout = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();

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
      {children}
    </Stack>
  );
};

const PixImportPhotosUploadStep = () => {
  const { profile } = useAuthState();
  const photosUsed = profile?.planInfos?.numberOfPhotosUsed;
  const photosInPlan = profile?.planInfos?.numberOfPhotosInPlan;

  const canUpload = useMemo(() => {
    if (typeof photosUsed === "number" && typeof photosInPlan === "number") {
      return photosInPlan - photosUsed > 0 || photosInPlan === -1;
    }
  }, [photosUsed, photosInPlan]);

  return (
    <PixImportPhotosUploadStepLayout>
      {canUpload ? <PixImportPhotosDropzone /> : <Skeleton w="700px" h="200px" />}
    </PixImportPhotosUploadStepLayout>
  );
};

export default PixImportPhotosUploadStep;
