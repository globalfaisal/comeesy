const functions = require('firebase-functions');
const app = require('express')();

const fbAuth = require('./utils/fbAuth');

const { getPosts, getPost, addPost, deletePost } = require('./handlers/posts');
const { likePost, unlikePost } = require('./handlers/likes');
const { markNotificationsRead } = require('./handlers/notifications');

const {
  getCommentReplies,
  commentOnPost,
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
const { onPostDelete } = require('./triggers/posts');
const { onLikeCreate, onLikeDelete } = require('./triggers/likes');

const {
  onCommentCreate,
  onCommentDelete,
  onCommentReplyCreate,
  onCommentReplyDelete,
} = require('./triggers/comments');

const { onUserAvatarChange } = require('./triggers/users');

/* Setup all api routes */

// Post routes
app.get('/posts', getPosts);
app.get('/post/:postId', getPost);
app.post('/post', fbAuth, addPost);
app.delete('/post/:postId', fbAuth, deletePost);
//TODO: edit a post route

// Comment routes
app.post('/post/:postId/comment', fbAuth, commentOnPost);
app.delete('/post/:postId/comment/:commentId', fbAuth, deleteComment);

// Comment reply routes
app.get('/post/:postId/comment/:commentId/replies', getCommentReplies);
app.post('/post/:postId/comment/:commentId/reply', fbAuth, replyOnComment);
app.delete(
  '/post/:postId/comment/:commentId/reply/:replyId',
  fbAuth,
  deleteCommentReply
);

app.post('/post/:postId/like', fbAuth, likePost);
app.post('/post/:postId/unlike', fbAuth, unlikePost);

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

// Triggers when post is deleted
exports.postDeleteTrigger = functions
  .region('europe-west1')
  .firestore.document('posts/{postId}')
  .onDelete(onPostDelete);

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

// Triggers post comment is deleted
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
