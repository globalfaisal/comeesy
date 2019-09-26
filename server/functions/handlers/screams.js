const { db } = require('../utils/admin');
const { validateBodyContent } = require('../utils/validators');

// Get all screams
exports.getScreams = (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(snapshot => {
      const screamsData = snapshot.docs.map(doc => doc.data());
      return res.status(200).json(screamsData);
    })
    .catch(err => {
      console.error('Error while getting screams ', err);
      return res.status(500).json({ error: err.code });
    });
};

// Get one scream
exports.getScream = (req, res) => {
  let screamData = {};
  db.doc(`/screams/${req.params.screamId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Scream not found' });
      }

      screamData = doc.data();

      return db
        .collection('comments')
        .where('screamId', '==', req.params.screamId)
        .orderBy('createdAt', 'desc')
        .get();
    })
    .then(snapshot => {
      if (snapshot.empty) console.log('No scream comments found.');

      screamData.comments = snapshot.docs.map(doc => doc.data());

      return res.status(200).json(screamData);
    })
    .catch(err => {
      console.error('Error while getting a scream ', err);
      res.status(500).json({ error: err.code });
    });
};

// Post a new scream
exports.addScream = (req, res) => {
  const { isValid, error } = validateBodyContent(req.body.body);
  if (!isValid) return res.status(400).json({ scream: error });

  const newScream = {
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

  db.collection('screams')
    .add(newScream)
    .then(async docRef => {
      // Add the generated doc id to the scream document
      await db.doc(`/screams/${docRef.id}`).update({ screamId: docRef.id });

      console.log(`Scream ${docRef.id} created successfully`);
      return res.status(201).json({ ...newScream, screamId: docRef.id });
    })
    .catch(err => {
      console.error('Error while adding a new scream ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

// Delete scream
exports.deleteScream = (req, res) => {
  let screamData;
  const screamDocument = db.doc(`/screams/${req.params.screamId}`);

  screamDocument
    .get()
    .then(async doc => {
      if (!doc.exists)
        return res.status(404).json({ error: 'Scream not found' });

      screamData = doc.data();

      if (screamData.user.username !== req.user.username) {
        return res.status(403).json({ error: 'Unauthorized delete request' });
      }

      // Delete scream document from screams collection
      await doc.ref.delete();
      console.log('Scream deleted successfully');

      return res.status(200).json({
        message: `Scream ${screamData.screamId} deleted successfully`,
      });
    })
    .catch(err => {
      console.error('Error while deleting scream ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};
