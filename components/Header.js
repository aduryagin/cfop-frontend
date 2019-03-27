import List, { ListItem, ListItemText } from '@material/react-list';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useState, useCallback } from 'react';
import TopAppBar, {
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import '@material/react-list/dist/list.css';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';
import '@material/react-drawer/dist/drawer.css';


const DynamicDrawer = dynamic(() => import('@material/react-drawer'), {
  ssr: false,
  loading: () => null,
});

const Header = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const openDrawer = useCallback(() => { setDrawerIsOpen(true); }, []);
  const closeDrawer = useCallback(() => { setDrawerIsOpen(false); }, []);
  const goToSteps = useCallback(() => { Router.push('/'); closeDrawer(); }, [closeDrawer]);

  return (
    <>
      <TopAppBar className="top-app-bar">
        <TopAppBarRow>
          <TopAppBarSection align="start">
            <TopAppBarIcon navIcon tabIndex={0} className="hamburger">
              <MaterialIcon hasRipple icon="menu" onClick={openDrawer} />
            </TopAppBarIcon>
            <TopAppBarTitle>
          Fridrich CFOP
            </TopAppBarTitle>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <DynamicDrawer
        modal
        open={drawerIsOpen}
        onClose={closeDrawer}
      >
        <List>
          <ListItem onClick={goToSteps}>
            <ListItemText primaryText="Steps" />
          </ListItem>
          <ListItem>
            <ListItemText primaryText="Favorites" />
          </ListItem>
          <ListItem>
            <ListItemText primaryText="Links" />
          </ListItem>
          <ListItem>
            <ListItemText primaryText="Github" />
          </ListItem>
        </List>
      </DynamicDrawer>
      <style jsx global>
        {`
          .top-app-bar {
            background-color: #fff;
            color: #212121;
            border-bottom: 1px solid #E4E4E4;
          }

          .hamburger {
            color: #212121 !important;
          }
        `}
      </style>
    </>
  );
};

export default Header;
