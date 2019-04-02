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
import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-drawer/dist/drawer.css';
import TopAppBarStyled from './styled/TopAppBarStyled';
import TopAppBarIconStyled from './styled/TopAppBarIconStyled';

const DrawerDynamic = dynamic(() => import('@material/react-drawer'), {
  ssr: false,
  loading: () => null,
});

const useDrawer = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = useCallback(() => { setDrawerIsOpen(true); }, []);
  const closeDrawer = useCallback(() => { setDrawerIsOpen(false); }, []);

  return [drawerIsOpen, openDrawer, closeDrawer];
};

const Header = () => {
  const [drawerIsOpen, openDrawer, closeDrawer] = useDrawer();
  const goToSteps = useCallback(() => { Router.push('/'); closeDrawer(); }, [closeDrawer]);
  const goToFavorites = useCallback(() => { Router.push('/favorites'); closeDrawer(); }, [closeDrawer]);

  return (
    <>
      <TopAppBarStyled>
        <TopAppBarRow>
          <TopAppBarSection align="start">
            <TopAppBarIconStyled navIcon tabIndex={0}>
              <MaterialIcon hasRipple icon="menu" onClick={openDrawer} />
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
          <ListItem>
            <ListItemText primaryText="Links" />
          </ListItem>
          <ListItem>
            <ListItemText primaryText="Github" />
          </ListItem>
        </List>
      </DrawerDynamic>
    </>
  );
};

export default Header;
