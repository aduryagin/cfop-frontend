import styled from 'styled-components';
import { Headline5, Body1 } from '@material/react-typography';

export const SubgroupInfoStyled = styled.div`
  display: flex;
  margin-top: 30px;

  img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
`;

export const SubgroupDescriptionStyled = styled(Body1)`
  margin: 0;
`;

export const GroupTitleStyled = styled(Headline5)`
  margin: 9px 0 0;
`;
