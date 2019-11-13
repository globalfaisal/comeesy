const { db } = require('../admin');

exports.likePost = (req, res) => {
  let postData;
  const postDocument = db.doc(`/posts/${req.params.postId}`);
  const likedDocument = db
    .collection('likes')
    .where('user.username', '==', req.user.username)
    .where('postId', '==', req.params.postId)
    .limit(1);

  postDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Post not found' });
      postData = doc.data();
      return likedDocument.get();
    })
    .then(async snapshot => {
      if (!snapshot.empty)
        return res.status(400).json({ error: 'Post already liked' });

      // Add new like
      const likeRef = await db.collection('likes').add({
        postId: postData.postId,
        createdAt: new Date().toISOString(),
        user: {
          name: req.user.name,
          username: req.user.username,
          imageUrl: req.user.imageUrl,
        },
      });
      // Add the generated doc id to the like document
      await db.doc(`/likes/${likeRef.id}`).update({ likeId: likeRef.id });

      // Update likeCount field in post document
      postData.likeCount++;
      return postDocument.update({ likeCount: postData.likeCount });
    })
    .then(() => {
      console.log(`Post liked successfully`);
      return res.status(201).json(postData);
    })
    .catch(err => {
      console.error('Error while like a post ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

exports.unlikePost = (req, res) => {
  let postData;
  const postDocument = db.doc(`/posts/${req.params.postId}`);
  const likedDocument = db
    .collection('likes')
    .where('user.username', '==', req.user.username)
    .where('postId', '==', req.params.postId)
    .limit(1);

  postDocument
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Post not found' });
      postData = doc.data();
      return likedDocument.get();
    })
    .then(async snapshot => {
      if (snapshot.empty)
        return res.status(400).json({ error: 'Post not liked' });

      // Delete the like document from the collection
      await db.doc(`/likes/${snapshot.docs[0].id}`).delete();

      // Update likeCount field in post document
      postData.likeCount--;
      return postDocument.update({ likeCount: postData.likeCount });
    })
    .then(() => {
      console.log(`Post unliked successfully`);
      return res.status(200).json(postData);
    })
    .catch(err => {
      console.error('Error while unlike a post ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};
