import React, { FC, useEffect, useContext } from "react";
import { Flex, Box } from "@chakra-ui/core";
import UdiniSharedHeaderView from "src/modules/udini/shared/components/Views/Header/UdiniSharedHeaderView";
import UdiniSharedFooterView from "src/modules/udini/shared/components/Views/Footer/UdiniSharedFooterView";
import UdiniSharedCommunitySectionView from "../components/Views/UdiniSharedCommunitySectionView";

import { SmoothScrollContext } from "src/shared/contexts/SmoothScrollContext";
import useResizeObserver from "use-resize-observer";

const withUdiniSharedPageLayout = (
  Component: FC,
  hasSharedCommunity = true,
  CommunitySection = UdiniSharedCommunitySectionView
) => {
  const Wrapper = () => {
    const { scroll } = useContext(SmoothScrollContext);
    const { ref, height } = useResizeObserver<HTMLDivElement>();

    useEffect(() => {
      if (scroll) {
        scroll.update();
      }
    }, [height]);

    return (
      <Flex ref={ref} data-scroll-section direction="column" overflowX="hidden">
        <UdiniSharedHeaderView />
        <Box as="main">
          <Component />
          {hasSharedCommunity && <CommunitySection />}
        </Box>
        <UdiniSharedFooterView />
      </Flex>
    );
  };

  return Wrapper;
};

export default withUdiniSharedPageLayout;
