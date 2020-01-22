/* -- libs -- */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import * as serviceWorker from './serviceWorker';
import { fbConfig } from './config';
import store from './store';
import history from './utils/history';

/* -- components -- */
import App from './App';

/* -- styles -- */
import './index.css';

// Initialize firebase instance
firebase.initializeApp(fbConfig);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
