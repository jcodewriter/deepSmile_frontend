import React, { ReactNode } from "react";
import { VStack, Flex, Text } from "@chakra-ui/core";
import { PixMidTitle } from "src/shared/components/Titles";

interface PixProfileModalLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  width: string;
  height: string;
}

const PixProfileModalLayout = ({
  children,
  title,
  subtitle = undefined,
  width,
  height,
}: PixProfileModalLayoutProps) => {
  return (
    <VStack width={width} height={height}>
      <Flex w="100%" direction="column" justify="flex-start" padding="36px 0px 41px 32px">
        <PixMidTitle>{title}</PixMidTitle>
        {subtitle && (
          <Text
            pt="7px"
            fontFamily="Montserrat"
            fontStyle="normal"
            fontWeight="500"
            fontSize="16px"
            lineHeight="20px"
          >
            {subtitle}
          </Text>
        )}
      </Flex>

      {children}
    </VStack>
  );
};

export default PixProfileModalLayout;
