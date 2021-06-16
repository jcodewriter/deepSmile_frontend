import React from "react";
import { SimpleGrid } from "@chakra-ui/core";
import PixImportPhotosCompositeLogoBlock from "src/modules/pix/pages/Import/components/Blocks/Composite/PixImportPhotosCompositeLogoBlock";
import PixImportPhotosCompositeDropBlock from "src/modules/pix/pages/Import/components/Blocks/Composite/PixImportPhotosCompositeDropBlock";

const PixImportPhotosCompositeImageGridView = () => {
  return (
    <SimpleGrid columns={3} spacing="15px">
      <PixImportPhotosCompositeDropBlock column={1} row={1} />
      <PixImportPhotosCompositeDropBlock column={2} row={1} />
      <PixImportPhotosCompositeDropBlock column={3} row={1} />
      <PixImportPhotosCompositeDropBlock column={1} row={2} />
      <PixImportPhotosCompositeLogoBlock />
      <PixImportPhotosCompositeDropBlock column={3} row={2} />
      <PixImportPhotosCompositeDropBlock column={1} row={3} />
      <PixImportPhotosCompositeDropBlock column={2} row={3} />
      <PixImportPhotosCompositeDropBlock column={3} row={3} />
    </SimpleGrid>
  );
};

export default PixImportPhotosCompositeImageGridView;
