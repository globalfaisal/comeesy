/* -- libs -- */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

/* -- layouts -- */
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import MainLayout from './layouts/MainLayout/MainLayout';

/* -- actions -- */
import { getUserOwnData } from './actions/userActions';
import { closeModal } from './actions/UIActions';

/* -- utils -- */
import getTheme from './utils/theme/theme';

/* -- mui -- */
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Get user data
    dispatch(getUserOwnData());
    // 2. Hide login modal at the start of the app
    const timer = window.setTimeout(() => {
      dispatch(closeModal());
    }, 200);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = getTheme();
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/auth/signup" render={p => <AuthLayout {...p} />} />
        <Route exact path="/auth/login" render={p => <AuthLayout {...p} />} />
        <Route path="/" render={p => <MainLayout {...p} />} />
      </Switch>
    </MuiThemeProvider>
  );
};

export default App;
