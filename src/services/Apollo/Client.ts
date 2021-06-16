import { useMemo } from "react";
import { ApolloClient, InMemoryCache, NormalizedCacheObject, split } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "src/services/AuthTokenHelper";

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

/**
 * WebSocket link used for Subscriptions
 */
const getWsLink = () => {
  return new WebSocketLink({
    uri: process.env.NEXT_PUBLIC_WS_API_URL as string,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: () => {
        const token = getToken();

        return {
          "X-API-Key": process.env.NEXT_PUBLIC_API_KEY,
          Authorization: token ? `Bearer ${token}` : "",
        };
      },
    },
  });
};

/**
 * This link handles file upload as well as basic http queries.
 * It replaces httpLink.
 */
const uploadLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  headers: { "x-api-key": process.env.NEXT_PUBLIC_API_KEY },
  credentials: "same-origin",
});

/**
 * We dont want to use web socket link for Queries and Mutations.
 */
const splitLink = process.browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === "OperationDefinition" && definition.operation === "subscription";
      },
      authLink.concat(errorLink).concat(getWsLink()),
      authLink.concat(errorLink).concat(uploadLink)
    )
  : authLink.concat(errorLink).concat(uploadLink);

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: splitLink,
    cache: new InMemoryCache(),
  });
}
export function initializeApollo(initialState: NormalizedCacheObject) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
export function useApollo(initialState: NormalizedCacheObject) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
