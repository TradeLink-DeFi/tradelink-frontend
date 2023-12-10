"use client";

import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

export const ApolloProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sepoliaGraph = new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/supanut1911/tradelink-nft-sepolia",
  });

  const mumbaiGraph = new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/supanut1911/tradelink-nft-mumbai",
  });

  const bscGraph = new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/supanut1911/tradelink-nft-bsc-chapel",
  });

  const fujiGraph = new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/supanut1911/tradelink-nft-avalance-fuji",
  });

  const optimismGraph = new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/supanut1911/tradelink-nft-optimism-goerli",
  });

  const tradeStatusCheckerSepolia = new HttpLink({
    uri: "https://api.studio.thegraph.com/query/59650/v2tradelink-trade-statue-cker/sepolia",
  });

  const tradeStatusCheckerMumbai = new HttpLink({
    uri: "https://api.studio.thegraph.com/query/59650/v2tradelink-trade-statue-cker/mumbai",
  });

  const tradeStatusCheckerFuji = new HttpLink({
    uri: "https://api.studio.thegraph.com/query/59650/v2tradelink-trade-statue-cker/fuji",
  });

  const client = new ApolloClient({
    link: ApolloLink.split(
      (operation) => operation.getContext().clientName === "sepolia",
      sepoliaGraph,
      ApolloLink.split(
        (operation) => operation.getContext().clientName === "mumbai",
        mumbaiGraph,
        ApolloLink.split(
          (operation) => operation.getContext().clientName === "bsc",
          bscGraph,
          ApolloLink.split(
            (operation) => operation.getContext().clientName === "fuji",
            fujiGraph,
            ApolloLink.split(
              (operation) => operation.getContext().clientName === "optimism",
              optimismGraph,
              ApolloLink.split(
                (operation) =>
                  operation.getContext().clientName === "statusChekcerSepolia",
                tradeStatusCheckerSepolia,
                ApolloLink.split(
                  (operation) =>
                    operation.getContext().clientName === "statusChekcerMumbai",
                  tradeStatusCheckerMumbai,
                  ApolloLink.split(
                    (operation) =>
                      operation.getContext().clientName === "statusChekcerFuji",
                    tradeStatusCheckerFuji
                  )
                )
              )
            )
          )
        )
      )
    ),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
