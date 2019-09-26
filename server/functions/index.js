const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const {
  getScreams,
  getScream,
  addScream,
  deleteScream,
} = require('./handlers/screams');
const { likeScream, unlikeScream } = require('./handlers/likes');
const { markNotificationsRead } = require('./handlers/notifications');

const {
  getCommentReplies,
  commentOnScream,
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
const { onScreamDelete } = require('./triggers/screams');
const { onLikeCreate, onLikeDelete } = require('./triggers/likes');

const {
  onCommentCreate,
  onCommentDelete,
  onCommentReplyCreate,
  onCommentReplyDelete,
} = require('./triggers/comments');

const { onUserAvatarChange } = require('./triggers/users');

/* Setup all api routes */
//  Scream routes
app.get('/screams', getScreams);
app.get('/scream/:screamId', getScream);
app.post('/scream', fbAuth, addScream);
app.delete('/scream/:screamId', fbAuth, deleteScream);
//TODO: edit a scream route

// Comment routes
app.post('/scream/:screamId/comment', fbAuth, commentOnScream);
app.delete('/scream/:screamId/comment/:commentId', fbAuth, deleteComment);

// Comment reply routes
app.get('/scream/:screamId/comment/:commentId/replies', getCommentReplies);
app.post('/scream/:screamId/comment/:commentId/reply', fbAuth, replyOnComment);
app.delete(
  '/scream/:screamId/comment/:commentId/reply/:replyId',
  fbAuth,
  deleteCommentReply
);

app.post('/scream/:screamId/like', fbAuth, likeScream);
app.post('/scream/:screamId/unlike', fbAuth, unlikeScream);

// users routes
app.post('/signup', signup);
app.get('/login', login);
//TODO: add login options with google and facebook

app.get('/user', fbAuth, getCurrentUserData);
app.get('/user/:username', getUserData);
app.post('/user', fbAuth, addUserDetails);
app.post('/user/avatar', fbAuth, uploadUserAvatar);

// Notifications routes
app.post('/notifications/markRead', fbAuth, markNotificationsRead);

// Base API route ( https://baseurl.com/api/{route})
exports.api = functions.region('europe-west1').https.onRequest(app);

/* Setup all firestore(db) triggers */

// Triggers when scream is deleted
exports.screamDeleteTrigger = functions
  .region('europe-west1')
  .firestore.document('screams/{screamId}')
  .onDelete(onScreamDelete);

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

// Triggers scream comment is deleted
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
