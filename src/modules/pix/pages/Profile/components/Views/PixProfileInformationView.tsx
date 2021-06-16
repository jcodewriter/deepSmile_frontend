import React from "react";
import { VStack, Text } from "@chakra-ui/core";
import { useAuthState } from "src/shared/contexts/AuthContext";

const PixProfileInformationView = () => {
  const { profile } = useAuthState();

  return (
    <VStack
      align="flex-start"
      fontFamily="Montserrat"
      fontStyle="normal"
      fontWeight="500"
      fontSize="16px"
      lineHeight="20px"
      color="#222222"
    >
      <Text>
        {profile?.infos?.firstName} {profile?.infos?.lastName}
      </Text>
      <Text>{profile?.email}</Text>
      <Text>{profile?.infos?.phone}</Text>
    </VStack>
  );
};

export default PixProfileInformationView;
