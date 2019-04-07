import styled, { css } from 'styled-components';
import {
  ListItemGraphic,
} from '@material/react-list';

type ListItemGraphicStyledProps = {
  active: boolean | number,
  onClick: Function,
  'data-id': number,
  graphic: any
}

// eslint-disable-next-line import/prefer-default-export
export const ListItemGraphicStyled = styled(ListItemGraphic)<ListItemGraphicStyledProps>`
  margin-right: 0;

  ${({ active }) => active && css`
    color: #6206ee;
  `}
`;