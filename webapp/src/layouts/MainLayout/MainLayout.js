/* -- libs -- */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* -- routes -- */
import routes from '../../routes/routes';

/* -- components -- */
import Navbar from '../../components/Navbar';

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
    <div className="mainLayout">
      <Navbar />
      <main className="mainLayout-content">
        <Switch>{getRoutes(routes)}</Switch>
      </main>
    </div>
  );
};

export default MainLayout;
