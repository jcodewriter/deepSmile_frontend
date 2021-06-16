import React, { ReactNode } from "react";
import { FormLabel } from "@chakra-ui/core";

const PixSharedFormLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => {
  return (
    <FormLabel
      htmlFor={htmlFor}
      fontStyle="normal"
      fontWeight="bold"
      fontSize="14px"
      lineHeight="20px"
    >
      {children}
    </FormLabel>
  );
};

export default PixSharedFormLabel;
