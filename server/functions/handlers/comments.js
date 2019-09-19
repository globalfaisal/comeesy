const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Add comment on joke
exports.commentOnJoke = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });

  const newComment = {
    jokeId: req.params.jokeId,
    body: req.body.body,
    replyCount: 0,
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
      console.log(`Comment ${doc.id} created successfully`);
      return res.status(201).json({ ...newComment, commentId: doc.id });
    })
    .catch(err => {
      console.error('Error while adding a new comment ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.replyOnComment = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });
  else if (!req.params.commentId)
    return res.status(400).json({ error: 'commentId is required' });

  const jokeDocument = db.doc(`/jokes/${req.params.jokeId}`);
  const commentDocument = db.doc(`/comments/${req.params.commentId}`);

  const newReply = {
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

  jokeDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Joke not found' });
      return commentDocument.get();
    })
    .then(async doc => {
      if (!doc.exists)
        return res.status(404).json({ error: 'Comment not found' });
      // update replyCount field in comment document
      const commentData = doc.data();
      commentData.replyCount++;
      await commentDocument.update({ replyCount: commentData.replyCount });

      // add new reply to the comment
      const response = await db.collection('replies').add(newReply);

      console.log(`Comment reply ${response.id} created successfully`);
      return res.status(201).json({ ...newReply, replyId: response.id });
    })
    .catch(err => {
      console.error('Error while adding a new comment reply ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

exports.getCommentReplies = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });
  else if (!req.params.commentId)
    return res.status(400).json({ error: 'commentId is required' });
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
      if (snapshot.empty) {
        console.log('No comment replies found.');
        return res.status(200).json([
          /* empty */
        ]);
      }

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
