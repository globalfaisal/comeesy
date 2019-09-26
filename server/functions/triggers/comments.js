const { db } = require('../utils/admin');

exports.onCommentCreate = snapshot => {
  createCommentNotification(snapshot);
};

exports.onCommentDelete = snapshot => {
  deleteCommentReplies(snapshot);
  deleteCommentNotification(snapshot);
};

exports.onCommentReplyCreate = snapshot => {
  createCommentReplyNotifications(snapshot);
};
exports.onCommentReplyDelete = snapshot => {
  deleteCommentReplyNotifications(snapshot);
};

// Other actions
const deleteCommentReplies = async snapshot => {
  try {
    return await db
      .collection('replies')
      .where('screamId', '==', snapshot.data().screamId)
      .where('commentId', '==', snapshot.data().commentId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No replies found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Scream comment replies deleted successfully'));
  } catch (error) {
    console.error('Error while deleting scream comment replies ', error);
  }
};

//Notifications

const createCommentNotification = async snapshot => {
  try {
    // Get the scream that's been commented
    const screamRef = await db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get();
    // Skip creating notification if sender and receiver are same user
    if (
      screamRef.exists &&
      snapshot.data().user.username !== screamRef.data().user.username
    ) {
      // Create notification
      return db
        .doc(
          `/notifications/comment_${snapshot.id}_${
            screamRef.data().user.username
          }`
        )
        .set({
          notificationId: `comment_${snapshot.id}_${
            screamRef.data().user.username
          }`,
          sender: snapshot.data().user,
          recipient: screamRef.data().user.username,
          screamId: screamRef.data().screamId,
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
};

const deleteCommentNotification = async snapshot => {
  try {
    const screamRef = await db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get();
    const replyNotificationsSnapshot = await db
      .collection('notifications')
      .where('type', '==', 'reply')
      .where('commentId', '==', snapshot.data().commentId)
      .get();

    if (screamRef.exists) {
      // 1. Delete comment notifications for the scream owner
      await db
        .doc(
          `/notifications/comment_${snapshot.id}_${
            screamRef.data().user.username
          }`
        )
        .delete()
        .then(() => console.log('Comment notification deleted successfully'));

      // 2. Delete all notifications for the comment reply
      if (!replyNotificationsSnapshot.empty) {
        const batch = db.batch();
        replyNotificationsSnapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });
        batch
          .commit()
          .then(() =>
            console.log('Comment reply notifications deleted successfully')
          )
          .catch(err =>
            console.error(
              'Error while deleting comment reply notifications',
              err
            )
          );
      }
    }
  } catch (error) {
    console.error('Error while deleting comment notification ', error);
  }
};

const createCommentReplyNotifications = async snapshot => {
  try {
    // Get the scream that's been commented
    const screamRef = await db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get();
    const commentRef = await db
      .doc(`/comments/${snapshot.data().commentId}`)
      .get();

    if (commentRef.exists && screamRef.exists) {
      if (snapshot.data().user.username !== screamRef.data().user.username) {
        // 1. Create notification for the scream owner
        await db
          .doc(
            `/notifications/reply_${snapshot.id}_${
              screamRef.data().user.username
            }`
          )
          .set({
            notificationId: `reply_${snapshot.id}_${
              screamRef.data().user.username
            }`,
            sender: snapshot.data().user,
            recipient: screamRef.data().user.username,
            screamId: screamRef.data().screamId,
            commentId: commentRef.data().commentId,
            replyId: snapshot.id,
            createdAt: new Date().toISOString(),
            type: 'reply',
            read: false,
          })
          .then(() => console.log('Comment notification created successfully'));
      }

      if (snapshot.data().user.username !== commentRef.data().user.username) {
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
            screamId: screamRef.data().screamId,
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
};

const deleteCommentReplyNotifications = async snapshot => {
  try {
    const replyNotificationsSnapshot = await db
      .collection('notifications')
      .where('type', '==', 'reply')
      .where('replyId', '==', snapshot.data().replyId)
      .get();

    // Delete all notifications for the comment reply
    if (!replyNotificationsSnapshot.empty) {
      const batch = db.batch();
      replyNotificationsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      batch
        .commit()
        .then(() =>
          console.log('Comment reply notifications deleted successfully')
        )
        .catch(err =>
          console.error('Error while deleting comment reply notifications', err)
        );
    }
  } catch (error) {
    console.error('Error while deleting comment notification ', error);
  }
};
