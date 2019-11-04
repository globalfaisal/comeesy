/* -- libs -- */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

/* -- layouts -- */
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import MainLayout from './layouts/MainLayout/MainLayout';

/* -- mui -- */
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

/* -- actions -- */
import { logout, getUserOwnData } from './actions/userActions';

/* -- utils -- */
import getTheme from './utils/theme/theme';
import verifyIdToken from './utils/helpers/verifyIdToken';

const App = () => {
  const dispatch = useDispatch();
  const { token } = window.localStorage;

  useEffect(() => {
    const valid = verifyIdToken(token);
    if (valid) dispatch(getUserOwnData(token));
    else if (!valid) dispatch(logout());
  }, [dispatch, token]);

  const theme = getTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/auth/:page" render={p => <AuthLayout {...p} />} />
        <Route exact path="/u/:username" render={p => <MainLayout {...p} />} />
        <Route
          exact
          path="/u/:username/:page"
          render={p => <MainLayout {...p} />}
        />
        <Route path="/" render={p => <MainLayout {...p} />} />
        <Redirect from="*" to="/" />
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
