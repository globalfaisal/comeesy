const { db } = require('../utils/admin');

exports.onScreamDelete = snapshot => {
  deleteScreamLikes(snapshot);
  deleteScreamNotification(snapshot);
  deleteScreamComments(snapshot);
  deleteScreamCommentReplies(snapshot);
};

const deleteScreamNotification = async snapshot => {
  try {
    return await db
      .collection('notifications')
      .where('screamId', '==', snapshot.data().screamId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No notifications found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Scream notifications deleted successfully'));
  } catch (error) {
    console.error('Error while deleting scream notification ', error);
  }
};

const deleteScreamComments = async snapshot => {
  try {
    return await db
      .collection('comments')
      .where('screamId', '==', snapshot.data().screamId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No comments found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Scream comments deleted successfully'));
  } catch (error) {
    console.error('Error while deleting scream comment ', error);
  }
};

const deleteScreamCommentReplies = async snapshot => {
  try {
    return await db
      .collection('replies')
      .where('screamId', '==', snapshot.data().screamId)
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

const deleteScreamLikes = async snapshot => {
  try {
    return await db
      .collection('likes')
      .where('screamId', '==', snapshot.data().screamId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No likes found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Scream likes deleted successfully'));
  } catch (error) {
    console.error('Error while deleting scream likes ', error);
  }
};
