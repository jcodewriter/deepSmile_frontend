import React from "react";
import { render as rtlRender } from "@testing-library/react";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/core";
import { MockedProvider } from "@apollo/client/testing";
import customTheme from "src/utils/theme";
import { AuthProvider } from "src/shared/contexts/AuthContext";
import { RouterContext } from "next/dist/next-server/lib/router-context";

function render(ui, mocks, router, options = {}) {
  const {
    route = "",
    pathname = "",
    query = {},
    asPath = "",
    push = async () => true,
    replace = async () => true,
    reload = () => null,
    back = () => null,
    prefetch = async () => undefined,
    beforePopState = () => null,
    isFallback = false,
    events = {
      on: () => null,
      off: () => null,
      emit: () => null,
    },
  } = router;

  function Wrapper({ children }) {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChakraProvider resetCSS theme={customTheme}>
          <RouterContext.Provider
            value={{
              route,
              pathname,
              query,
              asPath,
              push,
              replace,
              reload,
              back,
              prefetch,
              beforePopState,
              isFallback,
              events,
            }}
          >
            <AuthProvider>{children}</AuthProvider>
          </RouterContext.Provider>
        </ChakraProvider>
      </MockedProvider>
    );
  }
  Wrapper.propTypes = {
    children: PropTypes.node,
  };

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

export * from "@testing-library/react";
// override the built-in render with our own
export { render };
