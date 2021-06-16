import React from "react";
import { render as rtlRender } from "@testing-library/react";
import PropTypes from "prop-types";
import { ChakraProvider } from "@chakra-ui/core";
import customTheme from "src/utils/theme";

function render(ui, options = {}) {
  function Wrapper({ children }) {
    return (
      <ChakraProvider resetCSS theme={customTheme}>
        {children}
      </ChakraProvider>
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
