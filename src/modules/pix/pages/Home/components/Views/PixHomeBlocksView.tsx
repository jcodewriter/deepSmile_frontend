import React from "react";
import { Stack } from "@chakra-ui/core";
import PixHomeProgressBlock from "src/modules/pix/pages/Home/components/Blocks/PixHomeProgressBlock";
//import PixHomePostListBlock from "src/modules/pix/pages/Home/components/Blocks/PixHomePostListBlock";

const PixHomeBlocksView = () => {
  return (
    <Stack spacing="16px">
      <PixHomeProgressBlock />
      {/* <PixHomePostListBlock />*/}
    </Stack>
  );
};

export default PixHomeBlocksView;
