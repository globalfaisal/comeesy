/* -- libs -- */
import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

/* -- routes -- */
import routes from '../../routes/routes';
import history from '../../utils/history/history';

/* -- mui -- */
import { makeStyles } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/* -- image -- */
import loginSketchSrc from '../../asset/images/sketch-login.svg';

/* -- styles -- */
import './AuthLayout.scss';

const useStyle = makeStyles(theme => ({
  gridContainer: {
    margin: 'auto',
    maxWidth: 1280,
  },
  card: {
    display: 'flex',
    width: '100%',
    height: 580,
    // minHeight: 480,
    borderRadius: 0,
  },
  contentLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    background: theme.palette.colors.white,
  },
  media: {
    width: '80%',
  },
  contentRight: {
    flex: 1,
    background: theme.palette.colors.whitesmoke,
    color: theme.palette.colors.dark,
  },

  tab: {
    color: theme.palette.colors.lightsteelblue,
    borderBottom: `2px solid ${theme.palette.colors.lightsteelblue}`,
  },
}));
/* -- styles -- */

const AuthLayout = props => {
  const classes = useStyle();

  const [selectedTab, setSelectedTab] = useState(0);

  const { location } = history;
  useEffect(() => {
    if (location.pathname === '/auth/signup') setSelectedTab(0);
    else if (location.pathname === '/auth/login') setSelectedTab(1);
  }, [location.pathname]);

  const getRoutes = appRoutes =>
    appRoutes.map((route, idx) => {
      if (route.layout === '/auth') {
        return (
          <Route
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
    <div className="authLayout">
      <main className="authLayout-content">
        <Grid container spacing={10} className={classes.gridContainer}>
          <Grid item>
            <Card className={classes.card}>
              <Hidden smDown>
                <CardContent className={classes.contentLeft}>
                  <CardMedia
                    component="img"
                    src={loginSketchSrc}
                    className={classes.media}
                  />
                </CardContent>
              </Hidden>
              <CardContent className={classes.contentRight}>
                <Container>
                  <Tabs
                    value={selectedTab}
                    indicatorColor="primary"
                    textColor="primary"
                    component="nav"
                    variant="fullWidth"
                  >
                    <Tab
                      component={Link}
                      to="/auth/signup"
                      label="Sign Up"
                      disableRipple
                      classes={{ root: classes.tab }}
                    />
                    <Tab
                      component={Link}
                      to="/auth/login"
                      label="Login"
                      disableRipple
                      classes={{ root: classes.tab }}
                    />
                  </Tabs>
                  {/* Render pages here. */}
                  <Switch>{getRoutes(routes)}</Switch>
                </Container>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default AuthLayout;
