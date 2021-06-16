import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@chakra-ui/core";

interface PixProfileIconButtonProps extends ButtonProps {
  children: ReactNode;
}

const PixProfileIconButton = ({ children, ...baseButtonProps }: PixProfileIconButtonProps) => {
  return (
    <Button bg="white" {...baseButtonProps}>
      {children}
    </Button>
  );
};

export default PixProfileIconButton;
