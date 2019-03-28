import { Grid } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import { shape } from 'prop-types';
import MaterialIcon from '@material/react-material-icon';
import List, {
  ListDivider,
} from '@material/react-list';
import { memo } from 'react';
import isEqual from 'lodash/fp/isEqual';
import ListItemTextStyled from './styled/ListItemTextStyled';
import SubgroupInfoStyled from './styled/SubgroupInfoStyled';
import SubgroupDescriptionStyled from './styled/SubgroupDescriptionStyled';
import ListItemGraphicStyled from './styled/ListItemGraphicStyled';
import ListItemStyled from './styled/ListItemStyled';
import GroupTitleStyled from './styled/GroupTitleStyled';

const AlgorithmsList = ({ data }) => (
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
);

AlgorithmsList.propTypes = {
  data: shape({}).isRequired,
};

export default memo(AlgorithmsList, isEqual);
