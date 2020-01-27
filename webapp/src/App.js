/* -- libs -- */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import firebase from './firebase';

/* -- actions -- */
import { userAuthSuccess, userAuthFailed } from './actions/userActions';

/* -- layouts -- */
import AuthLayout from './layouts/AuthLayout/AuthLayout';
import MainLayout from './layouts/MainLayout/MainLayout';

/* -- utils -- */
import getTheme from './utils/theme/theme';

/* -- mui -- */
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const App = () => {
  const theme = getTheme();
  const dispatch = useDispatch();

  // Observe user auth state changes,
  // Invokes action creator based on the state change.
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in.
      user.getIdToken().then(token => dispatch(userAuthSuccess(token)));
    } else {
      // No user is signed in.
      dispatch(userAuthFailed(null));
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch>
        <Route exact path="/auth/signup" render={p => <AuthLayout {...p} />} />
        <Route exact path="/auth/login" render={p => <AuthLayout {...p} />} />
        <Route path="/" render={p => <MainLayout {...p} />} />
      </Switch>
    </ThemeProvider>
  );
};

export default App;
