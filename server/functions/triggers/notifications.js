const functions = require('firebase-functions');
const { db } = require('../utils/admin');

// Create notification when new like is added to the db.
exports.createNotificationOnLike = functions
  .region('europe-west1')
  .firestore.document('likes/{likeId}')
  .onCreate(async snapshot => {
    try {
      // Get the joke that's been liked
      const jokeRef = await db.doc(`/jokes/${snapshot.data().jokeId}`).get();
      // Skip creating notification if sender and receiver are same user
      if (
        jokeRef.exists &&
        snapshot.data().user.username !== jokeRef.data().user.username
      ) {
        // Create notification
        return db
          .doc(
            `/notifications/like_${snapshot.id}_${jokeRef.data().user.username}`
          )
          .set({
            notificationId: `like_${snapshot.id}_${
              jokeRef.data().user.username
            }`,
            sender: snapshot.data().user,
            recipient: jokeRef.data().user.username,
            jokeId: jokeRef.data().jokeId,
            createdAt: new Date().toISOString(),
            type: 'like',
            read: false,
          })
          .then(() => console.log('Like notification created successfully'));
      }
    } catch (err) {
      console.error('Error while creating like notification ', err);
    }
  });

// Delete notification when joke is unliked
exports.deleteNotificationOnUnLike = functions
  .region('europe-west1')
  .firestore.document('likes/{likeId}')
  .onDelete(async snapshot => {
    try {
      const jokeRef = await db.doc(`/jokes/${snapshot.data().jokeId}`).get();
      if (jokeRef.exists) {
        // Remove notification
        return db
          .doc(
            `/notifications/like_${snapshot.id}_${jokeRef.data().user.username}`
          )
          .delete()
          .then(() => console.log('Like notification deleted successfully'));
      }
    } catch (error) {
      console.error('Error while deleting like notification ', error);
    }
  });

// Create notification when joke is commented
exports.createNotificationOnComment = functions
  .region('europe-west1')
  .firestore.document('comments/{commentId}')
  .onCreate(async snapshot => {
    try {
      // Get the joke that's been commented
      const jokeRef = await db.doc(`/jokes/${snapshot.data().jokeId}`).get();
      // Skip creating notification if sender and receiver are same user
      if (
        jokeRef.exists &&
        snapshot.data().user.username !== jokeRef.data().user.username
      ) {
        // Create notification
        return db
          .doc(
            `/notifications/comment_${snapshot.id}_${
              jokeRef.data().user.username
            }`
          )
          .set({
            notificationId: `comment_${snapshot.id}_${
              jokeRef.data().user.username
            }`,
            sender: snapshot.data().user,
            recipient: jokeRef.data().user.username,
            jokeId: jokeRef.data().jokeId,
            commentId: snapshot.id,
            createdAt: new Date().toISOString(),
            type: 'comment',
            read: false,
          })
          .then(() => console.log('Comment notification created successfully'));
      }
    } catch (error) {
      console.error('Error while creating comment notification ', error);
    }
  });

// Delete notification when joke comment is deleted
exports.deleteNotificationOnCommentDelete = functions
  .region('europe-west1')
  .firestore.document('comments/{commentId}')
  .onDelete(async snapshot => {
    try {
      const jokeRef = await db.doc(`/jokes/${snapshot.data().jokeId}`).get();
      if (jokeRef.exists) {
        // Remove notification
        await db
          .doc(
            `/notifications/comment_${snapshot.id}_${
              jokeRef.data().user.username
            }`
          )
          .delete()
          .then(() => console.log('Comment notification deleted successfully'));
      }
    } catch (error) {
      console.error('Error while deleting comment notification ', error);
    }
  });

// Create notification when comment is replied
exports.createNotificationOnCommentReply = functions
  .region('europe-west1')
  .firestore.document('replies/{replyId}')
  .onCreate(async snapshot => {
    try {
      // Get the joke that's been commented
      const jokeRef = await db.doc(`/jokes/${snapshot.data().jokeId}`).get();
      const commentRef = await db
        .doc(`/comments/${snapshot.data().commentId}`)
        .get();

      if (commentRef.exists && jokeRef.exists) {
        if (snapshot.data().user.username !== jokeRef.data().user.username) {
          // 1. Create notification for the joke owner
          return db
            .doc(
              `/notifications/reply_${snapshot.id}_${
                jokeRef.data().user.username
              }`
            )
            .set({
              notificationId: `reply_${snapshot.id}_${
                jokeRef.data().user.username
              }`,
              sender: snapshot.data().user,
              recipient: jokeRef.data().user.username,
              jokeId: jokeRef.data().jokeId,
              commentId: commentRef.data().commentId,
              replyId: snapshot.id,
              createdAt: new Date().toISOString(),
              type: 'reply',
              read: false,
            })
            .then(() =>
              console.log('Comment notification created successfully')
            );
        } else if (
          snapshot.data().user.username !== commentRef.data().user.username
        ) {
          // 2. Create notification for the comment owner
          return db
            .doc(
              `/notifications/reply_${snapshot.id}_${
                commentRef.data().user.username
              }`
            )
            .set({
              notificationId: `reply_${snapshot.id}_${
                commentRef.data().user.username
              }`,
              sender: snapshot.data().user,
              recipient: commentRef.data().user.username,
              jokeId: jokeRef.data().jokeId,
              commentId: commentRef.data().commentId,
              replyId: snapshot.id,
              createdAt: new Date().toISOString(),
              type: 'reply',
              read: false,
            })
            .then(() =>
              console.log('Comment reply notification created successfully')
            );
        }
      }
    } catch (error) {
      console.error('Error while creating comment notification ', error);
    }
  });

// Delete notification when comment reply is deleted
exports.deleteNotificationOnCommentReplyDelete = functions
  .region('europe-west1')
  .firestore.document('replies/{replyId}')
  .onDelete(async snapshot => {
    try {
      const jokeRef = await db.doc(`/jokes/${snapshot.data().jokeId}`).get();
      const commentRef = await db
        .doc(`/comments/${snapshot.data().commentId}`)
        .get();

      if (commentRef.exists && jokeRef.exists) {
        // 1. Delete notification for the joke owner
        await db
          .doc(
            `/notifications/reply_${snapshot.id}_${
              jokeRef.data().user.username
            }`
          )
          .delete()
          .then(() =>
            console.log(
              'Comment reply notification for Joke owner deleted successfully'
            )
          );

        return db
          .doc(
            `/notifications/reply_${snapshot.id}_${
              commentRef.data().user.username
            }`
          )
          .delete()
          .then(() =>
            console.log(
              'Comment reply notification for Comment Owner deleted successfully'
            )
          );
      }
    } catch (error) {
      console.error('Error while deleting comment notification ', error);
    }
  });
