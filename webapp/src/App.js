/* -- libs -- */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

/* -- layouts -- */
import MainLayout from './layouts/MainLayout/MainLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

/* -- mui -- */
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

/* -- utils -- */
import getTheme from './utils/theme/theme';

const App = props => {
  const theme = getTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/auth/:page" render={p => <AuthLayout {...p} />} />
        <Route exact path="/:page" render={p => <MainLayout {...p} />} />
        <Route exact path="/" render={p => <MainLayout {...p} />} />
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
