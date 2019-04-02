import { Grid } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import { shape } from 'prop-types';
import ContentLoader from 'react-content-loader';
import { memo } from 'react';
import { Body1 } from '@material/react-typography';
import isEqual from 'lodash/fp/isEqual';
import dynamic from 'next/dynamic';
import SubgroupInfoStyled from './styled/SubgroupInfoStyled';
import SubgroupDescriptionStyled from './styled/SubgroupDescriptionStyled';

import GroupTitleStyled from './styled/GroupTitleStyled';

const AlgorithmsListDynamic = dynamic(() => import('./components/AlgorithmsList/AlgorithmsList'), {
  ssr: false,
  loading: () => (
    <ContentLoader
      height={150}
      width={320}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      uniquekey={1}
      style={{ width: 320 }}
    >
      <rect x="10" y="23" rx="0" ry="0" width="120" height="18" />
      <rect x="10" y="70" rx="0" ry="0" width="80" height="18" />
      <rect x="10" y="117" rx="0" ry="0" width="150" height="18" />
    </ContentLoader>
  ),
});

const AlgorithmsList = ({ data }) => (
  <Grid>
    {data.group.title && (
      <GroupTitleStyled>
        {data.group.title}
        {' '}
  (
        {data.group.description}
  )
      </GroupTitleStyled>
    )}
    {
            data.group.subgroups.length ? data.group.subgroups.map(subgroup => (
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
            )) : <Body1>Nothing found...</Body1>
          }
  </Grid>
);

AlgorithmsList.propTypes = {
  data: shape({}).isRequired,
};

export default memo(AlgorithmsList, isEqual);
