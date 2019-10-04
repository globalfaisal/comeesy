/* -- libs -- */
import React from 'react';
import Link from 'react-router-dom/Link';
import clsx from 'clsx';

/* -- logo -- */
import logo from '../asset/images/logo.svg';

/* -- components -- */
import DarkModeToggler from './DarkModeToggler';

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
    // border: '1px solid red',
  },
  navLink: {
    fontWeight: 200,
    textTransform: 'capitalize',
    color: theme.palette.colors.grey.main,
    '&:hover': {
      background: 'transparent',
    },
  },
  btnDark: {
    marginRight: theme.spacing(1),
  },
  btnDarkOn: {
    color: theme.palette.secondary.dark,
  },
  btnDarkOff: {
    color: theme.palette.colors.grey.dark,
  },
}));

const Navbar = props => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appBar}>
      <Toolbar variant="dense">
        <div className={classes.brand}>
          <Link to="/">
            <img src={logo} alt="comeesy logo" />
          </Link>
        </div>
        <div className={classes.grow} />
        <DarkModeToggler>
          {(isOn, onToggle) => (
            <IconButton
              onClick={onToggle}
              className={clsx(
                classes.btnDark,
                `${isOn ? classes.btnDarkOn : classes.btnDarkOff}`
              )}
              size="small"
              aria-label="toggle-dark-mode"
            >
              <Brightness2Icon />
            </IconButton>
          )}
        </DarkModeToggler>

        <nav className={classes.navMenu}>
          <Button component={Link} to="/auth/login" className={classes.navLink}>
            Login
          </Button>
          <Button
            component={Link}
            to="/auth/signup"
            className={classes.navLink}
          >
            Signup
          </Button>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
