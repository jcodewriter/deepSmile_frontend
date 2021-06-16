import React from "react";
import { Heading, Flex } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { SharedGradientButton } from "src/shared/components/Button/SharedGradientButton";

const PixInvoicesTitleView = ({ onOpenModal }: { onOpenModal: () => void }) => {
  const { t } = useTranslation();
  return (
    <Flex justify="space-between">
      <Heading
        color="#212B36"
        fontFamily="Montserrat"
        fontStyle="normal"
        fontWeight="bold"
        fontSize="40px"
      >
        {t("pixInvoices:invoicesTitle")}
      </Heading>
      <SharedGradientButton as="button" onClick={onOpenModal} variant="webApp">
        {t("pixInvoices:invoicesDownloadButton")}
      </SharedGradientButton>
    </Flex>
  );
};

export default PixInvoicesTitleView;
