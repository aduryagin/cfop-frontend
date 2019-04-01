import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ListLoader from '../components/ListLoader';
import AlgorithmsList from '../components/AlgorithmsListWrapper/AlgorithmsListWrapper';

const favoritesQuery = gql`
  query GetFavorites($favoritesIDs: [ID!]!) {
    favorites(favoritesIDs: $favoritesIDs) {
      title
      description
      subgroups{
        id
        name
        image_link
        algorithms {
          id
          algorithm
        }
      }
    }
  }
`;

const Favorites = () => (
  <Query
    query={favoritesQuery}
    variables={{ favoritesIDs: [] }}
  >
    {({ loading, error, data }) => {
      if (error) return 'Error loading favorites';
      if (loading) {
        return (
          <ListLoader />
        );
      }

      return (
        <AlgorithmsList data={data} />
      );
    }}
  </Query>
);

export default Favorites;
