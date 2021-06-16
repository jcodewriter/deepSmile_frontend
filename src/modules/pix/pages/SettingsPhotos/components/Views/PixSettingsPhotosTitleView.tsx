import React from "react";
import { Heading, Flex } from "@chakra-ui/core";
import PixSharedButton from "src/modules/pix/shared/components/Controls/PixSharedButton";

const PixSettingsPhotosTitleView = () => {
  return (
    <Flex justify="space-between">
      <Heading fontWeight="600" fontSize="28px" lineHeight="32px">
        Mon protocole photo
      </Heading>
      <PixSharedButton type="submit" variant="grey">
        Enregistrer
      </PixSharedButton>
    </Flex>
  );
};

export default PixSettingsPhotosTitleView;
