const { db } = require('../utils/admin');

exports.onJokeDelete = snapshot => {
  deleteJokeLikes(snapshot);
  deleteJokeNotification(snapshot);
  deleteJokeComments(snapshot);
  deleteJokeCommentReplies(snapshot);
};

const deleteJokeNotification = async snapshot => {
  try {
    return await db
      .collection('notifications')
      .where('jokeId', '==', snapshot.data().jokeId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No notifications found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Joke notifications deleted successfully'));
  } catch (error) {
    console.error('Error while deleting joke notification ', error);
  }
};

const deleteJokeComments = async snapshot => {
  try {
    return await db
      .collection('comments')
      .where('jokeId', '==', snapshot.data().jokeId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No comments found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Joke comments deleted successfully'));
  } catch (error) {
    console.error('Error while deleting joke comment ', error);
  }
};

const deleteJokeCommentReplies = async snapshot => {
  try {
    return await db
      .collection('replies')
      .where('jokeId', '==', snapshot.data().jokeId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No replies found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Joke comment replies deleted successfully'));
  } catch (error) {
    console.error('Error while deleting joke comment replies ', error);
  }
};

const deleteJokeLikes = async snapshot => {
  try {
    return await db
      .collection('likes')
      .where('jokeId', '==', snapshot.data().jokeId)
      .get()
      .then(doc => {
        if (doc.empty) return console.log('No likes found to delete');
        const batch = db.batch();

        doc.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        return batch.commit();
      })
      .then(() => console.log('Joke likes deleted successfully'));
  } catch (error) {
    console.error('Error while deleting joke likes ', error);
  }
};
