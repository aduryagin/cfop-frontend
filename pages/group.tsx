import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { NextFunctionComponent } from 'next';
import { withRouter, RouterProps } from 'next/router'; 
import ListLoader from '../components/ListLoader';
import AlgorithmsListWrapper from '../components/AlgorithmsListWrapper';
import Title from '../components/Title';

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

type GroupProps = { router: RouterProps<{ id: string }> }

const Group: NextFunctionComponent<GroupProps> = ({ router }) => (
  <Query
    query={groupsQuery}
    variables={{ groupID: router.query ? router.query.id : 1 }}
  >
    {({ loading, error, data }) => {
      if (error) {
        return (
          <>
            <Title text="Error" />
Error loading group
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
          <Title text={data.group.title} />
          <AlgorithmsListWrapper data={data} />
        </>
      );
    }}
  </Query>
);

export default withRouter(Group as any);
