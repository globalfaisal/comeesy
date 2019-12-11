/* -- libs -- */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExploreIcon from '@material-ui/icons/ExploreOutlined';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  navLink: {
    margin: theme.spacing(1),
  },
}));

const PublicNavLinks = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Button
        component={Link}
        to="/"
        size="small"
        color="inherit"
        startIcon={<ExploreIcon />}
        className={classes.navLink}
      >
        Explore
      </Button>
      <Button
        component={Link}
        to="/auth/login"
        variant="contained"
        color="primary"
        size="small"
        className={classes.navLink}
      >
        Log in / Sign up
      </Button>
    </Fragment>
  );
};

export default PublicNavLinks;
