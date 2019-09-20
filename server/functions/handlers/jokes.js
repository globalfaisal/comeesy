const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Get all jokes
exports.getJokes = (req, res) => {
  db.collection('jokes')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      const jokesData = snapshot.docs.map(doc => doc.data());
      return res.status(200).json(jokesData);
    })
    .catch(err => {
      console.error('Error while getting jokes ', err);
      res.status(500).json({ error: err.code });
    });
};

// Get one joke
exports.getJoke = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });

  let jokeData = {};
  db.doc(`/jokes/${req.params.jokeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Joke not found' });
      }

      jokeData = doc.data();

      return db
        .collection('comments')
        .where('jokeId', '==', req.params.jokeId)
        .orderBy('createdAt', 'desc')
        .get();
    })
    .then(snapshot => {
      if (snapshot.empty) console.log('No joke comments found.');

      jokeData.comments = snapshot.docs.map(doc => doc.data());

      return res.status(200).json(jokeData);
    })
    .catch(err => {
      console.error('Error while getting a joke ', err);
      res.status(500).json({ error: err.code });
    });
};

// Post a new joke
exports.addJoke = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  const newJoke = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
    user: {
      username: req.user.username,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      imageUrl: req.user.imageUrl,
    },
  };

  db.collection('jokes')
    .add(newJoke)
    .then(async docRef => {
      // Add the generated doc id to the joke document
      await db.doc(`/jokes/${docRef.id}`).update({ jokeId: docRef.id });

      console.log(`Joke ${docRef.id} created successfully`);
      return res.status(201).json({ ...newJoke, jokeId: docRef.id });
    })
    .catch(err => {
      console.error('Error while adding a new joke ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
