import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_ENDPOINT = "";

const apolloClient = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  },
});

export default apolloClient;
