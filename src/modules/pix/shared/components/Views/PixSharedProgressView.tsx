import React from "react";
import PixSharedProgressBlock from "../Blocks/PixSharedProgressBlock";
import PixFunnelProgressView from "src/modules/pix/pages/Funnel/components/Views/PixFunnelProgressView";
import PixHomeProgressBlock from "src/modules/pix/pages/Home/components/Blocks/PixHomeProgressBlock";

//TODO: Move PixHomeProgressBlock in shared?

const PixSharedProgressView = ({ isImport = true }: { isImport?: boolean }) => {
  return (
    <PixSharedProgressBlock>
      {isImport ? <PixHomeProgressBlock /> : <PixFunnelProgressView />}
    </PixSharedProgressBlock>
  );
};

export default PixSharedProgressView;
