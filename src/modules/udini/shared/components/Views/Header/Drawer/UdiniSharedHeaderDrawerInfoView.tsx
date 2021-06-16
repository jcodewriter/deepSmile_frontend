import React from "react";
import { Wrap } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { Info } from "../../UdiniSharedTextsView";

const UdiniSharedHeaderDrawerInfoView = () => {
  const { t } = useTranslation();

  return (
    <Wrap paddingX="30px" marginBottom="70px" direction="row" justify="space-evenly">
      {[t("udiniHeader:udiniContact"), t("udiniHeader:udiniPhoneNumber")].map((infoText) => (
        <Info key={infoText}>{infoText}</Info>
      ))}
    </Wrap>
  );
};

export default UdiniSharedHeaderDrawerInfoView;
