import React from "react";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { Link as ChakraLink } from "@chakra-ui/core";

interface UdiniSharedUnderlineLinkProps {
  children: React.ReactNode;
  href: string;
}

const UdiniSharedUnerlineLink = ({ children, href }: UdiniSharedUnderlineLinkProps) => {
  return (
    <SharedNextTranslateLink href={href}>
      <ChakraLink cursor="pointer" textDecoration="underline" lineHeight="18px" fontSize="15px">
        {children}
      </ChakraLink>
    </SharedNextTranslateLink>
  );
};

export default UdiniSharedUnerlineLink;
