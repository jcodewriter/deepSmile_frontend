import React, { ReactNode } from "react";
import { Button, ButtonProps } from "@chakra-ui/core";

interface PixProfileModifyButtonProps extends ButtonProps {
  children: ReactNode;
}

const PixProfileModifyButton = ({ children, ...baseButtonProps }: PixProfileModifyButtonProps) => {
  return (
    <Button
      borderColor="brandGrey.600"
      borderWidth="1px"
      bg="white"
      padding="15px"
      {...baseButtonProps}
    >
      {children}
    </Button>
  );
};

export default PixProfileModifyButton;
