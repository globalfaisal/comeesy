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
import { getUserOwnData } from './actions/userActions';

/* -- utils -- */
import getTheme from './utils/theme/theme';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOwnData());
  });

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
