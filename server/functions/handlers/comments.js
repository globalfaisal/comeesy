const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Add comment on joke
exports.postComment = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  if (!req.params.jokeId)
    return res.status(400).json({ error: 'the jokeId must be provided' });

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
      // added successfully
      console.log(`Joke ${doc.id} created successfully`);
      // return the joke to the client
      return res.json({ ...newComment, commentId: doc.id });
    })
    .catch(err => {
      console.error('Error while adding a new comment ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.postCommentReply = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  if (!req.params.jokeId)
    return res.status(400).json({ error: 'the jokeId must be provided' });
  else if (!req.params.commentId)
    return res.status(400).json({ error: 'the commentId must be provided' });

  const commentReply = {
    commentId: req.params.commentId,
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
      return db.doc(`/comments/${req.params.commentId}`).get();
    })
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: 'Comment not found' });
      return db.collection('replies').add(commentReply);
    })
    .then(doc => {
      // added successfully
      console.log(`Comment reply ${doc.id} created successfully`);
      // return the comment reply to the client
      return res.json({ ...commentReply, replyId: doc.id });
    })
    .catch(err => {
      console.error('Error while adding a new comment reply ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.getCommentReplies = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'the jokeId must be provided' });
  else if (!req.params.commentId)
    return res.status(400).json({ error: 'the commentId must be provided' });
  db.doc(`/jokes/${req.params.jokeId}`)
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Joke not found' });
      return db.doc(`/comments/${req.params.commentId}`).get();
    })
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: 'Comment not found' });
      return db
        .collection('replies')
        .where('commentId', '==', req.params.commentId)
        .orderBy('createdAt', 'desc')
        .get();
    })
    .then(snapshot => {
      const commentRepliesData = snapshot.docs.map(doc => ({
        replyId: doc.id,
        ...doc.data(),
      }));
      return res.status(200).json(commentRepliesData);
    })
    .catch(err => {
      console.error('Error while getting comment replies ', err);
      res.status(500).json({ error: err.code });
    });
};
