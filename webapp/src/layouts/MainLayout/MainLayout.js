/* -- libs -- */
import React, { Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* -- routes -- */
import routes from '../../routes/routes';

/* -- components -- */
import Navbar from '../../components/Navbar/Navbar';
import ProtectedRoute from '../../routes/ProtectedRoute';
import SnackAlert from '../../components/UI/SnackAlert';
import Modal from '../../components/UI/Modal';
import ScrollHandler from '../../components/ScrollHandler/ScrollHandler';

/* -- styles -- */
import useStyles from './styles';

const MainLayout = props => {
  const classes = useStyles();
  const getRoutes = appRoutes =>
    appRoutes.map((route, idx) => {
      if (route.protected && route.layout === '/main') {
        return (
          <ProtectedRoute
            {...props}
            exact
            path={route.path}
            component={route.component}
            key={idx}
          />
        );
      }
      if (!route.protected && route.layout === '/main') {
        return (
          <Route
            {...props}
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
    <Fragment>
      <Navbar />
      <main className={classes.main}>
        <Switch>
          {getRoutes(routes)}
          <Redirect to="/404" />
        </Switch>
        <ScrollHandler />
        <SnackAlert />
        <Modal />
      </main>
    </Fragment>
  );
};

export default MainLayout;
