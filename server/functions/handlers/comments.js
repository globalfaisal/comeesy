const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Add comment on joke
exports.postComment = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  if (!req.params.jokeId)
    return res.status(400).json({ error: 'the jokeId must not be empty' });

  const newComment = {
    jokeId: req.params.jokeId,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    user: {
      username: req.user.username,
      firstname: req.user.firstname,
      lastname: req.user.lastname,
      imageUrl: req.user.imageUrl,
    },
  };

  db.doc(`/jokes/${req.params.jokeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Joke not found' });
      return db.collection('comments').add(newComment);
    })
    .then(doc => {
      // added sucessfully
      console.log(`Joke ${doc.id} created successfully`);
      // return the joke to the client
      return res.json({ ...newComment, commentId: doc.id });
    })
    .catch(err => {
      console.error('Error while adding a new comment ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};
