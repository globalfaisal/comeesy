const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const { getJokes, getJoke, addJoke, deleteJoke } = require('./handlers/jokes');
const { likeJoke, unlikeJoke } = require('./handlers/likes');

const {
  getCommentReplies,
  commentOnJoke,
  deleteComment,
  replyOnComment,
  deleteCommentReply,
} = require('./handlers/comments');

const {
  login,
  signup,
  getUserData,
  getCurrentUserData,
  addUserDetails,
  uploadUserAvatar,
} = require('./handlers/users');

const {
  createNotificationOnLike,
  deleteNotificationOnUnLike,
  createNotificationOnComment,
  deleteNotificationOnCommentDelete,
  createNotificationOnCommentReply,
  deleteNotificationOnCommentReplyDelete,
} = require('./triggers/notifications');

//  joke routes
app.get('/jokes', getJokes);
app.get('/joke/:jokeId', getJoke);
app.post('/joke', fbAuth, addJoke);
app.delete('/joke/:jokeId', fbAuth, deleteJoke);
//TODO: edit a joke route

// Comment routes
app.post('/joke/:jokeId/comment', fbAuth, commentOnJoke);
app.delete('/joke/:jokeId/comment/:commentId', fbAuth, deleteComment);

// Comment reply routes
app.get('/joke/:jokeId/comment/:commentId/replies', getCommentReplies);
app.post('/joke/:jokeId/comment/:commentId/reply', fbAuth, replyOnComment);
app.delete(
  '/joke/:jokeId/comment/:commentId/reply/:replyId',
  fbAuth,
  deleteCommentReply
);

app.post('/joke/:jokeId/like', fbAuth, likeJoke);
app.post('/joke/:jokeId/unlike', fbAuth, unlikeJoke);

// users routes
app.post('/signup', signup);
app.get('/login', login);
//TODO: add login options with google and facebook

app.get('/user', fbAuth, getCurrentUserData);
app.get('/user/:username', getUserData);
app.post('/user', fbAuth, addUserDetails);
app.post('/user/image', fbAuth, uploadUserAvatar);

// DB triggers
exports.createNotificationOnLike = createNotificationOnLike;
exports.deleteNotificationOnUnLike = deleteNotificationOnUnLike;

exports.createNotificationOnComment = createNotificationOnComment;
exports.deleteNotificationOnCommentDelete = deleteNotificationOnCommentDelete;

exports.createNotificationOnCommentReply = createNotificationOnCommentReply;
exports.deleteNotificationOnCommentReplyDelete = deleteNotificationOnCommentReplyDelete;

// https://baseurl.com/api/{route}
exports.api = functions.region('europe-west1').https.onRequest(app);
