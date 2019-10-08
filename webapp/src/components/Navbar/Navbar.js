/* -- libs -- */
import React from 'react';
import Link from 'react-router-dom/Link';

/* -- logo -- */
import logo from '../../asset/images/logo.svg';

/* -- custom hooks -- */
import useDarkTheme from '../../hooks/useDarkTheme';

/* -- mui -- */
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Brightness2Icon from '@material-ui/icons/Brightness2';

const useStyles = makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.colors.black,
  },
  brand: {
    width: 24,
    height: 24,
    '& img': {
      height: '100%',
    },
  },
  grow: {
    flexGrow: 1,
  },
  navMenu: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  navLink: {
    margin: theme.spacing(1),
    color: theme.palette.colors.greylight,
  },
  btnDarkOn: {
    color: theme.palette.secondary.greylight,
  },
  btnDarkOff: {
    color: theme.palette.colors.grey,
  },
}));

const Navbar = props => {
  const classes = useStyles();
  const { isDarkTheme, onToggle } = useDarkTheme();

  return (
    <AppBar className={classes.appBar}>
      <Toolbar variant="dense">
        <div className={classes.brand}>
          <Link to="/">
            <img src={logo} alt="comeesy logo" />
          </Link>
        </div>
        <div className={classes.grow} />
        <IconButton
          onClick={onToggle}
          className={`${isDarkTheme ? classes.btnDarkOn : classes.btnDarkOff}`}
          aria-label="toggle-dark-mode"
          size="small"
        >
          <Brightness2Icon />
        </IconButton>
        <nav className={classes.navMenu}>
          <Button
            component={Link}
            to="/auth/login"
            size="small"
            className={classes.navLink}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/auth/signup"
            variant="contained"
            color="primary"
            size="small"
            className={classes.navLink}
          >
            Sign Up
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
