const { db } = require('../utils/admin');

exports.onLikeCreate = snapshot => {
  createLikeNotification(snapshot);
};

exports.onLikeDelete = snapshot => {
  deleteLikeNotification(snapshot);
};

// Create notification when post is unliked
const createLikeNotification = async snapshot => {
  try {
    // Get the post that's been liked
    const postRef = await db.doc(`/posts/${snapshot.data().postId}`).get();
    // Skip creating notification if sender and receiver are same user
    if (
      postRef.exists &&
      snapshot.data().user.username !== postRef.data().user.username
    ) {
      // Create notification
      return db
        .doc(
          `/notifications/like_${snapshot.id}_${postRef.data().user.username}`
        )
        .set({
          notificationId: `like_${snapshot.id}_${postRef.data().user.username}`,
          sender: snapshot.data().user,
          recipient: postRef.data().user.username,
          postId: postRef.data().postId,
          createdAt: new Date().toISOString(),
          type: 'like',
          read: false,
        })
        .then(() => console.log('Like notification created successfully'));
    }
  } catch (err) {
    console.error('Error while creating like notification ', err);
  }
};
// Delete notification when post is unliked
const deleteLikeNotification = async snapshot => {
  try {
    const postRef = await db.doc(`/posts/${snapshot.data().postId}`).get();
    if (postRef.exists) {
      // Remove notification
      return db
        .doc(
          `/notifications/like_${snapshot.id}_${postRef.data().user.username}`
        )
        .delete()
        .then(() => console.log('Like notification deleted successfully'));
    }
  } catch (error) {
    console.error('Error while deleting like notification ', error);
  }
};
