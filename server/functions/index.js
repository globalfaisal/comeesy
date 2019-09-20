const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const { getJokes, getJoke, addJoke } = require('./handlers/jokes');
const { likeJoke, unlikeJoke } = require('./handlers/likes');
const {
  commentOnJoke,
  deleteComment,
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
//TODO: delete a joke route (also delete all related comments and replies and likes from the db)
//TODO: edit a joke route

app.post('/joke/:jokeId/comment', fbAuth, commentOnJoke);
app.delete('/joke/:jokeId/comment/:commentId', fbAuth, deleteComment);
app.post('/joke/:jokeId/comment/:commentId', fbAuth, replyOnComment);
app.get('/joke/:jokeId/comment/:commentId/replies', getCommentReplies);
//TODO: delete a comment route (also update commentCount field in the joke)
//TODO: delete a comment reply (also update replyCount field in comments)

app.post('/joke/:jokeId/like', fbAuth, likeJoke);
app.post('/joke/:jokeId/unlike', fbAuth, unlikeJoke);

// users routes
app.post('/signup', signup);
app.get('/login', login);
//TODO: add login options with google and facebook

app.get('/user', fbAuth, getUserOwnData);
app.post('/user', fbAuth, addUserDetails);
app.post('/user/image', fbAuth, uploadUserAvatar);

// https://baseurl.com/api/{route}
exports.api = functions.region('europe-west1').https.onRequest(app);
