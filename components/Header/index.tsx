import List, { ListItem, ListItemText } from '@material/react-list';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useState, useCallback } from 'react';
import {
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import '@material/react-list/dist/list.css';
import '@material/react-drawer/dist/drawer.css';
import MenuIcon from './components/MenuIcon';
import { TopAppBarStyled, TopAppBarIconStyled } from './style';

const DrawerDynamic = dynamic(() => import('@material/react-drawer'), {
  ssr: false,
  loading: () => null,
});

const useDrawer = (): [boolean, (event?: any) => void, (event?: any) => void] => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = useCallback(() => { setDrawerIsOpen(true); }, []);
  const closeDrawer = useCallback(() => { setDrawerIsOpen(false); }, []);

  return [drawerIsOpen, openDrawer, closeDrawer];
};

const Header = () => {
  const [drawerIsOpen, openDrawer, closeDrawer] = useDrawer();
  const goToSteps = useCallback(() => { Router.push('/'); closeDrawer(); }, [closeDrawer]);
  const goToFavorites = useCallback(() => { Router.push('/favorites'); closeDrawer(); }, [closeDrawer]);
  const goToLinks = useCallback(() => { Router.push('/links'); closeDrawer(); }, [closeDrawer]);
  const goToGithub = useCallback(() => { Router.push('/github'); closeDrawer(); }, [closeDrawer]);

  return (
    <>
      <TopAppBarStyled>
        <TopAppBarRow>
          <TopAppBarSection align="start">
            <TopAppBarIconStyled navIcon tabIndex={0}>
              <MenuIcon onClick={openDrawer} />
            </TopAppBarIconStyled>
            <TopAppBarTitle>
          Fridrich CFOP
            </TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBarStyled>
      <DrawerDynamic
        modal
        open={drawerIsOpen}
        onClose={closeDrawer}
      >
        <List>
          <ListItem onClick={goToSteps}>
            <ListItemText primaryText="Steps" />
          </ListItem>
          <ListItem onClick={goToFavorites}>
            <ListItemText primaryText="Favorites" />
          </ListItem>
          <ListItem onClick={goToLinks}>
            <ListItemText primaryText="Links" />
          </ListItem>
          <ListItem onClick={goToGithub}>
            <ListItemText primaryText="Github" />
          </ListItem>
        </List>
      </DrawerDynamic>
    </>
  );
};

export default Header;
