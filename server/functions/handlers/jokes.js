const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');
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
    return res.status(400).json({ error: 'the jokeId must not be empty' });

  let jokeData = {};
  db.doc(`/jokes/${req.params.jokeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Joke not found' });
      }
      jokeData = doc.data();
      jokeData.jokeId = doc.id;
      return db
        .collection('comments')
        .where('jokeId', '==', req.params.jokeId)
        .orderBy('createdAt', 'desc')
        .get();
    })
    .then(snapshot => {
      jokeData.comments = snapshot.docs.map(doc => ({
        commentId: doc.id,
        ...doc.data(),
      }));

      return res.status(200).json(jokeData);
    })
    .catch(err => {
      console.error('Error while getting a joke ', err);
      res.status(500).json({ error: err.code });
    });
};

// Post a joke
exports.addJoke = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  const newJoke = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    user: {
      username: req.user.username,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      imageUrl: req.user.imageUrl,
    },
  };

  db.collection('jokes')
    .add(newJoke)
    .then(doc => {
      // added sucessfully
      console.log(`Joke ${doc.id} created successfully`);
      // return the joke to the client
      return res.json({ ...newJoke, jokeId: doc.id });
    })
    .catch(err => {
      console.error('Error while adding a new joke ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
