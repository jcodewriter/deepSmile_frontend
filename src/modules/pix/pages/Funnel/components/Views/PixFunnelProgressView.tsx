import React from "react";
import { Flex, Text, Button } from "@chakra-ui/core";
import Router from "next-translate/Router";

import useTranslation from "next-translate/useTranslation";
import PixSharedProgressBar from "src/modules/pix/shared/components/Controls/PixSharedProgressBar";

const getStageText = (currentStage: string | string[] | undefined) => {
  switch (currentStage) {
    case "faceZoomLevel":
      return "stepOne";
    case "faceBackgroundColor":
      return "stepTwo";
    case "occlusalCut":
      return "stepThree";
    case "intraOralZoomLevel":
      return "stepFour";
    case "useMirror":
      return "stepFive";
    default:
      return "";
  }
};
const getStagePercent = (currentStage: string | string[] | undefined) => {
  switch (currentStage) {
    case "faceZoomLevel":
      return 20;
    case "faceBackgroundColor":
      return 40;
    case "occlusalCut":
      return 60;
    case "intraOralZoomLevel":
      return 80;
    case "useMirror":
      return 100;
    default:
      return 0;
  }
};

const PixFunnelProgressView = () => {
  const { t } = useTranslation();

  const stepText = getStageText(Router.query.stage);
  const value = getStagePercent(Router.query.stage);

  return (
    <Flex justify="space-between" paddingX="15px" h="100%" align="center">
      <Text fontWeight="bold" fontSize="14px" lineHeight="24px">
        {t(`pixFunnel:${stepText}`)}
      </Text>
      <PixSharedProgressBar
        value={value}
        w="800px"
        h="4px"
        progressColor="brandBlue.100"
        bg="#DDDDDD"
      />
      <Button
        fontWeight="bold"
        fontSize="14px"
        lineHeight="24px"
        bgColor="transparent"
        type="submit"
      >
        {t(`pixFunnel:topSubmitButton`)}
      </Button>
    </Flex>
  );
};

export default PixFunnelProgressView;
