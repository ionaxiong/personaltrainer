import {React, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@material-ui/core';
import {
  Users as UsersIcon,
  Heart as TrainingIcon,
  Calendar as CalendarIcon,
  BarChart2 as StatisticsIcon
} from 'react-feather';
import NavItem from './NavItem';


const items = [
  {
    href: '/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/trainings',
    icon: TrainingIcon,
    title: 'Trainings'
  },
  {
    href: '/calendar',
    icon: CalendarIcon,
    title: 'Calendar'
  },
  {
    href: '/statistics',
    icon: StatisticsIcon,
    title: 'Statistics'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          m: 1,
          p: 1,
        }}
      >
        <Typography sx={{
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          fontSize: "0.875rem",
          color: "#6b778c"
        }}>
          Copyright © 2021 Ming Xiong
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
