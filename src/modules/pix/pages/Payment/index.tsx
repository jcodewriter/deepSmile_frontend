import React from "react";
import PixSharedSidebarLayout from "src/modules/pix/shared/components/Layouts/PixSharedSidebarLayout";
import PixProfileBlock from "src/modules/pix/pages/Profile/components/Blocks/PixProfileBlock";

import PixSharedBodyLayout from "src/modules/pix/shared/components/Layouts/PixSharedBodyLayout";
import PixCreditCardView from "src/modules/pix/pages/Payment/components/Views/PixCreditCardView";

import PixNewCreditCardModal from "src/modules/pix/pages/Payment/components/Views/PixNewCreditCardModal";
import useTranslation from "next-translate/useTranslation";
import PixSharedPageTileView from "../../shared/components/Views/PixSharedPageTileView";
import { Box } from "@chakra-ui/core";

const PixPayment = () => {
  const { t } = useTranslation();
  return (
    <PixSharedSidebarLayout isProfile>
      <PixSharedBodyLayout>
        <PixSharedPageTileView pageTitle={t("pixPayment:paymentTitle")} />
        <Box mt="60px">
          <PixProfileBlock
            title={t("pixPayment:paymentRegisteredCard")}
            modal={
              <PixNewCreditCardModal
                width="710px"
                height="500px"
                closeModal={() => {
                  return;
                }}
              />
            }
          >
            <PixCreditCardView />
          </PixProfileBlock>
        </Box>
      </PixSharedBodyLayout>
    </PixSharedSidebarLayout>
  );
};

export default PixPayment;
