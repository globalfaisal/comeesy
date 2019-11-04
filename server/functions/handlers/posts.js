const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Get all posts
exports.getPosts = (req, res) => {
  db.collection('posts')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      const postsData = snapshot.docs.map(doc => doc.data());
      return res.status(200).json(postsData);
    })
    .catch(err => {
      console.error('Error while getting posts ', err);
      return res.status(500).json({ error: err.code });
    });
};

// Get one post
exports.getPost = (req, res) => {
  let postData = {};
  db.doc(`/posts/${req.params.postId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Post not found' });
      }

      postData = doc.data();

      return db
        .collection('comments')
        .where('postId', '==', req.params.postId)
        .orderBy('createdAt', 'desc')
        .get();
    })
    .then(snapshot => {
      if (snapshot.empty) console.log('No post comments found.');

      postData.comments = snapshot.docs.map(doc => doc.data());

      return res.status(200).json(postData);
    })
    .catch(err => {
      console.error('Error while getting a post ', err);
      res.status(500).json({ error: err.code });
    });
};

// Post a new post
exports.addPost = (req, res) => {
  const { isValid, error } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json({ post: error });

  const newPost = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0,
    user: {
      name: req.user.name,
      username: req.user.username,
      imageUrl: req.user.imageUrl,
    },
  };

  db.collection('posts')
    .add(newPost)
    .then(async docRef => {
      // Add the generated doc id to the post document
      await db.doc(`/posts/${docRef.id}`).update({ postId: docRef.id });

      console.log(`Post ${docRef.id} created successfully`);
      return res.status(201).json({ ...newPost, postId: docRef.id });
    })
    .catch(err => {
      console.error('Error while adding a new post ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

// Delete post
exports.deletePost = (req, res) => {
  let postData;
  const postDocument = db.doc(`/posts/${req.params.postId}`);

  postDocument
    .get()
    .then(async doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Post not found' });

      postData = doc.data();

      if (postData.user.username !== req.user.username) {
        return res.status(403).json({ error: 'Unauthorized delete request' });
      }

      // Delete post document from posts collection
      await doc.ref.delete();
      console.log('Post deleted successfully');

      return res.status(200).json({
        message: `Post ${postData.postId} deleted successfully`,
      });
    })
    .catch(err => {
      console.error('Error while deleting post ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};
