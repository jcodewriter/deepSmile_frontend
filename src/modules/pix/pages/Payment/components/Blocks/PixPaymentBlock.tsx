import React from "react";
import { Stack, Flex, Text } from "@chakra-ui/core";

const PixPaymentBlock = () => {
  return (
    <Stack h="200px" w="640px" padding="30px" border="1px solid #E0E0E0" borderRadius="4px">
      <Flex>
        <Text>Carte enregistrée</Text>
      </Flex>
      <Stack>
        <Text>Numéro de carte: **** **** **** 9876</Text>
        <Text>Date d’expiration: 12/23</Text>
        <Text>CVV: ***</Text>
      </Stack>
    </Stack>
  );
};

export default PixPaymentBlock;
