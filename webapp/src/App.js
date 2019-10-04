/* -- libs -- */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

/* -- actions -- */
import { setDefaultTheme } from './actions/layoutActions';
/* -- layouts -- */
import MainLayout from './layouts/MainLayout/MainLayout';
import AuthLayout from './layouts/AuthLayout/AuthLayout';

/* -- mui -- */
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

/* -- utils -- */
import { createTheme } from './utils/theme/theme';

/* -- styles -- */
import './App.scss';

const App = props => {
  // dispatch action creators
  const dispatch = useDispatch();

  // set app default theme based on user preference
  useEffect(() => {
    dispatch(setDefaultTheme());
  }, []);

  const theme = createTheme();
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
