const { db } = require('../admin');

// Change imageUrl(avatar) references in all documents for this specific user
exports.onUserAvatarChange = async snapshot => {
  try {
    //1. Change avatar reference at all docs in posts collections
    await db
      .collection('posts')
      .where('user.username', '==', snapshot.before.data().username)
      .get()
      .then(data => {
        if (!data.empty) {
          const batch = db.batch();
          data.forEach(doc => {
            const postRef = db.doc(`/posts/${doc.id}`);
            batch.update(postRef, {
              'user.imageUrl': snapshot.after.data().imageUrl,
            });
          });
          console.log(
            'Changed avatar reference at all docs in posts collection '
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
};

exports.onUserNameChange = async snapshot => {
  try {
    //1. Change name reference at all docs in posts collections
    await db
      .collection('posts')
      .where('user.username', '==', snapshot.before.data().username)
      .get()
      .then(data => {
        if (!data.empty) {
          const batch = db.batch();
          data.forEach(doc => {
            const postRef = db.doc(`/posts/${doc.id}`);
            batch.update(postRef, {
              'user.name': snapshot.after.data().name,
            });
          });
          console.log(
            'Changed name reference at all docs in posts collection '
          );
          return batch.commit();
        }
        return null;
      });

    //2. Change name reference at all docs in comments collection
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
              'user.name': snapshot.after.data().name,
            });
          });
          console.log(
            'Changed name reference at all docs in comments collection'
          );
          return batch.commit();
        }
        return null;
      });

    //3. Change name reference at all docs in replies collection
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
              'user.name': snapshot.after.data().name,
            });
          });
          console.log(
            'Changed name reference at all docs in replies collection'
          );
          return batch.commit();
        }
        return null;
      });

    //4. Change name reference at all docs in likes collection
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
              'user.name': snapshot.after.data().name,
            });
          });
          console.log('Changed name reference at all docs in likes collection');
          return batch.commit();
        }
        return null;
      });

    //5. Change name reference at all docs in notifications collection
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
              'sender.name': snapshot.after.data().name,
            });
          });
          console.log(
            'Changed name reference at all docs in notifications collection'
          );
          return batch.commit();
        }
        return null;
      });
  } catch (err) {
    console.error(
      "Error while changing user's name in all docs created by the user ",
      err
    );
  }
};
