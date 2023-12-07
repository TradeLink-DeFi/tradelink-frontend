import AuthProvider from "@/providers/AuthProvider";
import RainbowWagmiProvider from "@/providers/RainbowWagmiProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloProviders } from "@/providers/ApolloProviders";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactQueryProvider from "@/providers/ReactQuery.provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RainbowWagmiProvider>
      <AuthProvider>
        <NextUIProvider>
          <ApolloProviders>
            <Component {...pageProps} />
          </ApolloProviders>
        </NextUIProvider>
      </AuthProvider>
    </RainbowWagmiProvider>
  );
}
