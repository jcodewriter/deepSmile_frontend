import React from "react";
import { Button, ButtonProps, Flex, useStyleConfig } from "@chakra-ui/core";
import { LinkProps } from "next/link";
import SharedNextTranslateLink from "src/shared/components/Controls/SharedNextTranslateLink";
import { ButtonText } from "src/shared/components/Text/Text";
import customTheme from "src/utils/theme";

interface SharedButtonLinkProps extends ButtonProps {
  href: LinkProps["href"];
  asPath?: LinkProps["as"];
  shallow?: LinkProps["shallow"];
}

const {
  colors: { brandBlue, brandPink },
} = customTheme;

const gradient = `linear-gradient(to right, ${brandPink["100"]}, ${brandBlue["100"]});`;
const minWidth = "241px";
const height = "46px";
const radius = "25px";
const borderWidth = "2px";
const maxWidth = "100%";

const SharedGradientButtonLink = ({
  children,
  href,
  asPath,
  shallow,
  ...buttonProps
}: SharedButtonLinkProps) => {
  return (
    <SharedNextTranslateLink href={href} as={asPath} shallow={shallow}>
      <SharedGradientButton {...buttonProps}>{children}</SharedGradientButton>
    </SharedNextTranslateLink>
  );
};

export const SharedGradientSubmitButton = ({ children, ...buttonProps }: ButtonProps) => {
  const { size, variant, color, background } = buttonProps;

  const styleConfig = {
    baseStyle: {
      borderRadius: radius,
      minWidth: buttonProps.minWidth,
      h: buttonProps.height,
    },
    variants: {
      fill: {
        bg: "transparent",
        color: "white",
        _hover: {
          color: color,
          bg: background,
        },
      },
      white: {
        bg: "white",
        color: "brandGrey.900",
        _hover: {
          bg: "linear-gradient(to right, #C71971, #2BD1FD)",
          color: "white",
        },
      },
      white_bg: {
        bg: "linear-gradient(to right, #C71971, #2BD1FD)",
        color: "white",
        _hover: {
          bg: "white",
          color: "brandGrey.900",
        },
      },
    },
  };

  const styles = useStyleConfig("Button", { size, variant, styleConfig });
  return (
    <Flex width="fit-content" borderRadius="74px" bg={gradient} padding={borderWidth}>
      <Button sx={styles} {...buttonProps} borderRadius="74px">
        <ButtonText>{children}</ButtonText>
      </Button>
    </Flex>
  );
};

export const SharedGradientButton = ({ children, ...buttonProps }: ButtonProps) => {
  const { size, variant, color, background } = buttonProps;

  const styleConfig = {
    baseStyle: {
      borderRadius: radius,
      minW: minWidth,
      maxW: maxWidth,
      h: height,
      paddingX: "30px",
    },
    variants: {
      fill: {
        bg: "transparent",
        color: "white",
        _hover: {
          color: color,
          bg: background,
        },
      },
      white: {
        bg: "white",
        color: "brandGrey.900",
        _hover: {
          bg: "linear-gradient(to right, #C71971, #2BD1FD)",
          color: "white",
        },
      },
      webApp: {
        bg: "brandGrey.100",
        color: "brandGrey.900",
        _hover: {
          bg: "linear-gradient(to right, #C71971, #2BD1FD)",
          color: "white",
        },
      },
      black: {
        bg: "brandGrey.900",
        color: "white",
        _hover: {
          bg: "linear-gradient(to right, #C71971, #2BD1FD)",
        },
      },
      form: {
        bg: "linear-gradient(to right, #C71971, #2BD1FD)",
        color: "white",
        _hover: {
          bg: "#F6F9FB",
          color: "brandGrey.900",
        },
      },
      white_bg: {
        bg: "linear-gradient(to right, #C71971, #2BD1FD)",
        color: "white",
        _hover: {
          bg: "white",
          color: "brandGrey.900",
        },
      },
    },
    defaultProps: {
      variant: "fill",
    },
  };

  const styles = useStyleConfig("Button", { size, variant, styleConfig });

  return (
    <Flex
      width="fit-content"
      borderRadius={radius}
      bg={gradient}
      minW={minWidth}
      maxW={maxWidth}
      padding={borderWidth}
    >
      <Button sx={styles} {...buttonProps}>
        <ButtonText>{children}</ButtonText>
      </Button>
    </Flex>
  );
};

export default SharedGradientButtonLink;
