import React, { ReactNode } from "react";
import {
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Accordion,
} from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";

const FaqItem = ({ question, children }: { question: string; children: ReactNode }) => {
  const { t } = useTranslation();

  return (
    <Accordion allowToggle>
      <AccordionItem background="#FFFFFF" borderRadius="10px">
        <AccordionButton minH="90px" padding="20px">
          <Box flex="1" textAlign="left" fontWeight="bold" fontSize="24px" lineHeight="29px">
            {t(`udiniFaq:${question}`)}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel paddingY="20px" fontSize="16px" lineHeight="20px">
          {children}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default FaqItem;
