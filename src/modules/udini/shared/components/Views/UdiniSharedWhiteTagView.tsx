import React from "react";
import { BoxProps, Box } from "@chakra-ui/core";
import { Menu } from "./UdiniSharedTextsView";

//TODO: Remove and make Tag customizable
interface TagProps extends BoxProps {
  children: React.ReactNode;
}
const WhiteTag = ({ children, ...rest }: TagProps) => (
  <Box
    backgroundColor="white"
    px="16px"
    py="8px"
    height="fit-content"
    maxWidth="fit-content"
    {...rest}
  >
    <Menu color="brandPink.100" whiteSpace="nowrap">
      {children}
    </Menu>
  </Box>
);
export default WhiteTag;
