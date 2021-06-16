import { Stack } from "@chakra-ui/core";
import React from "react";
import { OnlyChildren } from "src/modules/pix/shared/types/common";

const UdiniFormLeftLayout = ({ children }: OnlyChildren) => {
  return (
    <Stack
      spacing={{ base: "20px", md: "40px" }}
      justify={{ base: "center", md: "flex-start" }}
      align={{ base: "center", md: "flex-start" }}
      paddingLeft={{ base: "15px", md: "10%" }}
      paddingRight={{ base: "15px", md: "5%" }}
      paddingY="120px"
    >
      {children}
    </Stack>
  );
};

export default UdiniFormLeftLayout;
