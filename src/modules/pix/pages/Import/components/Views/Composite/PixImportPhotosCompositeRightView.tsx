import React from "react";
import { Stack, Text } from "@chakra-ui/core";

import PixImportPhotosCompositeImageGridView from "src/modules/pix/pages/Import/components/Views/Composite/PixImportPhotosCompositeImageGridView";
import useTranslation from "next-translate/useTranslation";
import { PixMidTitle } from "src/shared/components/Titles";

const PixImportPhotosCompositeRightView = () => {
  const { t } = useTranslation();
  return (
    <Stack padding="32px 88px" spacing="32px">
      <Stack spacing="7px">
        <PixMidTitle>{t("pixImport:createTemplate")}</PixMidTitle>
        <Text fontWeight="500" fontSize="16px" lineHeight="32px">
          {t("pixImport:createTemplateSubtitle")}
        </Text>
      </Stack>
      <PixImportPhotosCompositeImageGridView />
    </Stack>
  );
};

export default PixImportPhotosCompositeRightView;
