/* -- libs -- */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* -- layouts -- */
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

/* -- mui -- */
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

/* -- utils -- */
import { createTheme } from './utils/theme/theme';

/* -- styles -- */
import './App.scss';

const App = () => {
  const theme = createTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route
          exact
          path="/auth/:page"
          render={props => <AuthLayout {...props} />}
        />
        <Route
          exact
          path="/:page"
          render={props => <MainLayout {...props} />}
        />
        <Route exact path="/" render={props => <MainLayout {...props} />} />
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
