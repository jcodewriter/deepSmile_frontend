import React from "react";
import { Box, BoxProps } from "@chakra-ui/core";

interface PixSharedProgressBarProps extends BoxProps {
  value: number | undefined;
  progressColor: string;
}

const PixSharedProgressBar = ({ value, progressColor, ...boxProps }: PixSharedProgressBarProps) => {
  return (
    <Box {...boxProps}>
      <Box
        bg={progressColor}
        w={value ? `${Math.min(Math.abs(value), 100)}%` : "0%"}
        transition="300ms"
        h="100%"
        borderRadius={boxProps.borderRadius}
      />
    </Box>
  );
};

export default PixSharedProgressBar;
