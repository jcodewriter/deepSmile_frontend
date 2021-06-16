import React from "react";
import { Flex, Box, FlexProps, BoxProps } from "@chakra-ui/core";

interface MainBoxProps extends FlexProps {
  children: React.ReactNode;
  boxStyle?: BoxProps;
}
const MainBox = ({ children, boxStyle, ...rest }: MainBoxProps) => (
  <Flex as="section" direction="column" justify="center" align="center" {...rest}>
    <Box
      paddingX={{ base: "25px", sm: "35px", md: "0px" }}
      width={{ base: "100vw", md: "80vw", lg: "70vw" }}
      {...boxStyle}
    >
      {children}
    </Box>
  </Flex>
);
export default MainBox;
