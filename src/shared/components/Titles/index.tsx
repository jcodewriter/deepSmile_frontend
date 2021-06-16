import React from "react";
import { useStyleConfig, Box, forwardRef, TextProps } from "@chakra-ui/core";
import customTheme from "src/utils/theme";

const { textStyles } = customTheme;

const styleConfig = {
  sizes: {
    sm: {
      fontSize: "24px",
    },
    md: {
      fontSize: "30px",
    },
    lg: {
      fontSize: "40px",
    },
    xl: {
      fontSize: "50px",
    },
  },
  variants: { ...textStyles },
  defaultProps: {
    size: "xl",
    variant: "title",
  },
};

const BaseTitle = forwardRef((props, ref) => {
  const { size, variant, as, ...rest } = props;

  const styles = useStyleConfig("Heading", { size, variant, styleConfig });

  return <Box as={as} sx={styles} {...rest} ref={ref} />;
});

interface TitlesProps extends TextProps {
  children: React.ReactNode;
}

export const Title = ({ children }: TitlesProps) => <BaseTitle as="h1">{children}</BaseTitle>;

export const MidTitle = ({ children }: TitlesProps) => (
  <BaseTitle as="h2" size="lg" variant="midTitle">
    {children}
  </BaseTitle>
);

export const Quote = ({ children }: TitlesProps) => (
  <BaseTitle as="h2" size="md" variant="quote">
    {children}
  </BaseTitle>
);

export const SubTitle = ({ children, ...rest }: TitlesProps) => (
  <BaseTitle as="h3" size="sm" variant="subTitle" {...rest}>
    {children}
  </BaseTitle>
);

export const PixMidTitle = ({ children }: TitlesProps) => (
  <BaseTitle as="h2" size="sm" variant="midTitle">
    {children}
  </BaseTitle>
);
