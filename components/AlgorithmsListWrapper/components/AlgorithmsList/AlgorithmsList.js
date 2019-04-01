import MaterialIcon from '@material/react-material-icon';
import List, {
  ListDivider,
} from '@material/react-list';
import { useCallback } from 'react';
import { shape } from 'prop-types';
import ListItemGraphicStyled from './styled/ListItemGraphicStyled';
import ListItemStyled from './styled/ListItemStyled';
import ListItemTextStyled from './styled/ListItemTextStyled';

const AlgorithmsList = ({ subgroup }) => {
  const isInFavorites = useCallback((id) => {
    const favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    const favoriteIndex = favorites.indexOf(id);

    if (favoriteIndex !== -1) {
      return favoriteIndex;
    }

    return undefined;
  }, []);

  const toggleInLocalstorage = useCallback((event) => {
    const { id } = event.target.dataset;
    const favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    const favoriteIndex = isInFavorites(favorites, id);

    if (favoriteIndex) {
      favorites.splice(favoriteIndex, 1);
    } else {
      favorites.push(id);
    }

    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [isInFavorites]);

  return (
    <List>
      {subgroup.algorithms.map(algorithm => (
        <div key={algorithm.id}>
          <ListItemStyled>
            <ListItemTextStyled
              primaryText={algorithm.algorithm}
            />
            <ListItemGraphicStyled active={isInFavorites(algorithm.id) > -1 ? 1 : 0} onClick={toggleInLocalstorage} data-id={algorithm.id} graphic={<MaterialIcon icon="favorite" hasRipple />} />
          </ListItemStyled>
          <ListDivider />
        </div>
      ))}
    </List>
  );
};

AlgorithmsList.propTypes = {
  subgroup: shape({}).isRequired,
};

export default AlgorithmsList;
