import React from "react";
import { useStyleConfig, Box, TextProps, forwardRef } from "@chakra-ui/core";
import customTheme from "src/utils/theme";

const { textStyles } = customTheme;

const styleConfig = {
  sizes: {
    sm: {
      fontSize: "12px",
    },
    md: {
      fontSize: "14px",
    },
    lg: {
      fontSize: "16px",
    },
    xl: {
      fontSize: "20px",
    },
  },
  variants: { ...textStyles },
  defaultProps: {
    size: "lg",
    variant: "text",
  },
};

const BaseText = forwardRef((props, ref) => {
  const { size, variant, ...rest } = props;

  const styles = useStyleConfig("Text", { size, variant, styleConfig });

  return <Box sx={styles} {...rest} as="p" ref={ref} />;
});

export const ButtonText = ({ children }: TextProps) => (
  <BaseText variant="button">{children}</BaseText>
);

export const MenuText = ({ children, ...rest }: TextProps) => (
  <BaseText variant="menu" {...rest}>
    {children}
  </BaseText>
);

export const Text = ({ children, ...rest }: TextProps) => <BaseText {...rest}>{children}</BaseText>;

export const CopyText = ({ children, ...rest }: TextProps) => (
  <BaseText size="lg" variant="copyText" {...rest}>
    {children}
  </BaseText>
);

export const AsteriskText = ({ children, ...rest }: TextProps) => (
  <BaseText size="sm" variant="asteriskText" {...rest}>
    {children}
  </BaseText>
);

export const TinyText = ({ children, ...rest }: TextProps) => (
  <BaseText size="sm" variant="tinyInfo" {...rest}>
    {children}
  </BaseText>
);

export const UnderlinedText = ({ children, ...rest }: TextProps) => (
  <BaseText size="md" variant="underlined" {...rest}>
    {children}
  </BaseText>
);

export const Tag = ({ children, color }: TextProps) => (
  <BaseText
    size="lg"
    variant="tag"
    background="transparent"
    textTransform="uppercase"
    color={color}
  >
    {children}
  </BaseText>
);

export const FooterText = ({ children, ...rest }: TextProps) => (
  <BaseText size="md" variant="footer" {...rest}>
    {children}
  </BaseText>
);

export const FooterTextBold = ({ children, ...rest }: TextProps) => (
  <BaseText size="md" variant="footerBold" {...rest}>
    {children}
  </BaseText>
);

export const CardText = ({ children, ...rest }: TextProps) => (
  <BaseText size="xl" variant="cardText" {...rest}>
    {children}
  </BaseText>
);
