import { useCallback, useState } from 'react';
import { NextFunctionComponent } from 'next';
import FavoriteIcon from './components/FavoriteIcon';
import { ListItemGraphicStyled } from './style';

type ListItemGraphicProps = { algorithmId: number }

const ListItemGraphic: NextFunctionComponent<ListItemGraphicProps> = ({ algorithmId }) => {
  const isInFavorites = useCallback((id) => {
    const favoritesInLocalStorage: string = window.localStorage.getItem('favorites') || '[]';
    const favorites = JSON.parse(favoritesInLocalStorage) || [];
    const favoriteIndex = favorites.indexOf(id.toString());

    return favoriteIndex;
  }, []);

  const [isActive, setIsActive] = useState(isInFavorites(algorithmId) !== -1);

  const toggleInLocalstorage = useCallback((event) => {
    const { id } = event.currentTarget.dataset;
    const favoritesInLocalStorage: string = window.localStorage.getItem('favorites') || '[]';
    const favorites = JSON.parse(favoritesInLocalStorage) || [];
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
    <ListItemGraphicStyled active={isActive ? 1 : 0} onClick={toggleInLocalstorage} graphic={<FavoriteIcon id={algorithmId} />} />
  );
};

export default ListItemGraphic;
