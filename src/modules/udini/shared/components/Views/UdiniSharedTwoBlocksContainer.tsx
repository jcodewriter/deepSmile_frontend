import React, { ReactNode } from "react";
import { Stack, StackProps } from "@chakra-ui/core";
import MainBox from "src/modules/udini/shared/components/Views/UdiniSharedMainBoxView";

interface UdiniSharedTwoBlocksContainerProps extends StackProps {
  sectionBg: string;
  children: ReactNode;
}

const UdiniSharedTwoBlocksContainer = ({
  sectionBg,
  children,
  align = "center",
  ...rest
}: UdiniSharedTwoBlocksContainerProps) => {
  return (
    <MainBox bg={sectionBg}>
      <Stack
        direction={{ base: "column", sm: "row" }}
        justify={{ base: "center", sm: "space-between" }}
        align={align}
        {...rest}
      >
        {children}
      </Stack>
    </MainBox>
  );
};

export default UdiniSharedTwoBlocksContainer;
