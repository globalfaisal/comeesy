const { db } = require('../utils/admin');

exports.likeJoke = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });

  let jokeData;
  const jokeDocument = db.doc(`/jokes/${req.params.jokeId}`);
  const likedDocument = db
    .collection('likes')
    .where('user.username', '==', req.user.username)
    .where('jokeId', '==', req.params.jokeId)
    .limit(1);

  jokeDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(403).json({ error: 'Joke not found' });
      jokeData = { jokeId: doc.id, ...doc.data() };
      return likedDocument.get();
    })
    .then(async snapshot => {
      if (!snapshot.empty)
        return res.status(400).json({ error: 'Joke already liked' });

      // Add new like
      await db.collection('likes').add({
        jokeId: req.params.jokeId,
        createdAt: new Date().toISOString(),
        user: {
          username: req.user.username,
          firstname: req.user.firstname,
          lastname: req.user.lastname,
          imageUrl: req.user.imageUrl,
        },
      });
      // Update likeCount field in joke document
      jokeData.likeCount++;
      return jokeDocument.update({ likeCount: jokeData.likeCount });
    })
    .then(() => {
      console.log(`joke liked successfully`);
      return res.status(201).json(jokeData);
    })
    .catch(err => {
      console.error('Error while adding a like to a joke ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.unlikeJoke = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });

  let jokeData;
  const jokeDocument = db.doc(`/jokes/${req.params.jokeId}`);
  const likedDocument = db
    .collection('likes')
    .where('user.username', '==', req.user.username)
    .where('jokeId', '==', req.params.jokeId)
    .limit(1);

  jokeDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(403).json({ error: 'Joke not found' });
      jokeData = { jokeId: doc.id, ...doc.data() };
      return likedDocument.get();
    })
    .then(async snapshot => {
      if (snapshot.empty)
        return res.status(400).json({ error: 'Joke not liked' });

      // Delete the like document from the collection
      await db.doc(`/likes/${snapshot.docs[0].id}`).delete();

      // Update likeCount field in joke document
      jokeData.likeCount--;
      return jokeDocument.update({ likeCount: jokeData.likeCount });
    })
    .then(() => {
      console.log(`joke unliked successfully`);
      return res.status(201).json(jokeData);
    })
    .catch(err => {
      console.error('Error while adding a like to a joke ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
