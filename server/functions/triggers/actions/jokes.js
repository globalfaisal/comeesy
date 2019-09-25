const { db } = require('../../utils/admin');

exports.deleteJokeNotification = async snapshot => {
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
    console.error('Error while deleting comment notification ', error);
  }
};
