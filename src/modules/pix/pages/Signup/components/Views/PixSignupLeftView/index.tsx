import React from "react";
import { Stack } from "@chakra-ui/core";
import PixSignupCopyrightView from "./PixSignupCopyrightView";
import PixSignupLeftContentView from "./PixSignupLeftContentView";

const PixSignupLeftView = () => {
  return (
    <Stack
      paddingTop="100px"
      paddingBottom="35px"
      backgroundColor="brandBlue.100"
      color="white"
      justify="space-between"
      align="center"
      width="640px"
      display={{
        base: "none",
        xs: "none",
        sm: "inline-flex",
        md: "inline-flex",
        lg: "inline-flex",
      }}
    >
      <PixSignupLeftContentView />
      <PixSignupCopyrightView />
    </Stack>
  );
};

export default PixSignupLeftView;
