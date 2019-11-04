const { db } = require('../utils/admin');

const deletePostNotifications = async snapshot => {
  try {
    return await db
      .collection('notifications')
      .where('postId', '==', snapshot.data().postId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No notifications found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Post notifications deleted successfully'));
  } catch (error) {
    console.error('Error while deleting post notification ', error);
  }
};

const deletePostComments = async snapshot => {
  try {
    return await db
      .collection('comments')
      .where('postId', '==', snapshot.data().postId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No comments found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Post comments deleted successfully'));
  } catch (error) {
    console.error('Error while deleting post comment ', error);
  }
};

const deletePostCommentReplies = async snapshot => {
  try {
    return await db
      .collection('replies')
      .where('postId', '==', snapshot.data().postId)
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

const deletePostLikes = async snapshot => {
  try {
    return await db
      .collection('likes')
      .where('postId', '==', snapshot.data().postId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No likes found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Post likes deleted successfully'));
  } catch (error) {
    console.error('Error while deleting post likes ', error);
  }
};

exports.onPostDelete = snapshot => {
  deletePostLikes(snapshot);
  deletePostNotifications(snapshot);
  deletePostComments(snapshot);
  deletePostCommentReplies(snapshot);
};
