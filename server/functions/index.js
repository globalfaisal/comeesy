const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const { getAllJokes, postAJoke } = require('./handlers/jokes');
const {
  login,
  signup,
  getUserOwnData,
  addUserOwnData,
  uploadUserAvatar,
} = require('./handlers/users');

//  joke routes
app.get('/jokes', getAllJokes);
app.post('/joke', fbAuth, postAJoke);

// users routes
app.post('/signup', signup);
app.get('/login', login);
app.get('/user', fbAuth, getUserOwnData);
app.post('/user', fbAuth, addUserOwnData);
app.post('/user/image', fbAuth, uploadUserAvatar);

// https://baseurl.com/api/{route}
exports.api = functions.region('europe-west1').https.onRequest(app);
