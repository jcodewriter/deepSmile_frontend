import React from "react";
import { useStyleConfig, Box, HeadingProps } from "@chakra-ui/core";

const styleConfig = {
  baseStyle: {
    color: "#222",
  },
  sizes: {
    small: {
      fontSize: "20px",
      lineHeight: "24px",
    },
    normal: {
      fontSize: "24px",
      lineHeight: "29px",
    },
    medium: {
      fontSize: "28px",
      lineHeight: "32px",
    },
    large: {
      fontSize: "32px",
      lineHeight: "38px",
    },
  },
  variants: {
    normal: { fontWeight: "normal" },
    semi: { fontWeight: "600" },
    bold: { fontWeight: "bold" },
  },
  defaultProps: {
    size: "normal",
    variant: "normal",
  },
};

const PixSharedHeading = (props: HeadingProps) => {
  const { size, variant, ...rest } = props;

  const styles = useStyleConfig("Heading", {
    size,
    variant,
    styleConfig,
  });

  return <Box as="h1" sx={styles} {...rest} />;
};

export default PixSharedHeading;
