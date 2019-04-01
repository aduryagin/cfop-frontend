import { Grid } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import { shape } from 'prop-types';
import { memo } from 'react';
import isEqual from 'lodash/fp/isEqual';
import dynamic from 'next/dynamic';
import SubgroupInfoStyled from './styled/SubgroupInfoStyled';
import SubgroupDescriptionStyled from './styled/SubgroupDescriptionStyled';

import GroupTitleStyled from './styled/GroupTitleStyled';

const AlgorithmsListDynamic = dynamic(() => import('./components/AlgorithmsList/AlgorithmsList'), {
  ssr: false,
  loading: () => null,
});

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
                <AlgorithmsListDynamic {...{ subgroup }} />
              </div>
            ))
          }
  </Grid>
);

AlgorithmsList.propTypes = {
  data: shape({}).isRequired,
};

export default memo(AlgorithmsList, isEqual);
