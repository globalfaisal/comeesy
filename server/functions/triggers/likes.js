const { db } = require('../utils/admin');

exports.onLikeCreate = snapshot => {
  createLikeNotification(snapshot);
};

exports.onLikeDelete = snapshot => {
  deleteLikeNotification(snapshot);
};

// Create notification when scream is unliked
const createLikeNotification = async snapshot => {
  try {
    // Get the scream that's been liked
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
          `/notifications/like_${snapshot.id}_${screamRef.data().user.username}`
        )
        .set({
          notificationId: `like_${snapshot.id}_${
            screamRef.data().user.username
          }`,
          sender: snapshot.data().user,
          recipient: screamRef.data().user.username,
          screamId: screamRef.data().screamId,
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
// Delete notification when scream is unliked
const deleteLikeNotification = async snapshot => {
  try {
    const screamRef = await db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get();
    if (screamRef.exists) {
      // Remove notification
      return db
        .doc(
          `/notifications/like_${snapshot.id}_${screamRef.data().user.username}`
        )
        .delete()
        .then(() => console.log('Like notification deleted successfully'));
    }
  } catch (error) {
    console.error('Error while deleting like notification ', error);
  }
};
