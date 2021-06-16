import React, { useEffect, useMemo, useState } from "react";
import {
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
  VStack,
  Box,
} from "@chakra-ui/core";
import { Plan, SubscriptionPlanProductEnum, SubscriptionPlanStateEnum } from "types/User";
import useTranslation from "next-translate/useTranslation";
import { useQuery } from "@apollo/client";
import { PLANS2 } from "src/graphql/Queries/Plan";
import { Plans2Payload } from "types/Queries/Plan";
import { useSentry } from "src/services/Sentry";
import customTheme from "src/utils/theme";
import { CopyText } from "src/shared/components/Text/Text";
import { Menu, Subtitle } from "src/modules/udini/shared/components/Views/UdiniSharedTextsView";
import PixChangePlanModal from "src/modules/pix/pages/Subscription/components/Views/PixChangePlanModal";
import { useAuthState, useAuthDispatch } from "src/shared/contexts/AuthContext";
import { formatDate } from "src/utils/helpers/DateHelper";
import SubscriptionPlanView from "./SubscriptionPlanView";

const gradients = [
  [customTheme.colors.brandBlue["100"], customTheme.colors.brandBlue["200"]],
  [customTheme.colors.brandPink["100"], customTheme.colors.brandPink["300"]],
  [customTheme.colors.brandBlue["900"], customTheme.colors.brandPink["900"]],
];

const getRemainingPhotoCredit = (photosInPlan: number, photosUsed: number) => {
  return photosInPlan - photosUsed < 0 ? "0" : (photosInPlan - photosUsed).toString();
};

const getGradientFromPlan = (currentPlan: SubscriptionPlanProductEnum) => {
  switch (currentPlan) {
    case SubscriptionPlanProductEnum.FREE:
      return gradients[0];
    case SubscriptionPlanProductEnum.BASIC:
      return gradients[1];
    case SubscriptionPlanProductEnum.UNLIMITED:
      return gradients[2];
    default:
      return gradients[0];
  }
};

/**
 * This component is kinda useless now that any current plan shows every other plans.
 * Might want to remove it and use a filter instead.
 */
const PlansFromCurrentPlan = ({
  currentPlan,
  priceFormatter,
  plans,
  setChosenPlan,
}: {
  currentPlan: SubscriptionPlanProductEnum;
  priceFormatter: Intl.NumberFormat | undefined;
  plans: Plan[];
  setChosenPlan: React.Dispatch<React.SetStateAction<SubscriptionPlanProductEnum>>;
}) => {
  switch (currentPlan) {
    case SubscriptionPlanProductEnum.FREE:
      return (
        <>
          <Box as="button" onClick={() => setChosenPlan(SubscriptionPlanProductEnum.BASIC)}>
            <SubscriptionPlanView
              plan={plans.find((plan) => plan.plan === SubscriptionPlanProductEnum.BASIC)}
              gradient={gradients[1]}
              priceFormatter={priceFormatter}
            />
          </Box>
          <Box as="button" onClick={() => setChosenPlan(SubscriptionPlanProductEnum.UNLIMITED)}>
            <SubscriptionPlanView
              plan={plans.find((plan) => plan.plan === SubscriptionPlanProductEnum.UNLIMITED)}
              gradient={gradients[2]}
              priceFormatter={priceFormatter}
            />
          </Box>
        </>
      );
    case SubscriptionPlanProductEnum.BASIC:
      return (
        <>
          <Box as="button" onClick={() => setChosenPlan(SubscriptionPlanProductEnum.FREE)}>
            <SubscriptionPlanView
              plan={plans.find((plan) => plan.plan === SubscriptionPlanProductEnum.FREE)}
              gradient={gradients[0]}
              priceFormatter={priceFormatter}
            />
          </Box>
          <Box as="button" onClick={() => setChosenPlan(SubscriptionPlanProductEnum.UNLIMITED)}>
            <SubscriptionPlanView
              plan={plans.find((plan) => plan.plan === SubscriptionPlanProductEnum.UNLIMITED)}
              gradient={gradients[2]}
              priceFormatter={priceFormatter}
            />
          </Box>
        </>
      );
    case SubscriptionPlanProductEnum.UNLIMITED:
      return (
        <>
          <Box as="button" onClick={() => setChosenPlan(SubscriptionPlanProductEnum.FREE)}>
            <SubscriptionPlanView
              plan={plans.find((plan) => plan.plan === SubscriptionPlanProductEnum.FREE)}
              gradient={gradients[0]}
              priceFormatter={priceFormatter}
            />
          </Box>
          <Box as="button" onClick={() => setChosenPlan(SubscriptionPlanProductEnum.BASIC)}>
            <SubscriptionPlanView
              plan={plans.find((plan) => plan.plan === SubscriptionPlanProductEnum.BASIC)}
              gradient={gradients[1]}
              priceFormatter={priceFormatter}
            />
          </Box>
        </>
      );
    case SubscriptionPlanProductEnum.NONE:
      return null;
  }
};

