import React from "react";
import { Text, TextProps } from "@chakra-ui/core";
import useTranslation from "next-translate/useTranslation";
import { isString } from "util";

interface TitlesProps extends TextProps {
  children: React.ReactNode;
  nextTranslate?: boolean;
  hideAuto?: boolean;
}

export const BaseText = ({
  children,
  nextTranslate = false,
  hideAuto = false,
  ...rest
}: TitlesProps) => {
  const { t } = useTranslation();
  if (nextTranslate === true && isString(children)) {
    if (children === t(children) && hideAuto === true) {
      return null;
    } else {
      return (
        <Text {...rest} fontFamily="Montserrat">
          {t(children)}
        </Text>
      );
    }
  } else {
    return (
      <Text {...rest} fontFamily="Montserrat">
        {children}
      </Text>
    );
  }
};

export const BigTitle = (props: TitlesProps) => (
  <BaseText
    {...props}
    fontSize={{ base: "40px", md: "50px" }}
    lineHeight={{ base: "44px", md: "61px" }}
    fontWeight="bold"
  />
);
export const MidTitle = (props: TitlesProps) => (
  <BaseText {...props} fontSize="40px" lineHeight="49px" fontWeight="bold" />
);
export const Quote = (props: TitlesProps) => (
  <BaseText {...props} fontSize="30px" lineHeight="36,57px" fontStyle="italic" />
);
export const Subtitle = (props: TitlesProps) => (
  <BaseText {...props} fontSize="24px" fontWeight="600" lineHeight="29px" />
);
export const FormTitle = (props: TitlesProps) => (
  <BaseText {...props} fontSize="20px" fontWeight="600" />
);
export const Menu = (props: TitlesProps) => (
  <BaseText {...props} fontSize="16px" fontWeight="600" lineHeight="20px" />
);
export const CopyText = (props: TitlesProps) => (
  <BaseText {...props} fontSize="16px" lineHeight="20px" fontWeight="500" />
);
export const Info = (props: TitlesProps) => (
  <BaseText {...props} fontSize="14px" fontWeight="bold" lineHeight="17px" />
);
export const BigNumberFull = (props: TitlesProps) => (
  <BaseText
    {...props}
    fontSize="110px"
    fontWeight="bold"
    lineHeight="120px"
    color="brandBlue.100"
  />
);
export const BigNumberBorder = (props: TitlesProps) => (
  <BaseText
    {...props}
    fontSize="110px"
    fontWeight="bold"
    color="transparent"
    lineHeight="120px"
    style={{ WebkitTextStroke: "2px #FFFFFF" }}
  />
);

export const NavLinkDrawer = (props: TextProps) => (
  <Text
    {...props}
    as="a"
    minHeight={{ base: "29px", sm: "43px" }}
    fontSize={{ base: "24px", sm: "35px" }}
    fontWeight="bold"
    color="black"
    lineHeight={{ base: "29px", sm: "43px" }}
    cursor="pointer"
    fontFamily="Montserrat"
    _active={{ color: "brandPink.100" }}
    _focus={{ color: "brandPink.100" }}
    _hover={{ color: "brandPink.100" }}
  />
);

export const NavCollapseDrawer = (props: TextProps) => (
  <Text
    {...props}
    fontFamily="Montserrat"
    minHeight={{ base: "29px", sm: "43px" }}
    fontSize={{ base: "24px", sm: "35px" }}
    fontWeight="bold"
    color="black"
    lineHeight={{ base: "29px", sm: "43px" }}
    cursor="pointer"
  />
);
