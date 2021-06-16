import React, { forwardRef } from "react";
import { useStyleConfig, ButtonProps, Button } from "@chakra-ui/core";

const styleConfig = {
  baseStyle: {
    fontWeight: "500",
    borderRadius: "4px",
    fontSize: "16px",
    lineHeight: "20px",
  },
  sizes: {
    small: {
      padding: "8px 12px",
    },
    large: {
      padding: "10px 24px",
    },
  },
  variants: {
    dark: {
      bg: "#222",
      color: "#FFF",
    },
    light: {
      color: "#222",
      bg: "#FFF",
      border: "1px solid #222",
    },
    transparent: {
      bg: "transparent",
    },
    grey: {
      bg: "#222",
      color: "#FFF",
      opacity: 0.5,
    },
  },
  defaultProps: {
    size: "small",
    variant: "dark",
  },
};

const PixSharedButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { size, variant, ...rest } = props;

  const styles = useStyleConfig("Button", {
    size,
    variant,
    styleConfig,
  });

  return <Button sx={styles} ref={ref} {...rest} />;
});

export default PixSharedButton;
