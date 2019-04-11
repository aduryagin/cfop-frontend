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

  /* fallback */
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-display: swap;
    font-weight: 400;
    src: local('Roboto'), url(https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
  }

  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
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
