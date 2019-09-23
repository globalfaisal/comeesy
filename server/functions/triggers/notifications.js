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
      if (jokeRef.exists) {
        // Create notification
        await db.doc(`/notifications/${snapshot.id}`).set({
          sender: snapshot.data().user.username,
          recipient: jokeRef.data().user.username,
          jokeId: jokeRef.data().jokeId,
          createdAt: new Date().toISOString(),
          type: 'like',
          read: false,
        });

        console.log('Like notification created successfully');
      }
      return null;
    } catch (error) {
      console.error('Error while creating like notification ', error);
    }
  });

// Delete notification when joke is unliked
exports.deleteNotificationOnUnLike = functions
  .region('europe-west1')
  .firestore.document('likes/{likeId}')
  .onDelete(async snapshot => {
    try {
      // Remove notification
      await db.doc(`/notifications/${snapshot.id}`).delete();
      console.log('Like notification deleted successfully');
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
      if (jokeRef.exists) {
        // Create notification
        await db.doc(`/notifications/${snapshot.id}`).set({
          sender: snapshot.data().user.username,
          recipient: jokeRef.data().user.username,
          jokeId: jokeRef.data().jokeId,
          createdAt: new Date().toISOString(),
          type: 'comment',
          read: false,
        });

        console.log('Comment notification created successfully');
      }
      return null;
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
      // Remove notification
      await db.doc(`/notifications/${snapshot.id}`).delete();
      console.log('Comment notification deleted successfully');
    } catch (error) {
      console.error('Error while deleting comment notification ', error);
    }
  });
