import React from "react";
import { useRouter } from "next/router";
import PixSharedHeaderView from "src/modules/pix/shared/components/Views/PixSharedHeaderView";
import { Flex } from "@chakra-ui/core";
import PixSharedFaceZoomLevelPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedFaceZoomLevelPhotosForm";
import PixSharedFaceBackgroundColorPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedFaceBackgroundColorPhotosForm";
import PixSharedOcclusalCutPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedOcclusalCutPhotosForm";
import PixSharedIntraOralZoomLevelPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedIntraOralZoomLevelPhotosForm";
import PixSharedUseMirrorPhotosForm from "src/modules/pix/shared/components/Forms/PixSharedUseMirrorPhotosForm";
import { useForm, FormProvider } from "react-hook-form";
import PixSharedFooterView from "src/modules/pix/shared/components/Views/PixSharedFooterView";
import PixSharedProgressView from "src/modules/pix/shared/components/Views/PixSharedProgressView";
import { useAuthDispatch } from "src/shared/contexts/AuthContext";
import { pushNext, PIX_HOME_ROUTE } from "src/utils/constants/routes";
import { FunnelVariables } from "src/modules/pix/shared/types/funnel";
import { usePixFunnelState } from "src/modules/pix/shared/contexts/PixFunnelContext";
import useTranslation from "next-translate/useTranslation";

const PixFunnelForm = () => {
  const router = useRouter();
  const { lang } = useTranslation();
  const { funnelVariables } = usePixFunnelState();
  const { updateUserCustomizationParameters } = useAuthDispatch();
  const stage = router.query.stage;
  const methods = useForm<FunnelVariables>({
    mode: "onBlur",
  });

  const onSubmit = methods.handleSubmit(() => {
    updateUserCustomizationParameters({
      ...funnelVariables,
      useMirror: !!funnelVariables.useMirror,
      useMirrorOcclusal: !!funnelVariables.useMirrorOcclusal,
      autoSoftwareFlip: !!funnelVariables.autoSoftwareFlip,
    });
    pushNext(PIX_HOME_ROUTE, undefined, { lang });
  });

  return (
    <Flex direction="column">
      <PixSharedHeaderView isImport={false} />
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <PixSharedProgressView isImport={false} />
          <Flex
            justify="center"
            marginX="auto"
            maxW="620px"
            minH="calc(100vh - 80px - 116px - 64px)"
          >
            {stage === "faceZoomLevel" && <PixSharedFaceZoomLevelPhotosForm />}
            {stage === "faceBackgroundColor" && <PixSharedFaceBackgroundColorPhotosForm />}
            {stage === "occlusalCut" && <PixSharedOcclusalCutPhotosForm />}
            {stage === "intraOralZoomLevel" && <PixSharedIntraOralZoomLevelPhotosForm />}
            {stage === "useMirror" && <PixSharedUseMirrorPhotosForm />}
          </Flex>
          <PixSharedFooterView isImport={false} />
        </form>
      </FormProvider>
    </Flex>
  );
};

export default PixFunnelForm;
