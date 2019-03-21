import React, { useState, useCallback } from 'react';
import { Container } from 'next/app';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import { node, shape } from 'prop-types';

import { ApolloProvider } from 'react-apollo';

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.css';

import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';

import '@material/react-drawer/dist/drawer.css';

import List, { ListItem, ListItemText } from '@material/react-list';
import withApolloClient from '../lib/with-apollo-client';
import '@material/react-list/dist/list.css';

const DynamicDrawer = dynamic(() => import('@material/react-drawer'), {
  ssr: false,
});

const MyApp = ({ Component, pageProps, apolloClient }) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerIsOpen(true), [setDrawerIsOpen]);
  const closeDrawer = useCallback(() => setDrawerIsOpen(false), [setDrawerIsOpen]);

  return (
    <Container>
      <ApolloProvider client={apolloClient}>
        <Head>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>

        <style jsx global>
          {`
            body { 
              margin: 0;
            }
          `}
        </style>

        <TopAppBar>
          <TopAppBarRow>
            <TopAppBarSection align="start">
              <TopAppBarIcon navIcon tabIndex={0}>
                <MaterialIcon hasRipple icon="menu" onClick={openDrawer} />
              </TopAppBarIcon>
              <TopAppBarTitle>Fridrich CFOP</TopAppBarTitle>
            </TopAppBarSection>
          </TopAppBarRow>
        </TopAppBar>
        <DynamicDrawer
          modal
          open={drawerIsOpen}
          onClose={closeDrawer}
        >
          <List>
            <ListItem>
              <ListItemText primaryText="Home" />
            </ListItem>
            <ListItem>
              <ListItemText primaryText="Favorites" />
            </ListItem>
            <ListItem>
              <ListItemText primaryText="Links" />
            </ListItem>
            <ListItem>
              <ListItemText primaryText="Github" />
            </ListItem>
          </List>
        </DynamicDrawer>
        <TopAppBarFixedAdjust>
          <Component {...pageProps} />
        </TopAppBarFixedAdjust>
      </ApolloProvider>
    </Container>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

MyApp.propTypes = {
  Component: node.isRequired,
  pageProps: shape({}).isRequired,
  apolloClient: shape({}).isRequired,
};

export default withApolloClient(MyApp);
