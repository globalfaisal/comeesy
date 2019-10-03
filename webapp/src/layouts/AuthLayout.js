import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../routes/routes';

const AuthLayout = props => {
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
        <Switch>{getRoutes(routes)}</Switch>
      </main>
    </div>
  );
};

export default AuthLayout;
