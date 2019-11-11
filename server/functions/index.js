const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');
const fbAuth = require('./utils/fbAuth');

const { getPosts, getPost, addPost, deletePost } = require('./handlers/posts');
const { likePost, unlikePost } = require('./handlers/likes');
const { markNotificationsRead } = require('./handlers/notifications');

const {
  login,
  logout,
  signup,
<<<<<<< HEAD
  resendEmailVerification,
=======
  sendEmailVerification,
>>>>>>> 01df027b221af9430710483d3a51997c3f696a50
} = require('./handlers/auth');

const {
  getCommentReplies,
  commentOnPost,
  deleteComment,
  replyOnComment,
  deleteCommentReply,
} = require('./handlers/comments');

const {
  getUserData,
  getUserOwnData,
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

const { onUserAvatarChange, onNameChange } = require('./triggers/users');

/* Enable CORS */
//TODO: for Production change whitelist of allowed origin and pass to cors()

const allowedOrigins = [
  'http://localhost:3000',
  'https://europe-west1-comeesy.cloudfunctions.net',
];
const corsOptions = {
  origin: function(origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    console.log(origin);
    if (!origin) return callback(null, true);

    // allow whitelisted requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not 
        allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
};
//TODO: USER corsOptions to restrict Origins allowed
app.use(cors(corsOptions));

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

// auth routes
//TODO: add login options with google and facebook
app.post('/auth/signup', signup);
app.post('/auth/login', login);
app.get('/auth/logout', logout);
<<<<<<< HEAD
app.get('/auth/verifyEmail', fbAuth, resendEmailVerification);
=======
app.get('/auth/verifyEmail', fbAuth, sendEmailVerification);
>>>>>>> 01df027b221af9430710483d3a51997c3f696a50

// users routes
app.get('/user', fbAuth, getUserOwnData);
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

// Triggers when user's name is changed
exports.nameChangedTrigger = functions
  .region('europe-west1')
  .firestore.document('/users/{userId}')
  .onUpdate(onNameChange);
