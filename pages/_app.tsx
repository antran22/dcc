import '../src/shared/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Provider } from 'react-redux';
import Header from '../src/shared/components/Header';
import AppWrapper from '../src/shared/components/AppWrapper/AppWrapper';
import store from '../src/redux/store';
import ContextWrapper from '../src/shared/components/ContextWrapper';
import CartSidebar from '../src/modules/cart';
import MenuSidebar from '../src/shared/components/MenuSidebar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ContextWrapper>
        <div>
          <Head>
            <title>Đồ chơi chữ</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/logo.svg" />
          </Head>

          <AppWrapper>
            <Header />
            <Component {...pageProps} />
            <CartSidebar />
            <MenuSidebar />
          </AppWrapper>
        </div>
      </ContextWrapper>
    </Provider>
  );
}

export default MyApp;
