import List, {
  ListDivider,
} from '@material/react-list';
import { shape } from 'prop-types';
import ListItemGraphic from '../ListItemGraphic';
import { ListItemTextStyled, ListItemStyled } from './style';

const AlgorithmsList = ({ subgroup }) => (
  <List>
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

AlgorithmsList.propTypes = {
  subgroup: shape({}).isRequired,
};

export default AlgorithmsList;
