const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Get all comment replies
exports.getCommentReplies = (req, res) => {
  const commentDocument = db
    .collection('comments')
    .where('jokeId', '==', req.params.jokeId)
    .where('commentId', '==', req.params.commentId)
    .limit(1);

  commentDocument
    .get()
    .then(snapshot => {
      if (snapshot.empty)
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
          /* EMPTY*/
        ]);
      }

      // Successfully found replies
      const commentRepliesData = snapshot.docs.map(doc => doc.data());
      return res.status(200).json(commentRepliesData);
    })
    .catch(err => {
      console.error('Error while getting comment replies ', err);
      return res.status(500).json({ error: err.code });
    });
};

// Add comment on joke
exports.commentOnJoke = (req, res) => {
  const { isValid, error } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json({ comment: error });

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
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

// //Delete comment
exports.deleteComment = (req, res) => {
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
        return res.status(404).json({ error: 'Comment not found' });

      const commentData = snapshot.docs[0].data();
      // Allows only deletion from the joke owner or the comment owner.
      if (
        commentData.user.username !== req.user.username &&
        jokeData.user.username !== req.user.username
      ) {
        return res.status(403).json({ error: 'Unauthorized delete request' });
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
        return res.status(200).json(jokeData);
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
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

// Post reply on a comment
exports.replyOnComment = (req, res) => {
  const { isValid, error } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json({ reply: error });

  const newReply = {
    jokeId: req.params.jokeId,
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
        return res.status(404).json({ error: 'Comment not found' });

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
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

//Delete comment reply
exports.deleteCommentReply = (req, res) => {
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
        return res.status(404).json({ error: 'Comment not found' });
      commentData = doc.data();

      return replyDocument.get();
    })
    .then(async snapshot => {
      if (snapshot.empty)
        return res.status(404).json({ error: 'Comment reply not found' });

      const replyData = snapshot.docs[0].data();

      // Allows only deletion from the comment owner or the comment reply owner.
      if (
        replyData.user.username !== req.user.username &&
        commentData.user.username !== req.user.username
      ) {
        return res.status(403).json({ error: 'Unauthorized delete request' });
      }

      // Delete the comment reply document from the collection
      await snapshot.docs[0].ref.delete();

      // Update replyCount field in comment document
      commentData.replyCount--;
      await commentDocument.update({ replyCount: commentData.replyCount });

      // Delete completed!
      return res.status(200).json(commentData);
    })
    .catch(err => {
      console.error('Error while deleting a comment ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};
