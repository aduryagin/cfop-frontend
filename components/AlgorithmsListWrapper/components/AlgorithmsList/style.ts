import { ListItem, ListItemText } from '@material/react-list';
import styled from 'styled-components';

export const ListItemStyled = styled(ListItem).attrs(() => ({ role: 'option' }))`
  justify-content: space-between;
`;

export const ListItemTextStyled = styled(ListItemText)`
  white-space: normal;
`;
