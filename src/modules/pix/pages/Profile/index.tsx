import React from "react";
import PixProfileTItleView from "./components/Views/PixProfileTitleView";
import PixProfileInformationView from "./components/Views/PixProfileInformationView";
import { Box, VStack } from "@chakra-ui/core";
import PixProfileBlock from "./components/Blocks/PixProfileBlock";
import useTranslation from "next-translate/useTranslation";
import PixProfilePasswordView from "./components/Views/PixProfilePasswordView";
import PixProfileAddressView from "./components/Views/PixProfileAddressView";
import PixProfileModalModifyInfoView from "./ProfileModals/components/Views/ProfileModalInfo/PixProfileModalModifyInfoView";
import PixProfileModalModifyPasswordView from "./ProfileModals/components/Views/ProfileModalPassword/PixProfileModalModifyPasswordView";
import PixProfileModalModifyAddressView from "./ProfileModals/components/Views/ProfileModalAddress/PixProfileModalModifyAddressView";
import PixProfileModalAddAddressView from "./ProfileModals/components/Views/ProfileModalAddress/PixProfileModalAddAddressView";
import PixSharedSidebarLayout from "src/modules/pix/shared/components/Layouts/PixSharedSidebarLayout";
import { useRouter } from "next/router";
import PixLanguage from "../Language";
import PixSubscription from "../Subscription";
import PixPayment from "../Payment";

const PixProfile = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const profileStageQuery = router.query.stage || "home";

  if (profileStageQuery === "home") {
    return (
      <PixSharedSidebarLayout isProfile>
        <Box paddingLeft="84px" bg="brandGrey.100" h="100%">
          <PixProfileTItleView />
          <VStack align="flex-start" paddingTop="40px" paddingBottom="24px">
            <PixProfileBlock
              title={t("profile:profileInformationTitle")}
              modal={
                <PixProfileModalModifyInfoView
                  width="710px"
                  height="460px"
                  closeModal={() => {
                    return;
                  }}
                />
              }
            >
              <PixProfileInformationView />
            </PixProfileBlock>
            <PixProfileBlock
              hasRightButton={false}
              title={t("profile:profilePasswordTitle")}
              modal={<></>}
            >
              <PixProfilePasswordView
                modal={
                  <PixProfileModalModifyPasswordView
                    width="710px"
                    height="377px"
                    closeModal={() => {
                      return;
                    }}
                  />
                }
              />
            </PixProfileBlock>
            <PixProfileBlock
              title={t("profile:profileAddressTitle")}
              modal={
                <PixProfileModalModifyAddressView
                  width="710px"
                  height="470px"
                  closeModal={() => {
                    return;
                  }}
                />
              }
            >
              <PixProfileAddressView
                modal={
                  <PixProfileModalAddAddressView
                    width="710px"
                    height="470px"
                    closeModal={() => {
                      return;
                    }}
                  />
                }
              />
            </PixProfileBlock>
          </VStack>
        </Box>
      </PixSharedSidebarLayout>
    );
  }

  return (
    <>
      {profileStageQuery === "language" && <PixLanguage />}
      {profileStageQuery === "subscription" && <PixSubscription />}
      {profileStageQuery === "payment" && <PixPayment />}
    </>
  );
};

export default PixProfile;
