import React from "react";
import { Box } from "@chakra-ui/layout";

const PixSharedBodyLayout = ({ children }: { children: React.ReactNode }) => (
  <Box bg="brandGrey.100" p="70px 80px" h="100%">
    {children}
  </Box>
);

export default PixSharedBodyLayout;
