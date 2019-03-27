import React, { createContext } from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { func, shape } from 'prop-types';
import { createGlobalStyle } from 'styled-components';
import { ApolloProvider } from 'react-apollo';
import {
  TopAppBarFixedAdjust,
} from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import withApolloClient from '../lib/withApolloClient';
import Preloader from '../components/Preloader';
import Header from '../components/Header/Header';
import '@material/react-layout-grid/dist/layout-grid.css';

export const ApplicationContext = createContext({ favorites: [] });

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

class MyApp extends App {
  static contextType = ApplicationContext;

  render() {
    const { apolloClient, Component, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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

MyApp.propTypes = {
  Component: func.isRequired,
  pageProps: shape({}).isRequired,
  apolloClient: shape({}).isRequired,
};

export default withApolloClient(MyApp);
