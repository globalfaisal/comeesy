/* -- libs -- */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

/* -- layouts -- */
import MainLayout from './layouts/MainLayout/MainLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

/* -- mui -- */
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

/* -- actions -- */
import { logout, getUserData } from './actions/userActions';

/* -- utils -- */
import getTheme from './utils/theme/theme';
import verifyIdToken from './utils/helpers/verifyIdToken';

const App = () => {
  const dispatch = useDispatch();
  const { token } = window.localStorage;

  useEffect(() => {
    const valid = verifyIdToken(token);
    if (valid) dispatch(getUserData(token));
    else if (!valid) dispatch(logout());
  });

  const theme = getTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/auth/:page" render={p => <AuthLayout {...p} />} />
        <Route exact path="/u/:page" render={p => <MainLayout {...p} />} />
        <Route exact path="/" render={p => <MainLayout {...p} />} />
        <Redirect from="*" to="/" />
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
