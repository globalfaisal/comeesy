const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Get all comment replies
exports.getCommentReplies = (req, res) => {
  const commentDocument = db
    .collection('comments')
    .where('postId', '==', req.params.postId)
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

// Add comment on post
exports.commentOnPost = (req, res) => {
  const { isValid, error } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json({ comment: error });

  let postData;
  const postDocument = db.doc(`/posts/${req.params.postId}`);

  const newComment = {
    postId: req.params.postId,
    body: req.body.body,
    replyCount: 0,
    createdAt: new Date().toISOString(),
    user: {
      name: req.user.name,
      username: req.user.username,
      imageUrl: req.user.imageUrl,
    },
  };

  postDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Post not found' });
      postData = doc.data();
      return db.collection('comments').add(newComment);
    })
    .then(async docRef => {
      console.log(`Comment ${docRef.id} created successfully`);
      // Add the generated doc id to the reply document
      await db.doc(`/comments/${docRef.id}`).update({ commentId: docRef.id });
      // Update commentCount field in post document
      postData.commentCount++;
      await postDocument.update({ commentCount: postData.commentCount });

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
  let postData;
  const postDocument = db.doc(`/posts/${req.params.postId}`);
  const commentDocument = db
    .collection('comments')
    .where('postId', '==', req.params.postId)
    .where('commentId', '==', req.params.commentId)
    .limit(1);

  postDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Post not found' });
      postData = doc.data();

      return commentDocument.get();
    })
    .then(async snapshot => {
      if (snapshot.empty)
        return res.status(404).json({ error: 'Comment not found' });

      const commentData = snapshot.docs[0].data();
      // Allows only deletion from the post owner or the comment owner.
      if (
        commentData.user.username !== req.user.username &&
        postData.user.username !== req.user.username
      ) {
        return res.status(403).json({ error: 'Unauthorized delete request' });
      }

      // Delete the comment document from the collection
      await snapshot.docs[0].ref.delete();

      // Update commentCount field in post document
      postData.commentCount--;
      await postDocument.update({ commentCount: postData.commentCount });

      // Delete completed!
      return res.status(200).json(postData);
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
    postId: req.params.postId,
    commentId: req.params.commentId,
    body: req.body.body,
    createdAt: new Date().toISOString(),
    user: {
      username: req.user.username,
      name: req.user.name,
      imageUrl: req.user.imageUrl,
    },
  };

  let postData;
  const postDocument = db.doc(`/posts/${req.params.postId}`);

  const commentDocument = db
    .collection('comments')
    .where('postId', '==', req.params.postId)
    .where('commentId', '==', req.params.commentId)
    .limit(1);

  postDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Post not found' });
      postData = doc.data();
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
