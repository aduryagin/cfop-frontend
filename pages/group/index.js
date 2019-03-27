import { Query } from 'react-apollo';
import List, {
  ListDivider,
} from '@material/react-list';
import gql from 'graphql-tag';
import { shape } from 'prop-types';
import { withRouter } from 'next/router';
import '@material/react-typography/dist/typography.css';
import { Grid } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import MaterialIcon from '@material/react-material-icon';
import ContentLoader from 'react-content-loader';
import ListItemTextStyled from './styled/ListItemTextStyled';
import SubgroupInfoStyled from './styled/SubgroupInfoStyled';
import SubgroupDescriptionStyled from './styled/SubgroupDescriptionStyled';
import ListItemGraphicStyled from './styled/ListItemGraphicStyled';
import ListItemStyled from './styled/ListItemStyled';
import GroupTitleStyled from './styled/GroupTitleStyled';

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
          <ContentLoader
            height={350}
            width={320}
            speed={2}
            primaryColor="#f3f3f3"
            secondaryColor="#ecebeb"
            uniquekey={1}
            style={{ width: 320 }}
          >
            <rect x="20" y="28" rx="0" ry="0" width="250" height="28" />

            <rect x="20" y="85" rx="0" ry="0" width="100" height="100" />
            <rect x="140" y="85" rx="0" ry="0" width="100" height="16" />

            <rect x="20" y="203" rx="0" ry="0" width="120" height="18" />
            <rect x="20" y="250" rx="0" ry="0" width="80" height="18" />
            <rect x="20" y="297" rx="0" ry="0" width="150" height="18" />
          </ContentLoader>
        );
      }

      return (
        <>
          <Grid>
            <GroupTitleStyled>
              {data.group.title}
              {' '}
(
              {data.group.description}
)
            </GroupTitleStyled>
            {
            data.group.subgroups.map(subgroup => (
              <div key={subgroup.id}>
                <SubgroupInfoStyled>
                  <img src={subgroup.image_link} alt={subgroup.name} />
                  <SubgroupDescriptionStyled tag="span">
Name:
                    {' '}
                    {subgroup.name}
                  </SubgroupDescriptionStyled>
                </SubgroupInfoStyled>
                <List>
                  {subgroup.algorithms.map(algorithm => (
                    <div key={algorithm.id}>
                      <ListItemStyled>
                        <ListItemTextStyled
                          primaryText={algorithm.algorithm}
                        />
                        <ListItemGraphicStyled onClick={() => { console.log(1); }} graphic={<MaterialIcon icon="favorite" hasRipple />} />
                      </ListItemStyled>
                      <ListDivider />
                    </div>
                  ))}
                </List>
              </div>
            ))
          }
          </Grid>
        </>
      );
    }}
  </Query>
);

Group.propTypes = {
  router: shape({}).isRequired,
};

export default withRouter(Group);
