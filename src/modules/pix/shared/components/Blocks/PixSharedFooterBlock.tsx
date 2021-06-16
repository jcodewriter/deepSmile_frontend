import React from "react";
import { Box } from "@chakra-ui/core";
import { OnlyChildren } from "src/modules/pix/shared/types/common";

const PixSharedFooterBlock = ({ children }: OnlyChildren) => {
  return (
    <Box
      paddingX="30px"
      h="116px"
      background="#FFFFFF"
      boxShadow="0px -8px 40px rgba(0, 0, 0, 0.1), inset 0px 1px 0px #E3E3E3"
      w="100%"
    >
      {children}
    </Box>
  );
};

export default PixSharedFooterBlock;
