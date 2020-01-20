const { db } = require('../admin');

//Notifications

const createCommentNotification = async snapshot => {
  try {
    // Get the post that's been commented
    const postRef = await db.doc(`/posts/${snapshot.data().postId}`).get();
    // Skip creating notification if sender and receiver are same user
    if (
      postRef.exists &&
      snapshot.data().user.username !== postRef.data().user.username
    ) {
      // Create notification
      return db
        .doc(
          `/notifications/comment_${snapshot.id}_${
            postRef.data().user.username
          }`
        )
        .set({
          notificationId: `comment_${snapshot.id}_${
            postRef.data().user.username
          }`,
          sender: snapshot.data().user,
          recipient: postRef.data().user.username,
          postId: postRef.data().postId,
          commentId: snapshot.id,
          body: 'commented on your post',
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
    const postRef = await db.doc(`/posts/${snapshot.data().postId}`).get();
    const replyNotificationsSnapshot = await db
      .collection('notifications')
      .where('type', '==', 'comment')
      .where('commentId', '==', snapshot.data().commentId)
      .get();

    if (postRef.exists) {
      // 1. Delete comment notifications for the post owner
      await db
        .doc(
          `/notifications/comment_${snapshot.id}_${
            postRef.data().user.username
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
    // Get the post that's been commented
    const postRef = await db.doc(`/posts/${snapshot.data().postId}`).get();
    const commentRef = await db
      .doc(`/comments/${snapshot.data().commentId}`)
      .get();

    if (commentRef.exists && postRef.exists) {
      if (snapshot.data().user.username !== postRef.data().user.username) {
        // 1. Create notification for the post owner
        await db
          .doc(
            `/notifications/reply_${snapshot.id}_${
              postRef.data().user.username
            }`
          )
          .set({
            notificationId: `reply_${snapshot.id}_${
              postRef.data().user.username
            }`,
            sender: snapshot.data().user,
            recipient: postRef.data().user.username,
            postId: postRef.data().postId,
            commentId: commentRef.data().commentId,
            replyId: snapshot.id,
            body: 'replied to a comment on your post',
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
            postId: postRef.data().postId,
            commentId: commentRef.data().commentId,
            replyId: snapshot.id,
            body: 'replied to your comment',
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

// Other actions
const deleteCommentReplies = async snapshot => {
  try {
    return await db
      .collection('replies')
      .where('postId', '==', snapshot.data().postId)
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
      .then(() => console.log('Post comment replies deleted successfully'));
  } catch (error) {
    console.error('Error while deleting post comment replies ', error);
  }
};

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
