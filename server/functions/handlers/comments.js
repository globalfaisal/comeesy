const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Get all comment replies
exports.getCommentReplies = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });
  else if (!req.params.commentId)
    return res.status(400).json({ error: 'commentId is required' });

  const commentDocument = db
    .collection('comments')
    .where('jokeId', '==', req.params.jokeId)
    .where('commentId', '==', req.params.commentId)
    .limit(1);

  commentDocument
    .get()
    .then(snapshot => {
      if (snapshot.empty)
        return res.status(404).json({ error: 'comment not found' });
      return db
        .collection('replies')
        .where('commentId', '==', req.params.commentId)
        .orderBy('createdAt', 'desc')
        .get();
    })
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No comment replies found.');
        return res.status(200).json([]);
      }

      // Successfully found replies
      const commentRepliesData = snapshot.docs.map(doc => doc.data());
      return res.status(200).json(commentRepliesData);
    })
    .catch(err => {
      console.error('Error while getting comment replies ', err);
      res.status(500).json({ error: err.code });
    });
};

// Add comment on joke
exports.commentOnJoke = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });

  let jokeData;
  const jokeDocument = db.doc(`/jokes/${req.params.jokeId}`);

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

  jokeDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Joke not found' });
      jokeData = doc.data();
      return db.collection('comments').add(newComment);
    })
    .then(async docRef => {
      console.log(`Comment ${docRef.id} created successfully`);
      // Add the generated doc id to the reply document
      await db.doc(`/comments/${docRef.id}`).update({ commentId: docRef.id });
      // Update commentCount field in joke document
      jokeData.commentCount++;
      await jokeDocument.update({ commentCount: jokeData.commentCount });

      return res.status(201).json({ ...newComment, commentId: docRef.id });
    })
    .catch(err => {
      console.error('Error while adding a new comment ', err);
      res.status(500).json({ error: 'Something went wrong' });
    });
};

//Delete comment
exports.deleteComment = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });
  else if (!req.params.commentId)
    return res.status(400).json({ error: 'commentId is required' });

  let jokeData;
  const jokeDocument = db.doc(`/jokes/${req.params.jokeId}`);
  const commentDocument = db
    .collection('comments')
    .where('jokeId', '==', req.params.jokeId)
    .where('commentId', '==', req.params.commentId)
    .limit(1);

  jokeDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Joke not found' });
      jokeData = doc.data();

      return commentDocument.get();
    })
    .then(async snapshot => {
      if (snapshot.empty)
        return res.status(404).json({ error: 'comment not found' });

      const commentData = snapshot.docs[0].data();
      // Allows only deletion from the joke owner or the comment owner.
      if (
        commentData.user.username !== req.user.username &&
        jokeData.user.username !== req.user.username
      ) {
        return res
          .status(404)
          .json({ error: 'unauthorized comment delete request' });
      }

      // Delete the comment document from the collection
      await snapshot.docs[0].ref.delete();

      // Update commentCount field in joke document
      jokeData.commentCount--;
      await jokeDocument.update({ commentCount: jokeData.commentCount });

      //Find and return all the replies for the comment
      return await db
        .collection('replies')
        .where('commentId', '==', commentData.commentId)
        .get();
    })
    .then(async snapshot => {
      if (snapshot.empty) {
        console.log(`no comment replies associated with the deleted comment`);
        return res.status(201).json(jokeData);
      }

      // Delete all replies for the deleted comment
      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        // For each doc, add a delete operation to the batch
        batch.delete(doc.ref);
      });

      // Commit the batch
      await batch.commit();
      // Delete completed!
      return res.status(201).json(jokeData);
    })
    .catch(err => {
      console.error('Error while deleting a comment ', err);
      res.status(500).json({ error: 'something went wrong' });
    });
};

// Post reply on a comment
exports.replyOnComment = (req, res) => {
  const { isValid, errors } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json(errors);

  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });
  else if (!req.params.commentId)
    return res.status(400).json({ error: 'commentId is required' });

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

  const commentDocument = db
    .collection('comments')
    .where('jokeId', '==', req.params.jokeId)
    .where('commentId', '==', req.params.commentId)
    .limit(1);

  commentDocument
    .get()
    .then(async snapshot => {
      if (snapshot.empty)
        return res.status(404).json({ error: 'comment not found' });

      const commentData = snapshot.docs[0].data();

      // update replyCount field in comment document
      commentData.replyCount++;
      await snapshot.docs[0].ref.update({ replyCount: commentData.replyCount });

      // Add new reply to the comment
      return db.collection('replies').add(newReply);
    })
    .then(async docRef => {
      // Add the generated doc id to the reply document
      await db.doc(`/replies/${docRef.id}`).update({ replyId: docRef.id });

      console.log(`Comment reply ${docRef.id} created successfully`);
      return res.status(201).json({ ...newReply, replyId: docRef.id });
    })
    .catch(err => {
      console.error('Error while adding a new comment reply ', err);
      res.status(500).json({ error: 'something went wrong' });
    });
};

//Delete comment reply
exports.deleteCommentReply = (req, res) => {
  if (!req.params.jokeId)
    return res.status(400).json({ error: 'jokeId is required' });
  else if (!req.params.commentId)
    return res.status(400).json({ error: 'commentId is required' });
  else if (!req.params.replyId)
    return res.status(400).json({ error: 'replyId is required' });

  let commentData;
  const commentDocument = db.doc(`/comments/${req.params.commentId}`);
  const replyDocument = db
    .collection('replies')
    .where('commentId', '==', req.params.commentId)
    .where('replyId', '==', req.params.replyId)
    .limit(1);

  commentDocument
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: 'comment not found' });
      commentData = doc.data();

      return replyDocument.get();
    })
    .then(async snapshot => {
      if (snapshot.empty)
        return res.status(404).json({ error: 'comment reply not found' });

      const replyData = snapshot.docs[0].data();

      // Allows only deletion from the comment owner or the comment reply owner.
      if (
        replyData.user.username !== req.user.username &&
        commentData.user.username !== req.user.username
      ) {
        return res
          .status(404)
          .json({ error: 'unauthorized comment reply delete request' });
      }

      // Delete the comment reply document from the collection
      await snapshot.docs[0].ref.delete();

      // Update replyCount field in comment document
      commentData.replyCount--;
      await commentDocument.update({ replyCount: commentData.replyCount });

      // Delete completed!
      return res.status(201).json(commentData);
    })
    .catch(err => {
      console.error('Error while deleting a comment ', err);
      res.status(500).json({ error: 'something went wrong' });
    });
};
