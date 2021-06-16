import React from "react";
import { render as rtlRender } from "@testing-library/react";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/core";
import { MockedProvider } from "@apollo/client/testing";
import customTheme from "src/utils/theme";
import { AuthProvider } from "src/shared/contexts/AuthContext";

function render(ui, mocks, options = {}) {
  function Wrapper({ children }) {
    return (
      <MockedProvider mocks={mocks} addTypename={false}>
        <ChakraProvider resetCSS theme={customTheme}>
          <AuthProvider>{children}</AuthProvider>
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
