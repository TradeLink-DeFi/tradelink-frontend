import AuthProvider from "@/providers/AuthProvider";
import RainbowWagmiProvider from "@/providers/RainbowWagmiProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ApolloProviders } from "@/providers/ApolloProviders";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactQueryProvider from "@/providers/ReactQuery.provider";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <RainbowWagmiProvider>
        <AuthProvider>
          <NextUIProvider>
            <ApolloProviders>
              <Toaster position="top-center" reverseOrder={false} />
              <Component {...pageProps} />
            </ApolloProviders>
          </NextUIProvider>
        </AuthProvider>
      </RainbowWagmiProvider>
    </ReactQueryProvider>
  );
}
