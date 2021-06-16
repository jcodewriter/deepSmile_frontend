import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider, Global } from "@chakra-ui/core";
import { useApollo } from "src/services/Apollo/Client";
import StripeElements from "src/services/Stripe";
import fonts from "src/utils/theme/font-face";

import * as Sentry from "@sentry/node";

import customTheme from "src/utils/theme";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "src/shared/contexts/AuthContext";

import { SmoothScrollProvider } from "src/shared/contexts/SmoothScrollContext";
import ScrollConfig from "src/utils/config/scroll";

import "animate.css/animate.min.css";

Sentry.init({
  enabled: process.env.NODE_ENV === "production",
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
});

const App: React.FC<AppProps> = ({ Component, pageProps, ...props }) => {
  // This is needed because Next does not exposes the 'err' props in their AppProps type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = (props as any).err;
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <StripeElements>
        <AuthProvider>
          <SmoothScrollProvider options={ScrollConfig}>
            <ChakraProvider resetCSS theme={customTheme}>
              <Global styles={fonts} />
              <Component {...pageProps} err={err} />
            </ChakraProvider>
          </SmoothScrollProvider>
        </AuthProvider>
      </StripeElements>
    </ApolloProvider>
  );
};

export default App;
