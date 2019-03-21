import List, { ListItem, ListItemText } from '@material/react-list';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
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
  return (
    <Query query={groupsQuery}>
      {({ loading, error, data }) => {
        if (error) return 'Error loading groups';
        if (loading) return <div>Loading...</div>;

        return (
          <List twoLine>
            {data.groups.map(group => (
              <ListItem key={group.id}>
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
  );
}

export default Home;
