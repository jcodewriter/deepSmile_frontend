import React from "react";
import PixSharedFooterBlock from "src/modules/pix/shared/components/Blocks/PixSharedFooterBlock";
import PixImportPhotosFooterView from "src/modules/pix/pages/Import/components/Views/Layout/PixImportPhotosFooterView";
import PixFunnelFooterView from "src/modules/pix/pages/Funnel/components/Views/PixFunnelFooterView";

const PixSharedFooterView = ({
  isImport = true,
  isComposite = false,
  downloadTemplate,
}: {
  isImport?: boolean;
  isComposite?: boolean;
  downloadTemplate?: () => void;
}) => {
  return (
    <PixSharedFooterBlock>
      {isImport ? (
        <PixImportPhotosFooterView isComposite={isComposite} downloadTemplate={downloadTemplate} />
      ) : (
        <PixFunnelFooterView />
      )}
    </PixSharedFooterBlock>
  );
};

export default PixSharedFooterView;
