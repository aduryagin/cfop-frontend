import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { shape } from 'prop-types';
import { withRouter } from 'next/router';
import ListLoader from '../../components/ListLoader';
import AlgorithmsList from '../../components/AlgorithmsList/AlgorithmsList';

const groupsQuery = gql`
  query GetGroup($groupID: ID!) {
    group(groupID: $groupID) {
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

const Group = ({ router }) => (
  <Query
    query={groupsQuery}
    variables={{ groupID: router.query.id }}
  >
    {({ loading, error, data }) => {
      if (error) return 'Error loading group';
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

Group.propTypes = {
  router: shape({}).isRequired,
};

export default withRouter(Group);
