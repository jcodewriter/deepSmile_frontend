import React, { useContext } from "react";
import { Box, Flex, Stack } from "@chakra-ui/core";
import UdiniSharedFooterCopyrightView from "./UdiniSharedFooterCopyrightView";
import UdiniSharedFooterLogoView from "./UdiniSharedFooterLogoView";
import UdiniSharedFooterLinkListView from "./UdiniSharedFooterLinkListView";
import UdiniSharedFooterScrollView from "./UdiniSharedFooterScrollView";

import { SmoothScrollContext } from "src/shared/contexts/SmoothScrollContext";

const UdiniSharedFooterView = () => {
  const { scroll } = useContext(SmoothScrollContext);
  const ScrollToTop = (event: MouseEvent) => {
    event.preventDefault();
    scroll && scroll.scrollTo(0);
  };

  return (
    <Flex
      as="footer"
      bg="#000000"
      direction="row"
      justifyContent="center"
      align="center"
      paddingY="60px"
      width="100%"
    >
      <Box
        paddingX={{ base: "25px", sm: "35px", md: "0px" }}
        width={{ base: "100vw", md: "80vw", lg: "70vw" }}
      >
        <Stack
          justify={{ base: "flex-start", sm: "space-between" }}
          spacing={0}
          direction={{ base: "column", sm: "row" }}
        >
          <UdiniSharedFooterLogoView />
          <UdiniSharedFooterLinkListView />
        </Stack>
        <UdiniSharedFooterCopyrightView />
      </Box>
      <UdiniSharedFooterScrollView onClick={ScrollToTop} />
    </Flex>
  );
};

export default UdiniSharedFooterView;
