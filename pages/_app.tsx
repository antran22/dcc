import "#/styles/globals.scss";
import apolloClient from "@/graphql/apolloClient";
import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import ContextWrapper from "#/components/ContextWrapper";
import CartSidebar from "@/modules/cart";
import MenuSidebar from "#/components/MenuSidebar";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <ContextWrapper>
            <Head>
              <title>Đồ chơi chữ</title>
              <meta
                name="description"
                content="Đồ Chơi Chữ web store ecommerce"
              />
              <meta httpEquiv="content-language" content="vi" />
              <meta name="ROBOTS" content="INDEX, FOLLOW" />
              <meta name="author" content="Đồ chơi chữ" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <meta name="copyright" content="Đồ chơi chữ" />
              <meta
                name="keywords"
                content="ecommerce, dcc, Đồ chơi chữ, fashion, quần áo, linh kiện"
              />
              <meta property="og:type" content="website" />
              <meta property="og:site_name" content="Đồ Chơi Chữ" />
              <meta name="geo.region" content="VN" />
              <meta
                httpEquiv="Content-Type"
                content="text/html"
                charSet="UTF-8"
              />
              <link rel="icon" href="/logo.svg" />
            </Head>

            <Component {...pageProps} />
            <CartSidebar />
            <MenuSidebar />
          </ContextWrapper>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
