import React from "react";
import { useAuthState } from "src/shared/contexts/AuthContext";
import { Flex, Spinner } from "@chakra-ui/core";

const WithWaitForAuthentication = (Component: React.FC) => () => {
  const { hasRefreshToken, isAuthenticated } = useAuthState();

  if (hasRefreshToken && !isAuthenticated) {
    return (
      <Flex h="100vh" w="100vw" justify="center" align="center">
        <Spinner size="xl" color="brandBlue.100" thickness="5px" />
      </Flex>
    );
  }

  return <Component />;
};

export default WithWaitForAuthentication;
