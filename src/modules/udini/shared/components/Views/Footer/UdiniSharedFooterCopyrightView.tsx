import React from "react";
import { Flex } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { TinyText } from "src/shared/components/Text/Text";

const UdiniSharedFooterCopyrightView = () => {
  const { t } = useTranslation();

  return (
    <Flex paddingTop="80px" flexGrow={1} align="flex-end">
      <TinyText color="white">{t("udiniFooter:copyright")}</TinyText>
    </Flex>
  );
};

export default UdiniSharedFooterCopyrightView;
