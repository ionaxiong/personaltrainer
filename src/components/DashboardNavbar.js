import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton, 
  Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <Hidden lgUp>
          <IconButton sx={{color: "white", marginRight: 2}} onClick={onMobileNavOpen}>
            <MenuIcon></MenuIcon>
          </IconButton>
        </Hidden>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardNavbar;
