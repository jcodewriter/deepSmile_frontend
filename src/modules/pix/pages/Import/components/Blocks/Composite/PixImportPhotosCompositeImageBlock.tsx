import React from "react";
import { Box } from "@chakra-ui/core";
import { OnlyChildren } from "src/modules/pix/shared/types/common";

const PixImportPhotosCompositeImageBlock = ({ children }: OnlyChildren) => {
  return (
    <Box
      h="215.75px"
      width="287px"
      //border="1px solid #DEDEDE"
      //borderRadius="8px"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
      borderRadius="5px"
      cursor="url(/svg/cursorLittlePointer.svg), auto"
      _hover={{
        background: "#F6F6F6",
        border: "1px solid #DEDEDE",
        fontWeight: "bold",
      }}
    >
      {children}
    </Box>
  );
};

export default PixImportPhotosCompositeImageBlock;
