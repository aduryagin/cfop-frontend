import { Grid } from '@material/react-layout-grid';
import '@material/react-layout-grid/dist/layout-grid.css';
import ContentLoader from 'react-content-loader';
import { NextFunctionComponent } from 'next';
import { memo } from 'react';
import { Body1 } from '@material/react-typography';
import isEqual from 'lodash/fp/isEqual';
import dynamic from 'next/dynamic';
import { GroupTitleStyled, SubgroupDescriptionStyled, SubgroupInfoStyled } from './style';

const AlgorithmsListDynamic = dynamic(() => import('./components/AlgorithmsList'), {
  ssr: false,
  loading: () => (
    <ContentLoader
      height={150}
      width={320}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
      uniquekey={'1'}
      style={{ width: 320 }}
    >
      <rect x="10" y="23" rx="0" ry="0" width="120" height="18" />
      <rect x="10" y="70" rx="0" ry="0" width="80" height="18" />
      <rect x="10" y="117" rx="0" ry="0" width="150" height="18" />
    </ContentLoader>
  ),
});

type AlgorithmsListWrapperProps = { data: any };

const AlgorithmsListWrapper: NextFunctionComponent<AlgorithmsListWrapperProps> = ({ data }) => (
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
            data.group.subgroups.length ? data.group.subgroups.map((subgroup: any) => (
              <div key={subgroup.id}>
                <SubgroupInfoStyled>
                  <img src={subgroup.image_link} alt={subgroup.name} loading="lazy" />
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

export default memo(AlgorithmsListWrapper, isEqual);
