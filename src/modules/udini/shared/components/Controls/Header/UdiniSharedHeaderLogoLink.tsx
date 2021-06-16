import React from "react";
import { Image } from "@chakra-ui/core";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { UDINI_HOME_ROUTE } from "src/utils/constants/routes";

const UdiniSharedHeaderLogoLink = () => {
  return (
    <SharedNextTranslateLink href={UDINI_HOME_ROUTE}>
      <Image
        src="/img/home/udini_logo_white_background.png"
        fallbackSrc="/svg/home/udiniLogoWhiteBackground.svg"
        placeholder="Udini Dental Suite"
        alt="Udini dental suite"
        cursor="pointer"
        fit="contain"
        width="130px"
      />
    </SharedNextTranslateLink>
  );
};

export default UdiniSharedHeaderLogoLink;
