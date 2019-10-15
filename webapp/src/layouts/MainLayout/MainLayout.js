/* -- libs -- */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* -- routes -- */
import routes from '../../routes/routes';

/* -- components -- */
import Navbar from '../../components/Header/Navbar';
import ProtectedRoute from '../../routes/ProtectedRoute';

import { makeStyles } from '@material-ui/core/styles';
/* -- styles -- */
const useStyles = makeStyles(theme => ({
  mainLayoutWrapper: {
    marginTop: theme.spacing(6) + 2, // --> 50px
  },
}));

const MainLayout = () => {
  const classes = useStyles();

  const getRoutes = appRoutes =>
    appRoutes.map((route, idx) => {
      if (route.protected && route.layout === '/main') {
        return (
          <ProtectedRoute
            exact
            path={route.path}
            component={route.component}
            key={idx}
          />
        );
      }
      if (route.layout === '/main') {
        return (
          <Route
            exact
            path={route.path}
            component={route.component}
            key={idx}
          />
        );
      }
      return null;
    });

  return (
    <div className={classes.mainLayoutWrapper}>
      <Navbar />
      <main>
        <Switch>{getRoutes(routes)}</Switch>
      </main>
    </div>
  );
};

export default MainLayout;
