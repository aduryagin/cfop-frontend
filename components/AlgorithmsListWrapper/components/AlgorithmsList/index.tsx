import List, {
  ListDivider,
} from '@material/react-list';
import ListItemGraphic from '../ListItemGraphic';
import { ListItemTextStyled, ListItemStyled } from './style';
import { NextFunctionComponent } from 'next';

type AlgorithmsListProps = {
  subgroup: {
    algorithms: Array<{id: number, algorithm: string}>
  }
}

const AlgorithmsList: NextFunctionComponent<AlgorithmsListProps> = ({ subgroup }) => (
  <List role="listbox">
    {subgroup.algorithms.map(algorithm => (
      <div key={algorithm.id}>
        <ListItemStyled>
          <ListItemTextStyled
            primaryText={algorithm.algorithm}
          />
          <ListItemGraphic algorithmId={algorithm.id} />
        </ListItemStyled>
        <ListDivider />
      </div>
    ))}
  </List>
);

export default AlgorithmsList;
