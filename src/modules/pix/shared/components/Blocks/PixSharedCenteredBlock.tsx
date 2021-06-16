import React from "react";
import { Box } from "@chakra-ui/core";

const PixSharedCenteredBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      padding="40px"
      backgroundColor="brandGrey.100"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      borderRadius="8px"
      width="440px"
    >
      {children}
    </Box>
  );
};

export default PixSharedCenteredBlock;
