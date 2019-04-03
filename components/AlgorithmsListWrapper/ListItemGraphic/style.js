import styled, { css } from 'styled-components';
import {
  ListItemGraphic,
} from '@material/react-list';

// eslint-disable-next-line import/prefer-default-export
export const ListItemGraphicStyled = styled(ListItemGraphic)`
  margin-right: 0;

  ${({ active }) => active && css`
    color: #6206ee;
  `}
`;
