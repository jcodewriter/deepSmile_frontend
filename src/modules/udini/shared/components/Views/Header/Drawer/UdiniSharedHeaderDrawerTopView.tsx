import React from "react";
import { Wrap, Box } from "@chakra-ui/core";
import SharedNextTranslateSwitchLang from "src/shared/components/Controls/SharedNextTranslateSwitchLang";
import { TiltedPlus } from "src/shared/components/Shapes";
import UdiniSharedHeaderLogoLink from "../../../Controls/Header/UdiniSharedHeaderLogoLink";

const UdiniSharedHeaderDrawerTopView = ({ onClose }: { onClose: () => void }) => {
  return (
    <Wrap direction="row" minH="127px" align="center" justify="space-between">
      <UdiniSharedHeaderLogoLink />
      <SharedNextTranslateSwitchLang
        cursor="pointer"
        fontWeight="600"
        color="brandPink.100"
        _hover={{ color: "black" }}
      />
      <Box as="button" onClick={onClose}>
        <TiltedPlus boxSize="26px" />
      </Box>
    </Wrap>
  );
};

export default UdiniSharedHeaderDrawerTopView;
