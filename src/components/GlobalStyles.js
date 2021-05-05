import { createStyles, makeStyles } from '@material-ui/core';

// const useStyles = makeStyles(() => createStyles({
//   '@global': {
//     '*': {
//       boxSizing: 'border-box',
//       margin: 0,
//       padding: 0,
//     },
//     html: {
//       '-webkit-font-smoothing': 'antialiased',
//       '-moz-osx-font-smoothing': 'grayscale',
//       height: '100%',
//       width: '100%'
//     },
//     body: {
//       backgroundColor: '#f4f6f8',
//       height: '100%',
//       width: '100%'
//     },
//     a: {
//       textDecoration: 'none'
//     },
//     '#root': {
//       height: '100%',
//       width: '100%'
//     }
//   }
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
