import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ListLoader from '../components/ListLoader';
import AlgorithmsList from '../components/AlgorithmsListWrapper';

const favoritesQuery = gql`
  query GetFavorites($favoritesIDs: [ID!]!) {
    favorites(algorithmsIds: $favoritesIDs) {
      id
      name
      image_link
      algorithms {
        id
        algorithm
     }
    }
  }
`;

const Favorites = () => (
  <Query
    query={favoritesQuery}
    ssr={false}
    variables={{ favoritesIDs: process.browser ? JSON.parse(window.localStorage.getItem('favorites') || '[]') : [] }}
  >
    {({ loading, error, data }) => {
      if (error) return 'Error loading favorites';
      if (loading) {
        return (
          <ListLoader />
        );
      }

      return (
        <AlgorithmsList data={{ group: { subgroups: data.favorites } }} />
      );
    }}
  </Query>
);

export default Favorites;
