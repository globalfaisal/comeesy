const { db } = require('../utils/admin');

exports.getAllJokes = (req, res) => {
  db.collection('jokes')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshots => {
      const jokes = [];
      snapshots.forEach(doc => {
        jokes.push({
          jokeId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(jokes);
    })
    .catch(err => {
      res.json({ error: err });
      console.error('Error while getting jokes ', err);
    });
};

exports.postAJoke = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'body must not be empty' });
  }

  const newJoke = {
    username: req.user.username,
    body: req.body.body,
    createdAt: new Date().toISOString(),
  };

  db.collection('jokes')
    .add(newJoke)
    .then(doc =>
      res.json({ message: `document ${doc.id} created successfully` })
    )
    .catch(err => {
      res.status(500).json({ error: 'something went wrong' });
      console.error('Error while posting a new joke ', err);
    });
};
