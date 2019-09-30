import React from 'react';
import { Switch, Route } from 'react-router-dom';

import routes from '../routes/routes';

const MainLayout = props => {
  const getRoutes = appRoutes =>
    appRoutes.map((route, idx) => {
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
    <div className="main-layout">
      <main className="content">
        <Switch>{getRoutes(routes)}</Switch>
      </main>
    </div>
  );
};

export default MainLayout;
