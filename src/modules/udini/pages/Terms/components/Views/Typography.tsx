import React, { ReactNode } from "react";
import { Link, Heading, Text } from "@chakra-ui/core";
import { OnlyChildren } from "src/modules/pix/shared/types/common";

interface TitleLinkProps {
  href: string;
  text: string;
}

export const UdiniTermsTitleLink = ({ href, text }: TitleLinkProps) => (
  <Link href={`#${href}`}>{text}</Link>
);

export const UdiniTermsSubTitleLink = ({ href, text }: TitleLinkProps) => (
  <Link paddingLeft="20px" href={`#${href}`}>
    {text}
  </Link>
);

export const UdiniTermsH2 = ({ id, children }: { id: string; children: ReactNode }) => {
  return (
    <Heading as="h2" id={id} fontWeight="bold" fontSize={{ base: "24", sm: "34px" }}>
      {children}
    </Heading>
  );
};

export const UdiniTermsH3 = ({ id, children }: { id: string; children: ReactNode }) => {
  return (
    <Heading
      as="h3"
      id={id}
      fontWeight="bold"
      fontSize={{ base: "18px", sm: "22px" }}
      lineHeight="136%"
    >
      {children}
    </Heading>
  );
};

export const UdiniTermsH4 = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as="h4" fontWeight="600" fontSize={{ base: "18px", sm: "22px" }} lineHeight="136%">
      {children}
    </Heading>
  );
};

export const UdiniTermsH5 = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as="h4" fontWeight="600" fontSize="17px" lineHeight="141%">
      {children}
    </Heading>
  );
};

export const UdiniTermsText = ({ children }: OnlyChildren) => {
  return (
    <Text fontWeight="600" fontSize="14px" marginY="20px">
      {children}
    </Text>
  );
};
