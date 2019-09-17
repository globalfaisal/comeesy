const { db } = require('../utils/admin');

// Get all jokes
exports.getJokes = (req, res) => {
  db.collection('jokes')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      const jokes = snapshot.docs.map(doc => ({
        jokeId: doc.id,
        ...doc.data(),
      }));
      return res.json(jokes);
    })
    .catch(err => {
      console.error('Error while getting jokes ', err);
      res.status(500).json({ error: err.code });
    });
};

// Get one joke
exports.getJoke = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'the jokeId parameter must provide' });
  let jokeData = {};
  db.doc(`/jokes/${req.params.jokeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Joke not found' });
      } else {
        jokeData = doc.data();
        jokeData.jokeId = doc.id;
        return db
          .collection('comments')
          .where('jokeId', '==', req.params.jokeId)
          .orderBy('createdAt', 'desc')
          .get();
      }
    })
    .then(snapshot => {
      jokeData.comments = snapshot.docs.map(doc => doc.data());
      return res.status(200).json(jokeData);
    })
    .catch(err => {
      console.error('Error while getting a joke ', err);
      res.status(500).json({ error: err.code });
    });
};

// Post a joke
exports.postJoke = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Body must not be empty' });
  }

  const newJoke = {
    username: req.user.username,
    body: req.body.body,
    createdAt: new Date().toISOString(),
  };

  db.collection('jokes')
    .add(newJoke)
    .then(doc =>
      res.json({ message: `Document ${doc.id} created successfully` })
    )
    .catch(err => {
      console.error('Error while posting a new joke ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
