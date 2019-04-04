import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ListLoader from '../components/ListLoader';
import AlgorithmsList from '../components/AlgorithmsListWrapper';
import Title from '../components/Title';

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
      if (error) {
        return (
          <>
            <Title text="Error" />
      Error loading favorites
          </>
        );
      }
      if (loading) {
        return (
          <>
            <Title text="Loading..." />
            <ListLoader />
          </>
        );
      }

      return (
        <>
          <Title text="Favorites" />
          <AlgorithmsList data={{ group: { subgroups: data.favorites } }} />
        </>
      );
    }}
  </Query>
);

export default Favorites;
