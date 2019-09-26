const { db } = require('../utils/admin');

exports.likeScream = (req, res) => {
  let screamData;
  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  const likedDocument = db
    .collection('likes')
    .where('user.username', '==', req.user.username)
    .where('screamId', '==', req.params.screamId)
    .limit(1);

  screamDocument
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: 'Scream not found' });
      screamData = doc.data();
      return likedDocument.get();
    })
    .then(async snapshot => {
      if (!snapshot.empty)
        return res.status(400).json({ error: 'Scream already liked' });

      // Add new like
      const likeRef = await db.collection('likes').add({
        screamId: screamData.screamId,
        createdAt: new Date().toISOString(),
        user: {
          username: req.user.username,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          imageUrl: req.user.imageUrl,
        },
      });
      // Add the generated doc id to the like document
      await db.doc(`/likes/${likeRef.id}`).update({ likeId: likeRef.id });

      // Update likeCount field in scream document
      screamData.likeCount++;
      return screamDocument.update({ likeCount: screamData.likeCount });
    })
    .then(() => {
      console.log(`Scream liked successfully`);
      return res.status(201).json(screamData);
    })
    .catch(err => {
      console.error('Error while like a scream ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

exports.unlikeScream = (req, res) => {
  let screamData;
  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  const likedDocument = db
    .collection('likes')
    .where('user.username', '==', req.user.username)
    .where('screamId', '==', req.params.screamId)
    .limit(1);

  screamDocument
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: 'Scream not found' });
      screamData = doc.data();
      return likedDocument.get();
    })
    .then(async snapshot => {
      if (snapshot.empty)
        return res.status(400).json({ error: 'Scream not liked' });

      // Delete the like document from the collection
      await db.doc(`/likes/${snapshot.docs[0].id}`).delete();

      // Update likeCount field in scream document
      screamData.likeCount--;
      return screamDocument.update({ likeCount: screamData.likeCount });
    })
    .then(() => {
      console.log(`Scream unliked successfully`);
      return res.status(200).json(screamData);
    })
    .catch(err => {
      console.error('Error while unlike a scream ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};
