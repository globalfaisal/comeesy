/* -- libs -- */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* -- routes -- */
import routes from '../../routes/routes';

/* -- components -- */
import Navbar from '../../components/Header/Navbar';

/* -- styles -- */
import './MainLayout.scss';

const MainLayout = () => {
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
      <Navbar />
      <main className="content">
        <Switch>{getRoutes(routes)}</Switch>
      </main>
    </div>
  );
};

export default MainLayout;
