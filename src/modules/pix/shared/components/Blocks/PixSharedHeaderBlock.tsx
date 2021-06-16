import React from "react";
import { Box } from "@chakra-ui/core";
import { OnlyChildren } from "src/modules/pix/shared/types/common";

const PixSharedHeaderBlock = ({ children }: OnlyChildren) => {
  return (
    <Box as="header" bg="brandBlue.100" paddingX="30px" h="80px">
      {children}
    </Box>
  );
};

export default PixSharedHeaderBlock;
