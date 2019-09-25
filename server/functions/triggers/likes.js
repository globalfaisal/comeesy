const { db } = require('../utils/admin');

exports.onLikeCreate = snapshot => {
  createLikeNotification(snapshot);
};

exports.onLikeDelete = snapshot => {
  deleteLikeNotification(snapshot);
};

// Create notification when joke is unliked
const createLikeNotification = async snapshot => {
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
          notificationId: `like_${snapshot.id}_${jokeRef.data().user.username}`,
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
};
// Delete notification when joke is unliked
const deleteLikeNotification = async snapshot => {
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
};
