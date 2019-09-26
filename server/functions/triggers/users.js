const { db } = require('../utils/admin');

exports.onUserAvatarChange = snapshot => {
  changeUserImageUrlReferences(snapshot);
};

// Change imageUrl(avatar) references in all documents for this specific user
const changeUserImageUrlReferences = async snapshot => {
  if (snapshot.before.data().imageUrl !== snapshot.after.data().imageUrl) {
    try {
      //1. Change avatar reference at all docs in screams collections
      await db
        .collection('screams')
        .where('user.username', '==', snapshot.before.data().username)
        .get()
        .then(data => {
          if (!data.empty) {
            const batch = db.batch();
            data.forEach(doc => {
              const screamRef = db.doc(`/screams/${doc.id}`);
              batch.update(screamRef, {
                'user.imageUrl': snapshot.after.data().imageUrl,
              });
            });
            console.log(
              'Changed avatar reference at all docs in screams collection '
            );
            return batch.commit();
          }
          return null;
        });

      //2. Change avatar reference at all docs in comments collection
      await db
        .collection('comments')
        .where('user.username', '==', snapshot.before.data().username)
        .get()
        .then(data => {
          if (!data.empty) {
            const batch = db.batch();
            data.forEach(doc => {
              const commentRef = db.doc(`/comments/${doc.id}`);
              batch.update(commentRef, {
                'user.imageUrl': snapshot.after.data().imageUrl,
              });
            });
            console.log(
              'Changed avatar reference at all docs in comments collection'
            );
            return batch.commit();
          }
          return null;
        });

      //3. Change avatar reference at all docs in replies collection
      await db
        .collection('replies')
        .where('user.username', '==', snapshot.before.data().username)
        .get()
        .then(data => {
          if (!data.empty) {
            const batch = db.batch();
            data.forEach(doc => {
              const replyRef = db.doc(`/replies/${doc.id}`);
              batch.update(replyRef, {
                'user.imageUrl': snapshot.after.data().imageUrl,
              });
            });
            console.log(
              'Changed avatar reference at all docs in replies collection'
            );
            return batch.commit();
          }
          return null;
        });

      //4. Change avatar reference at all docs in likes collection
      await db
        .collection('likes')
        .where('user.username', '==', snapshot.before.data().username)
        .get()
        .then(data => {
          if (!data.empty) {
            const batch = db.batch();
            data.forEach(doc => {
              const likeRef = db.doc(`/likes/${doc.id}`);
              batch.update(likeRef, {
                'user.imageUrl': snapshot.after.data().imageUrl,
              });
            });
            console.log(
              'Changed avatar reference at all docs in likes collection'
            );
            return batch.commit();
          }
          return null;
        });

      //5. Change avatar reference at all docs in notifications collection
      await db
        .collection('notifications')
        .where('sender.username', '==', snapshot.before.data().username)
        .get()
        .then(data => {
          if (!data.empty) {
            const batch = db.batch();
            data.forEach(doc => {
              const notificationRef = db.doc(`/notifications/${doc.id}`);
              batch.update(notificationRef, {
                'sender.imageUrl': snapshot.after.data().imageUrl,
              });
            });
            console.log(
              'Changed avatar reference at all docs in notifications collection'
            );
            return batch.commit();
          }
          return null;
        });
    } catch (err) {
      console.error(
        'Error while changing user-image-urls in all docs created by the user ',
        err
      );
    }
  }
};
