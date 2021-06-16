import React from "react";
import { Box } from "@chakra-ui/core";
import { MenuText } from "src/shared/components/Text/Text";
import Router from "next-translate/Router";

interface UdiniSharedHeaderTextLinkProps {
  isActive?: boolean;
  href: string;
  children: React.ReactNode;
  callback?: () => void;
  color?: string;
}

const UdiniSharedHeaderTextLink = ({
  isActive,
  children,
  href,
  callback,
  color,
}: UdiniSharedHeaderTextLinkProps) => {
  return (
    <Box
      onClick={() => {
        Router.pushI18n(href);
        callback && callback();
      }}
    >
      <MenuText cursor="pointer" color={isActive ? "brandPink.100" : color} textAlign="center">
        {children}
      </MenuText>
    </Box>
  );
};

export default UdiniSharedHeaderTextLink;
