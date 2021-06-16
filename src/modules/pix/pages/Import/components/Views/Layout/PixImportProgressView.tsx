import React, { useMemo, useState } from "react";
import { HStack, VStack, Text, Flex, Skeleton } from "@chakra-ui/core";
import { PIX_HOME_ROUTE, pushNext } from "src/utils/constants/routes";
import useTranslation from "next-translate/useTranslation";
import { useAuthState } from "src/shared/contexts/AuthContext";
import { formatDate } from "src/utils/helpers/DateHelper";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";
import PixSharedProgressBlock from "src/modules/pix/shared/components/Blocks/PixSharedProgressBlock";
import PixImportDialog from "../../Control/PixImportDialog";

import { usePixPhotoProcessorState } from "../../../shared/contexts/PixImportContext";
import { PhotoProcessorStep } from "../../../shared/types/PhotoProcessorContext";
import PixSharedProgressBar from "src/modules/pix/shared/components/Controls/PixSharedProgressBar";

const UpgradePlanButton = () => {
  const { t, lang } = useTranslation();
  const { jobState, step } = usePixPhotoProcessorState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const goToSubscriptionPage = () => {
    pushNext(`${PIX_HOME_ROUTE}?page=profile&stage=subscription`, undefined, { lang });
  };

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const onConfirmDialog = () => {
    onCloseDialog();
    goToSubscriptionPage();
  };

  return (
    <>
      <SharedGradientButton
        variant="white"
        onClick={() => {
          if (step !== PhotoProcessorStep.WAITING_FOR_FILES && !jobState.downloadCounter) {
            setIsDialogOpen(true);
          } else {
            goToSubscriptionPage();
          }
        }}
      >
        {t("pixProfilePhotoBar:photoBarUpgrade")}
      </SharedGradientButton>
      <PixImportDialog isOpen={isDialogOpen} onClose={onCloseDialog} onConfirm={onConfirmDialog} />
    </>
  );
};

const PixImportProgressView = () => {
  const { t, lang } = useTranslation();
  const { profile } = useAuthState();

  const planProgress = useMemo(() => {
    if (profile?.planInfos?.numberOfPhotosUsed && profile?.planInfos?.numberOfPhotosInPlan) {
      return Math.round(
        (profile.planInfos.numberOfPhotosUsed / profile.planInfos.numberOfPhotosInPlan) * 100
      );
    } else {
      return 0;
    }
  }, [profile?.planInfos?.numberOfPhotosUsed, profile?.planInfos?.numberOfPhotosInPlan]);

  if (profile?.planInfos === undefined) {
    return <Skeleton height="60px" />;
  }

  return (
    <PixSharedProgressBlock>
      <VStack align="flex-start" spacing="10px" bg="#FFFFFF" paddingX="32px">
        <Flex borderRadius="4px" align="center" w="100%" h="68px" justify="space-between">
          <HStack spacing="16px">
            <Text fontWeight="bold" fontSize="14px" lineHeight="24px">
              {t("pixProfilePhotoBar:photoBarText")}
            </Text>
            <Text fontWeight="500" fontSize="14px" lineHeight="24px">
              {profile?.planInfos?.numberOfPhotosUsed}
              {profile?.planInfos?.numberOfPhotosInPlan !== -1 &&
                "/" + profile?.planInfos?.numberOfPhotosInPlan}
            </Text>
            {profile?.planInfos?.numberOfPhotosInPlan !== -1 && (
              <PixSharedProgressBar
                h="4px"
                w="320px"
                value={planProgress}
                progressColor="brandBlue.100"
                bg="#DDDDDD"
                borderRadius="8px"
              />
            )}
            {profile?.planInfos?.numberOfPhotosInPlan !== -1 && (
              <Text fontWeight="500" fontSize="14px" lineHeight="24px">
                {planProgress}%
              </Text>
            )}
          </HStack>
          <HStack spacing="40px" align="center">
            <Text fontWeight="500" fontSize="14px" lineHeight="24px">
              {t("pixProfilePhotoBar:photoBarRenewal")}{" "}
              {formatDate(lang, profile?.planInfos?.nextBilling)}
            </Text>{" "}
            {profile?.planInfos?.numberOfPhotosInPlan !== -1 && <UpgradePlanButton />}
          </HStack>
        </Flex>
        {planProgress >= 100 && (
          <Text pb="10px" fontWeight="bold" color="red.500">
            {t("pixProfilePhotoBar:photoBarNoPhotoLeft")}
          </Text>
        )}
      </VStack>
    </PixSharedProgressBlock>
  );
};

export default PixImportProgressView;
