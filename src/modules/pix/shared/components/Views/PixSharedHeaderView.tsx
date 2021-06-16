import React from "react";
import PixSharedHeaderBlock from "src/modules/pix/shared/components/Blocks/PixSharedHeaderBlock";
import PixImportPhotosHeaderView from "src/modules/pix/pages/Import/components/Views/Layout/PixImportPhotosHeaderView";
import PixFunnelHeaderView from "src/modules/pix/pages/Funnel/components/Views/PixFunnelHeaderView";

const PixSharedHeaderView = ({ isImport = true }: { isImport?: boolean }) => {
  return (
    <PixSharedHeaderBlock>
      {isImport ? <PixImportPhotosHeaderView /> : <PixFunnelHeaderView />}
    </PixSharedHeaderBlock>
  );
};

export default PixSharedHeaderView;
