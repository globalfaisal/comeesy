const functions = require('firebase-functions');

// Get all actions to perform
const { deleteJokeNotification } = require('./actions/jokes');
const {
  createLikeNotification,
  deleteLikeNotification,
} = require('./actions/likes');

const {
  createCommentNotification,
  deleteCommentNotification,
  createCommentReplyNotifications,
  deleteCommentReplyNotifications,
} = require('./actions/comments');

const { changeUserAvatarReferences } = require('./actions/users');

// Triggers when joke is deleted
exports.onJokeDelete = functions
  .region('europe-west1')
  .firestore.document('jokes/{jokeId}')
  .onDelete(deleteJokeNotification);

// Triggers when like is created
exports.onLikeCreate = functions
  .region('europe-west1')
  .firestore.document('likes/{likeId}')
  .onCreate(createLikeNotification);

// Triggers when like is deleted
exports.onLikeDelete = functions
  .region('europe-west1')
  .firestore.document('likes/{likeId}')
  .onDelete(deleteLikeNotification);

// Triggers when comment is created
exports.onCommentCreate = functions
  .region('europe-west1')
  .firestore.document('comments/{commentId}')
  .onCreate(createCommentNotification);

// Triggers joke comment is deleted
exports.onCommentDelete = functions
  .region('europe-west1')
  .firestore.document('comments/{commentId}')
  .onDelete(deleteCommentNotification);

// Triggers when comment reply is created
exports.onCommentReplyCreate = functions
  .region('europe-west1')
  .firestore.document('replies/{replyId}')
  .onCreate(createCommentReplyNotifications);

// Triggers when comment reply is deleted
exports.onCommentReplyDelete = functions
  .region('europe-west1')
  .firestore.document('replies/{replyId}')
  .onDelete(deleteCommentReplyNotifications);

// Triggers when user image (avatar) is changed
exports.onUserAvatarChanges = functions
  .region('europe-west1')
  .firestore.document('/users/{userId}')
  .onUpdate(changeUserAvatarReferences);
