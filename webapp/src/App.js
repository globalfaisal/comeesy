/* -- libs -- */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

/* -- styles -- */
import './App.scss';

/* -- layouts -- */
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

const App = () => (
  <div>
    <Switch>
      <Route
        exact
        path="/auth/:page"
        render={props => <AuthLayout {...props} />}
      />
      <Route exact path="/:page" render={props => <MainLayout {...props} />} />
      <Route exact path="/" render={props => <MainLayout {...props} />} />
    </Switch>
  </div>
);

export default App;
