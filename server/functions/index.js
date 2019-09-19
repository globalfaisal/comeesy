const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const { getJokes, getJoke, addJoke } = require('./handlers/jokes');
const {
  commentOnJoke,
  replyOnComment,
  getCommentReplies,
} = require('./handlers/comments');
const {
  login,
  signup,
  getUserOwnData,
  addUserDetails,
  uploadUserAvatar,
} = require('./handlers/users');

//  joke routes
app.get('/jokes', getJokes);
app.get('/joke/:jokeId', getJoke);
app.post('/joke', fbAuth, addJoke);
app.post('/joke/:jokeId/comment', fbAuth, commentOnJoke);
app.post('/joke/:jokeId/comment/:commentId', fbAuth, replyOnComment);
app.get('/joke/:jokeId/comment/:commentId/replies', getCommentReplies);
//TODO: delete joke route
//TODO: like a joke route
//TODO: unlike a joke route

// users routes
app.post('/signup', signup);
app.get('/login', login);

app.get('/user', fbAuth, getUserOwnData);
app.post('/user', fbAuth, addUserDetails);
app.post('/user/image', fbAuth, uploadUserAvatar);

// https://baseurl.com/api/{route}
exports.api = functions.region('europe-west1').https.onRequest(app);
