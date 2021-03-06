import React, { createContext, ComponentType } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import {
  TopAppBarFixedAdjust,
} from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import withApolloClient from '../lib/withApolloClient';
import Preloader from '../components/Preloader';
import Header from '../components/Header';
import '@material/react-layout-grid/dist/layout-grid.css';
import '@material/react-typography/dist/typography.css';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';

export const ApplicationContext = createContext({ favorites: [] });

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

type MyAppProps = {
  apolloClient: ApolloClient<NormalizedCacheObject>,
  Component: ComponentType,
  pageProps: {}
}

class MyApp extends App<MyAppProps> {
  static contextType = ApplicationContext;

  render() {
    const { apolloClient, Component, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <link rel="shortcut icon" href="/static/icons/icon-72x72.png" />
            <link rel="manifest" href="/static/manifest.webmanifest" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="description" content="The CFOP Method (Cross – F2L – OLL – PLL), sometimes known as the Fridrich method, is one of the most commonly used methods in speedsolving a 3×3×3 Rubik's Cube." />
          </Head>
          <GlobalStyle />
          <Header />
          <TopAppBarFixedAdjust>
            <Preloader />
            <Component {...pageProps} />
          </TopAppBarFixedAdjust>
        </ApolloProvider>
      </Container>
    );
  }
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default withApolloClient(MyApp);
