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
      return res.status(500).json({ error: err.code });
    });
};

// Get one joke
exports.getJoke = (req, res) => {
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
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

// Delete joke
exports.deleteJoke = (req, res) => {
  let jokeData;
  const jokeDocument = db.doc(`/jokes/${req.params.jokeId}`);

  jokeDocument
    .get()
    .then(async doc => {
      if (!doc.exists) return res.status(404).json({ error: 'Joke not found' });

      jokeData = doc.data();

      if (jokeData.user.username !== req.user.username) {
        return res.status(403).json({ error: 'Unauthorized delete request' });
      }

      // Delete joke document from jokes collection
      await doc.ref.delete();
      console.log('Joke deleted successfully');

      //Find all the comments for this joke
      return db
        .collection('comments')
        .where('jokeId', '==', jokeData.jokeId)
        .get();
    })
    .then(async commentsSnapshot => {
      if (!commentsSnapshot.empty) {
        const firstBatch = db.batch();

        const commentIds = [];

        // Add allcomments of the joke in delete batch
        commentsSnapshot.docs.forEach(doc => {
          // Get deleted comment ids
          commentIds.push(doc.id);
          firstBatch.delete(doc.ref);
        });

        if (commentIds.length > 0) {
          commentIds.forEach(async id => {
            // Get all replies of the comment
            const replySnapshots = await db
              .collection('replies')
              .where('commentId', '==', id)
              .get();

            if (!replySnapshots.empty) {
              const secondBatch = db.batch();

              replySnapshots.docs.forEach(doc => {
                secondBatch.delete(doc.ref);
              });

              secondBatch.commit();
              console.log('Comment replies deleted successfully');
            }
          });
        }

        // Commit the batch
        await firstBatch.commit();
        console.log('Comments deleted successfully');
      }
      // Get all likes of the joke
      return db
        .collection('likes')
        .where('jokeId', '==', jokeData.jokeId)
        .get();
    })
    .then(async snapshot => {
      if (!snapshot.empty) {
        const batch = db.batch();

        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('Likes deleted successfully');
      }

      return res
        .status(200)
        .json({ message: `Joke ${jokeData.jokeId} deleted successfully` });
    })
    .catch(err => {
      console.error('Error while deleting joke ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};
