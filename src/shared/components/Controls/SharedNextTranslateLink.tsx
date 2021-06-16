import React, { ReactNode } from "react";
import NextTranslateLink from "next-translate/Link";

import { LinkProps } from "next/link";
import useTranslation from "next-translate/useTranslation";

interface SharedNextTranslateLinkProps extends LinkProps {
  children: ReactNode;
}

const SharedNextTranslateLink = (props: SharedNextTranslateLinkProps) => {
  const { lang } = useTranslation();
  return <NextTranslateLink lang={lang} {...props} />;
};

export default SharedNextTranslateLink;
