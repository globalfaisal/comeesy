/* -- libs -- */
import React, { useState, useEffect, Fragment } from 'react';
import { Switch, Link } from 'react-router-dom';

/* -- routes -- */
import routes from '../../routes/routes';
import AuthRoute from '../../routes/AuthRoute';

/* -- utils -- */
import history from '../../utils/history';

/* -- mui -- */
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/* -- components -- */
import Logo from '../../components/UI/Logo';
import SnackAlert from '../../components/UI/SnackAlert';

/* -- styles -- */
import useStyles from './styles';

const AuthLayout = props => {
  const classes = useStyles();

  const [selectedTab, setSelectedTab] = useState(0);

  const { location } = history;
  useEffect(() => {
    if (location.pathname === '/auth/login') setSelectedTab(0);
    if (location.pathname === '/auth/signup') setSelectedTab(1);
  }, [location.pathname]);

  const getRoutes = appRoutes =>
    appRoutes.map((route, idx) => {
      if (route.layout === '/auth') {
        return (
          <AuthRoute
            exact
            path={route.layout + route.path}
            component={route.component}
            key={idx}
          />
        );
      }
      return null;
    });
  return (
    <main className={classes.authLayout}>
      <Grid container className={classes.grid}>
        <Card className={classes.card} elevation={10}>
          <Hidden xsDown>
            <Grid item sm={6} className={classes.gridLeft} />
          </Hidden>
          <Grid item xs={12} sm={6} className={classes.gridRight}>
            <CardContent className={classes.cardContent}>
              <Link to="/" className={classes.logoWrapper}>
                <Logo variant="black" title="Back to home" />
              </Link>
              <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                component="nav"
                variant="standard"
              >
                <Tab
                  component={Link}
                  to="/auth/login"
                  label="Log In"
                  disableRipple
                  classes={{ root: classes.tab }}
                />
                <Tab
                  component={Link}
                  to="/auth/signup"
                  label="Sign Up"
                  disableRipple
                  classes={{ root: classes.tab }}
                />
              </Tabs>
              <div role="tabpanel" className={classes.tabPanel}>
                {/* Render pages here. */}
                <Switch>{getRoutes(routes)}</Switch>
              </div>
            </CardContent>
          </Grid>
        </Card>
      </Grid>
      <SnackAlert />
    </main>
  );
};

export default AuthLayout;
