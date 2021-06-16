import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@chakra-ui/core";

interface PixProfileModalButtonProps extends ButtonProps {
  children: ReactNode;
}

const PixProfileModalButton = ({ children, ...buttonProps }: PixProfileModalButtonProps) => {
  return (
    <Button bgColor="black" marginBottom="4" {...buttonProps}>
      {children}
    </Button>
  );
};

export default PixProfileModalButton;
