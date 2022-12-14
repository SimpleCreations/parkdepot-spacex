import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Layout from "./Layout";
import { QueryParamProvider } from "use-query-params";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactRouter6Adapter as RouterAdapter } from "use-query-params/adapters/react-router-6";
import Ships from "./Ships";
import { offsetLimitPagination } from "@apollo/client/utilities";

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_API_ENDPOINT,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          ships: offsetLimitPagination(["find"]),
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
    },
  },
});

const App = () => (
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <QueryParamProvider adapter={RouterAdapter}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Ships />} />
          </Route>
        </Routes>
      </QueryParamProvider>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
