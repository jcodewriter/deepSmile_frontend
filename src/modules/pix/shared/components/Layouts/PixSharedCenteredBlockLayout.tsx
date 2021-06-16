import React, { ReactNode } from "react";
import { Stack, Image } from "@chakra-ui/core";
import PixSharedCenteredBlock from "src/modules/pix/shared/components/Blocks/PixSharedCenteredBlock";
import PixSharedCenteredBlockLink from "src/modules/pix/shared/components/Controls/PixSharedCenteredBlockLink";

const PixSharedCenteredBlockLayout = ({
  children,
  isDone = false,
}: {
  children: ReactNode;
  isDone?: boolean;
}) => {
  return (
    <Stack
      spacing="40px"
      minHeight="100vh"
      align="center"
      justify="center"
      backgroundColor="brandBlue.100"
    >
      <Image src="/svg/PixSmall.svg" />
      <PixSharedCenteredBlock>{children}</PixSharedCenteredBlock>
      {!isDone && <PixSharedCenteredBlockLink />}
    </Stack>
  );
};

export default PixSharedCenteredBlockLayout;
