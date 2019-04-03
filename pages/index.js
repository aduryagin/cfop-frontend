import List, { ListItem, ListItemText } from '@material/react-list';
import { Query } from 'react-apollo';
import Head from 'next/head';
import gql from 'graphql-tag';
import Router from 'next/router';
import { useCallback } from 'react';
import ContentLoader from 'react-content-loader';
import '@material/react-list/dist/list.css';

const groupsQuery = gql`
  query {
    groups {
      id
      title
      description
    }
  }
`;

function Home() {
  const listItemClick = useCallback((event) => { Router.push(`/group?id=${event.currentTarget.dataset.id}`); }, []);

  return (
    <>
      <Head>
        <title>My page title</title>
      </Head>
      <Query query={groupsQuery}>
        {({ loading, error, data }) => {
          if (error) return 'Error loading groups';
          if (loading) {
            return (
              <ContentLoader
                height={260}
                width={320}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
                uniquekey={1}
                style={{ width: 320 }}
              >
                <rect x="15" y="25" rx="0" ry="0" width="140" height="16" />
                <rect x="15" y="47" rx="0" ry="0" width="30" height="16" />

                <rect x="15" y="92" rx="0" ry="0" width="140" height="16" />
                <rect x="15" y="114" rx="0" ry="0" width="30" height="16" />

                <rect x="15" y="159" rx="0" ry="0" width="140" height="16" />
                <rect x="15" y="181" rx="0" ry="0" width="30" height="16" />
              </ContentLoader>
            );
          }

          return (
            <List twoLine>
              {data.groups.map(group => (
                <ListItem onClick={listItemClick} data-id={group.id} key={group.id}>
                  <ListItemText
                    secondaryText={group.description}
                    primaryText={group.title}
                  />
                </ListItem>
              ))}
            </List>
          );
        }}
      </Query>
    </>
  );
}

export default Home;
