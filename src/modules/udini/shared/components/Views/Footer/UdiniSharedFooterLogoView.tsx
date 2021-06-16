import React from "react";
import { Stack, Image, Grid } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { FooterTextBold, FooterText } from "src/shared/components/Text/Text";

const UdiniSharedFooterLogoView = () => {
  const { t } = useTranslation();

  return (
    <Grid
      rowGap={{ base: "25px", sm: "50px" }}
      marginRight={{ base: 0, sm: "6%" }}
      gridTemplateColumns={{ base: "repeat(auto-fit, minmax(150px, 1fr))", sm: "1fr" }}
      marginBottom={{ base: "50px", sm: 0 }}
    >
      <Image src="/svg/udiniDentalSuite.svg" alt="udini dental suite" h="44px" minW="94px" />
      <Stack direction="row" alignSelf={{ base: "flex-end", sm: "initial" }}>
        <FooterTextBold color="white">{t("udiniFooter:catchPhraseBold")}</FooterTextBold>
        <FooterText color="white">{t("udiniFooter:catchPhraseNormal")}</FooterText>
      </Stack>
    </Grid>
  );
};

export default UdiniSharedFooterLogoView;
