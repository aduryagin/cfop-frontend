import { Query } from 'react-apollo';
import List, {
  ListItem, ListItemText, ListDivider, ListItemGraphic,
} from '@material/react-list';
import gql from 'graphql-tag';
import { shape } from 'prop-types';
import { withRouter } from 'next/router';
import { Headline5, Body1 } from '@material/react-typography';
import '@material/react-typography/dist/typography.css';
import { Grid } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import MaterialIcon from '@material/react-material-icon';
import ContentLoader from 'react-content-loader';

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
            <Headline5 className="group-title">
              {data.group.title}
              {' '}
(
              {data.group.description}
)
            </Headline5>
            {
            data.group.subgroups.map(subgroup => (
              <div key={subgroup.id}>
                <div className="subgroup-info">
                  <img src={subgroup.image_link} alt={subgroup.name} />
                  <Body1 className="subgroup-description" tag="span">
Name:
                    {' '}
                    {subgroup.name}

                  </Body1>
                </div>
                <List>
                  {subgroup.algorithms.map(algorithm => (
                    <div key={algorithm.id}>
                      <ListItem className="algorithms-list-item">
                        <ListItemText
                          className="list-text"
                          primaryText={algorithm.algorithm}
                        />
                        <ListItemGraphic className={`favorite ${process.browser ? 'favorite--active' : ''}`} onClick={() => { console.log(1); }} graphic={<MaterialIcon icon="favorite" hasRipple />} />
                      </ListItem>
                      <ListDivider />
                    </div>
                  ))}
                </List>
              </div>
            ))
          }
          </Grid>
          <style jsx global>
            {`
              .list-text {
                white-space: normal;
              }

              .subgroup-info {
                display: flex;
                margin-top: 30px;
              }

              .subgroup-info img {
                width: 100px;
                height: 100px;
                margin-right: 20px;
              }

              .favorite--active {
                color: red;
              }

              .algorithms-list-item {
                justify-content: space-between;
              }

              .favorite {
                margin-right: 0;
              }

              .group-title {
                margin: 9px 0 0;
              }

              .subgroup-description {
                margin: 0;
              }
            `}
          </style>
        </>
      );
    }}
  </Query>
);

Group.propTypes = {
  router: shape({}).isRequired,
};

export default withRouter(Group);
