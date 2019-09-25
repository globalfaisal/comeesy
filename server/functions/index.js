const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const { getJokes, getJoke, addJoke, deleteJoke } = require('./handlers/jokes');
const { likeJoke, unlikeJoke } = require('./handlers/likes');
const { markNotificationsRead } = require('./handlers/notifications');

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

// Get all db trigger handlers
const { onJokeDelete } = require('./triggers/jokes');
const { onLikeCreate, onLikeDelete } = require('./triggers/likes');

const {
  onCommentCreate,
  onCommentDelete,
  onCommentReplyCreate,
  onCommentReplyDelete,
} = require('./triggers/comments');

const { onUserAvatarChange } = require('./triggers/users');

/* Setup all api routes */
//  Joke routes
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

// Notifications routes
app.post('/notifications/markRead', fbAuth, markNotificationsRead);

// Base API route ( https://baseurl.com/api/{route})
exports.api = functions.region('europe-west1').https.onRequest(app);

/* Setup all firestore(db) triggers */

// Triggers when joke is deleted
exports.jokeDeleteTrigger = functions
  .region('europe-west1')
  .firestore.document('jokes/{jokeId}')
  .onDelete(onJokeDelete);

// Triggers when like is created
exports.likeCreateTrigger = functions
  .region('europe-west1')
  .firestore.document('likes/{likeId}')
  .onCreate(onLikeCreate);

// Triggers when like is deleted
exports.likeDeleteTrigger = functions
  .region('europe-west1')
  .firestore.document('likes/{likeId}')
  .onDelete(onLikeDelete);

// Triggers when comment is created
exports.commentCreateTrigger = functions
  .region('europe-west1')
  .firestore.document('comments/{commentId}')
  .onCreate(onCommentCreate);

// Triggers joke comment is deleted
exports.commentDeleteTrigger = functions
  .region('europe-west1')
  .firestore.document('comments/{commentId}')
  .onDelete(onCommentDelete);

// Triggers when comment reply is created
exports.commentReplyCreateTrigger = functions
  .region('europe-west1')
  .firestore.document('replies/{replyId}')
  .onCreate(onCommentReplyCreate);

// Triggers when comment reply is deleted
exports.commentReplyDeleteTrigger = functions
  .region('europe-west1')
  .firestore.document('replies/{replyId}')
  .onDelete(onCommentReplyDelete);

// Triggers when user image (avatar) is changed
exports.userAvatarChangeTrigger = functions
  .region('europe-west1')
  .firestore.document('/users/{userId}')
  .onUpdate(onUserAvatarChange);
