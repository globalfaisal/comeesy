const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const { getJokes, getJoke, postJoke } = require('./handlers/jokes');
const {
  login,
  signup,
  getUserOwnData,
  addUserOwnData,
  uploadUserAvatar,
} = require('./handlers/users');

//  joke routes
app.get('/jokes', getJokes);
app.get('/joke/:jokeId', getJoke);
app.post('/joke', fbAuth, postJoke);
//TODO: delete joke route
//TODO: like a joke route
//TODO: unlike a joke route
//TODO: comment on a joke route

// users routes
app.post('/signup', signup);
app.get('/login', login);

app.get('/user', fbAuth, getUserOwnData);
app.post('/user', fbAuth, addUserOwnData);
app.post('/user/image', fbAuth, uploadUserAvatar);

// https://baseurl.com/api/{route}
exports.api = functions.region('europe-west1').https.onRequest(app);
