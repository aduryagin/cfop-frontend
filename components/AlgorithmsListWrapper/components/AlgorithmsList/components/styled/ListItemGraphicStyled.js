import styled, { css } from 'styled-components';
import {
  ListItemGraphic,
} from '@material/react-list';

const ListItemGraphicStyled = styled(ListItemGraphic)`
  margin-right: 0;

  ${({ active }) => active && css`
    color: #6206ee;
  `}
`;

export default ListItemGraphicStyled;
