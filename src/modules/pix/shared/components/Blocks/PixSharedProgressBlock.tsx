import React from "react";
import { Box } from "@chakra-ui/core";
import { OnlyChildren } from "src/modules/pix/shared/types/common";

const PixSharedProgressBlock = ({ children }: OnlyChildren) => {
  return (
    <Box background="#F6F6F6" /* paddingX="24px" */ borderRadius="4px" h="68px">
      {children}
    </Box>
  );
};

export default PixSharedProgressBlock;
