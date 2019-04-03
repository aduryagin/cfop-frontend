import MaterialIcon from '@material/react-material-icon';
import { useCallback, useState } from 'react';
import { string } from 'prop-types';
import { ListItemGraphicStyled } from './style';

const ListItemGraphic = ({ algorithmId }) => {
  const isInFavorites = useCallback((id) => {
    const favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    const favoriteIndex = favorites.indexOf(id.toString());

    return favoriteIndex;
  }, []);

  const [isActive, setIsActive] = useState(isInFavorites(algorithmId) !== -1);

  const toggleInLocalstorage = useCallback((event) => {
    const { id } = event.target.dataset;
    const favorites = JSON.parse(window.localStorage.getItem('favorites')) || [];
    const favoriteIndex = isInFavorites(id);

    if (favoriteIndex !== -1) {
      favorites.splice(favoriteIndex, 1);
      setIsActive(false);
    } else {
      favorites.push(id);
      setIsActive(true);
    }

    window.localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [isInFavorites]);

  return (
    <ListItemGraphicStyled active={isActive ? 1 : 0} onClick={toggleInLocalstorage} data-id={algorithmId} graphic={<MaterialIcon icon="favorite" hasRipple />} />
  );
};

ListItemGraphic.propTypes = {
  algorithmId: string.isRequired,
};

export default ListItemGraphic;
