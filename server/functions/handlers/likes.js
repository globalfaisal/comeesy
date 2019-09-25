const { db } = require('../utils/admin');

exports.likeJoke = (req, res) => {
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
      if (!doc.exists) return res.status(404).json({ error: 'Joke not found' });
      jokeData = doc.data();
      return likedDocument.get();
    })
    .then(async snapshot => {
      if (!snapshot.empty)
        return res.status(400).json({ error: 'Joke already liked' });

      // Add new like
      const likeRef = await db.collection('likes').add({
        jokeId: jokeData.jokeId,
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

      // Update likeCount field in joke document
      jokeData.likeCount++;
      return jokeDocument.update({ likeCount: jokeData.likeCount });
    })
    .then(() => {
      console.log(`Joke liked successfully`);
      return res.status(201).json(jokeData);
    })
    .catch(err => {
      console.error('Error while like a joke ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

exports.unlikeJoke = (req, res) => {
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
      if (!doc.exists) return res.status(404).json({ error: 'Joke not found' });
      jokeData = doc.data();
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
      console.log(`Joke unliked successfully`);
      return res.status(200).json(jokeData);
    })
    .catch(err => {
      console.error('Error while unlike a joke ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};
