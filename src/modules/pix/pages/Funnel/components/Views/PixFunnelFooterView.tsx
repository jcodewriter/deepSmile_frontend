import React, { useMemo, useCallback } from "react";
import { Flex, Box } from "@chakra-ui/core";
import { PIX_FUNNEL_ROUTE, pushNext } from "src/utils/constants/routes";

import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import SharedGradientButtonLink, {
  SharedGradientButton,
} from "src/shared/components/Button/SharedGradientButton";

const getQueriesStage = (currentStage: string | string[] | undefined) => {
  switch (currentStage) {
    case "faceZoomLevel": {
      return ["begin", "faceBackgroundColor"];
    }
    case "faceBackgroundColor": {
      return ["faceZoomLevel", "occlusalCut"];
    }
    case "occlusalCut": {
      return ["faceBackgroundColor", "intraOralZoomLevel"];
    }
    case "intraOralZoomLevel": {
      return ["occlusalCut", "useMirror"];
    }
    case "useMirror": {
      return ["intraOralZoomLevel", "useMirror"];
    }
    default: {
      return ["", ""];
    }
  }
};

const PixFunnelFooterView = () => {
  const { t, lang } = useTranslation();
  const router = useRouter();

  const [previousQuery, nextQuery] = getQueriesStage(router.query.stage);
  console.log("PREV:", previousQuery);
  console.log("NEXT:", nextQuery);
  const isMirrorStep = useMemo(() => router.query.stage === "useMirror", [router.query.stage]);
  const isFaceZoomLevelStep = useMemo(() => router.query.stage === "faceZoomLevel", [
    router.query.stage,
  ]);

  const onGoToNextStep = useCallback(() => {
    pushNext(`${PIX_FUNNEL_ROUTE}?stage=${nextQuery}`, undefined, { shallow: true, lang });
  }, [router.query.stage]);

  return (
    <Flex justify={!isFaceZoomLevelStep ? "space-between" : "flex-end"} h="100%" align="center">
      {!isFaceZoomLevelStep && (
        <Box mt="30px">
          <SharedGradientButtonLink
            href={`${PIX_FUNNEL_ROUTE}?stage=${previousQuery}`}
            shallow
            background="white"
            color="black"
          >
            {t("pixFunnel:backButton")}
          </SharedGradientButtonLink>
        </Box>
      )}
      {!isMirrorStep && (
        <Box mt="30px">
          <SharedGradientButton background="white" color="black" onClick={onGoToNextStep}>
            {t(`pixFunnel:goButton`)}
          </SharedGradientButton>
        </Box>
      )}
    </Flex>
  );
};

export default PixFunnelFooterView;
