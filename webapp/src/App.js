/* -- libs -- */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

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
import { checkTokenStatus } from './utils/helpers/checkTokenStatus';

const App = () => {
  const dispatch = useDispatch();
  const { token } = window.localStorage;

  useEffect(() => {
    const { expired } = checkTokenStatus(token);
    if (expired === true) {
      dispatch(logout());
    } else if (expired === false) {
      dispatch(getUserData(token));
    }
  });

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
