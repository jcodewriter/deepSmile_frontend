import React from "react";
import { BoxProps, Box } from "@chakra-ui/core";
import { Menu } from "./UdiniSharedTextsView";

interface TagProps extends BoxProps {
  children: React.ReactNode;
}
const Tag = ({ children, ...rest }: TagProps) => (
  <Box
    backgroundColor="#C8176F"
    px="16px"
    py="8px"
    height="fit-content"
    maxWidth="fit-content"
    fontSize="16px"
    lineHeight="20px"
    fontWeight="600"
    {...rest}
  >
    <Menu color="#FFFFFF" whiteSpace="nowrap">
      {children}
    </Menu>
  </Box>
);
export default Tag;