const PixChangePlanSelectedView = () => {
  const { profile } = useAuthState();
  const { t, lang } = useTranslation();
  const { getProfile } = useAuthDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: planData, loading: plansLoading } = useQuery<Plans2Payload>(PLANS2);
  const { log, sendError } = useSentry();
  const [chosenPlan, setChosenPlan] = useState(SubscriptionPlanProductEnum.NONE);
  const currentPlanObject = useMemo(
    () =>
      planData?.plans2?.plans?.find((plan) => {
        return plan.plan === profile?.planInfos?.plan2;
      }),
    [profile?.planInfos?.plan2, plansLoading]
  );

  useEffect(() => {
    if (chosenPlan === SubscriptionPlanProductEnum.NONE) return;
    if (profile?.planInfos?.plan2) {
      if (chosenPlan !== profile?.planInfos?.plan2) {
        if (profile.statePlan === SubscriptionPlanStateEnum.ACTIVE_WILL_DOWNGRADE) {
          toast({
            position: "top",
            title: "Information",
            description: t("pixSubscription:toastInformationActiveWillDowngrade"),
            status: "info",
            duration: 9000,
            isClosable: true,
          });
        } else {
          onOpen();
        }
      }
    }
  }, [chosenPlan, profile?.planInfos?.plan2]);

  const priceFormatter = useMemo(() => {
    try {
      return new Intl.NumberFormat(lang, {
        style: "currency",
        currency: planData?.plans2.currency,
        maximumSignificantDigits: 2,
      });
    } catch (e) {
      log(`Unknown locale or currency : ${lang} | ${planData?.plans2.currency}`, "error");
      sendError(e.message);
    }
  }, [planData?.plans2.currency]);

  if (plansLoading || currentPlanObject === undefined || !profile?.planInfos) {
    return <Spinner s="xl" />;
  }

  if (!currentPlanObject) {
    log(`User ${profile.id} doesnt have a plan.`, "error");
    return <CopyText>{t("pixSubscription:noPlanSelected")}</CopyText>;
  }

  return (
    <Box>
      <VStack paddingTop="70px" spacing="10px" align="flex-start">
        <SubscriptionPlanView
          plan={currentPlanObject}
          gradient={getGradientFromPlan(
            currentPlanObject?.plan ?? SubscriptionPlanProductEnum.FREE
          )}
          priceFormatter={priceFormatter}
        />
        <HStack spacing="35px" pb="90px">
          <CopyText>
            {t(`pixSubscription:renewalDate`, {
              date: formatDate(lang, profile.planInfos?.nextBilling) ?? "-",
            })}
          </CopyText>
          {profile.planInfos &&
            profile.planInfos.numberOfPhotosUsed !== undefined &&
            profile.planInfos.numberOfPhotosInPlan &&
            profile.planInfos.numberOfPhotosInPlan !== -1 && (
              <CopyText>
                {t(`pixSubscription:remainingPhoto`, {
                  count: getRemainingPhotoCredit(
                    profile.planInfos.numberOfPhotosInPlan,
                    profile.planInfos.numberOfPhotosUsed
                  ),
                })}
              </CopyText>
            )}
        </HStack>
      </VStack>
      <VStack spacing="10px" pb="40px" align="flex-start">
        <Subtitle>{t("pixSubscription:changePlan")}</Subtitle>
        <Menu>{t("pixSubscription:chooseBestPlan")}</Menu>
      </VStack>
      <VStack spacing="16px" align="flex-start">
        <PlansFromCurrentPlan
          currentPlan={profile.planInfos?.plan2 ?? SubscriptionPlanProductEnum.FREE}
          priceFormatter={priceFormatter}
          plans={planData?.plans2?.plans ?? []}
          setChosenPlan={setChosenPlan}
        />
      </VStack>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          getProfile();
          setChosenPlan(SubscriptionPlanProductEnum.NONE);
          onClose();
        }}
        isCentered
      >
        <ModalOverlay>
          <ModalContent maxWidth="710px">
            <ModalCloseButton />
            <PixChangePlanModal
              statePlan={profile?.statePlan ?? SubscriptionPlanStateEnum.NONE}
              closeModal={onClose}
              card={profile?.planInfos?.card ?? null}
              radioCardProps={{
                plan: planData?.plans2?.plans?.find((plan) => plan.plan === chosenPlan),
                gradient: getGradientFromPlan(chosenPlan),
                priceFormatter: priceFormatter,
              }}
            />
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};

export default PixChangePlanSelectedView;
