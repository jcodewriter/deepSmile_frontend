import React from "react";
import { Stack, Link } from "@chakra-ui/core";
import { FooterTextBold } from "src/shared/components/Text/Text";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";

export type UdiniSharedFooterLinkType = {
  text: string;
  href: string;
  isExternal?: boolean;
};

interface UdiniSharedFooterLinkItemViewProps extends Object {
  title: string;
  links: Array<UdiniSharedFooterLinkType>;
}

const UdiniSharedFooterLinkItemView = (section: UdiniSharedFooterLinkItemViewProps) => {
  const styledText = (text: string) => (
    <FooterTextBold maxW="153px" cursor="pointer" opacity="50%" color="white">
      {text}
    </FooterTextBold>
  );

  return (
    <Stack mb={{ base: "25px", sm: 0 }}>
      <FooterTextBold color="white">{section.title}</FooterTextBold>
      {section.links.map((row) =>
        row.isExternal === undefined ? (
          <SharedNextTranslateLink key={row.text} href={row.href}>
            {styledText(row.text)}
          </SharedNextTranslateLink>
        ) : (
          <Link key={row.text} href={row.href} isExternal={row.isExternal}>
            {styledText(row.text)}
          </Link>
        )
      )}
    </Stack>
  );
};

export default UdiniSharedFooterLinkItemView;
