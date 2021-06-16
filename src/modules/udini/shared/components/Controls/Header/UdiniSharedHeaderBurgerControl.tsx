import React from "react";
import { IconButton } from "@chakra-ui/core";
import { HamburgerIcon } from "@chakra-ui/icons";

const UdiniSharedHeaderBurgerControl = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <IconButton
      onClick={handleClick}
      aria-label="Open drawer"
      variant="transparent"
      fontSize="25px"
      icon={<HamburgerIcon />}
    />
  );
};

export default UdiniSharedHeaderBurgerControl;
