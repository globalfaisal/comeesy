const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

const { admin, db, firebase } = require('../admin');

const {
  validName,
  validEmail,
  validateImageFile,
  validateBodyContent,
  validatePasswordContent,
} = require('../utils/validators');

const config = require('../config');

// Update user profile details
exports.updateUserDetails = async (req, res) => {
  const { isValid } = validateBodyContent(req.body);

  if (!isValid) {
    return res
      .status(400)
      .json({ message: 'At least one field must be updated' });
  }

  try {
    // Update details in the users db
    return db
      .doc(`/users/${req.user.username}`)
      .update(req.body)
      .then(() =>
        res.status(200).json({ message: 'Details updated successfully' })
      );
  } catch (err) {
    console.error('Error while adding user own details ', err);
    return res.status(500).json({ error: err.code });
  }
};

// Get current logged-in user data
exports.getUserOwnData = (req, res) => {
  const userData = {};
  db.doc(`/users/${req.user.username}`)
    .get()
    .then(async doc => {
      if (!doc.exists) return res.status(404).json({ error: 'User not found' });

      // Get user credentials
      userData.credentials = doc.data();

      // Get all like user made
      const likesSnapshot = await db
        .collection('likes')
        .where('user.username', '==', req.user.username)
        .orderBy('createdAt', 'desc')
        .get();

      userData.likes = likesSnapshot.docs.map(doc => ({
        postId: doc.data().postId,
      }));

      // Get last 100 notifications user received
      const notificationsSnapshot = await db
        .collection('notifications')
        .where('recipient', '==', req.user.username)
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get();

      userData.notifications = notificationsSnapshot.docs.map(doc =>
        doc.data()
      );

      return res.status(200).json(userData);
    })
    .catch(err => {
      console.error('Error while getting user own data ', err);
      return res.status(500).json({ error: err.code });
    });
};

// Get Profile Data of the requested user
exports.getUserData = (req, res) => {
  const data = {};
  db.doc(`/users/${req.params.username}`)
    .get()
    .then(async doc => {
      if (!doc.exists) return res.status(404).json({ error: 'User not found' });

      // Get user credentials
      data.credentials = doc.data();

      // Get all the posts user created
      const postsSnapshot = await db
        .collection('posts')
        .where('user.username', '==', req.params.username)
        .orderBy('createdAt', 'desc')
        .get();

      data.posts = postsSnapshot.docs.map(doc => doc.data());

      return res.status(200).json(data);
    })
    .catch(err => {
      console.error('Error while getting user data ', err);
      return res.status(500).json({ error: err.code });
    });
};

// Post user profile image
exports.updateUserAvatar = (req, res) => {
  let imageToUpload, imageFileName;

  const busboy = new BusBoy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const { isValid, error } = validateImageFile(
      file,
      req.headers['content-length'],
      mimetype
    );
    if (!isValid) return res.status(400).json({ message: error });

    // 1. Generate unique image filename
    const imageExt = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${Math.round(Math.random() * 10000000000000)}.${imageExt}`;
    // 2. Create filepath
    const filePath = path.join(os.tmpdir(), imageFileName);
    // 3. Create the file in the user's temp directory
    file.pipe(fs.createWriteStream(filePath));

    imageToUpload = { filePath, mimetype };
  });

  busboy.on('finish', () => {
    // 1. Upload the created file to firebase storage
    admin
      .storage()
      .bucket()
      .upload(imageToUpload.filePath, {
        gzip: true,
        destination: `users/${req.user.userId}/${imageFileName}`,
        metadata: {
          public: true,
          metadata: {
            contentType:
              imageToUpload.mimetype === 'image/jpg'
                ? 'image/jpeg'
                : imageToUpload.mimetype,
          },
        },
      })
      .then(data => {
        // 2. Get the file url from the storage
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${encodeURIComponent(data[0].name)}?alt=media`;

        // 2. Add the imageUrl to the db
        return db.doc(`/users/${req.user.username}`).update({ imageUrl });
      })
      .then(() =>
        res.status(200).json({ message: 'Profile image updated successfully' })
      )
      .catch(err => {
        console.error('Error while uploading user avatar ', err);
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      });
  });
  // get the response from the server
  busboy.end(req.rawBody);
};

exports.updateUserCredentials = (req, res) => {
  if (!req.body.name) {
    return res
      .status(400)
      .json({ message: 'Fieldname to update must be specified!' });
  }

  if (req.body.name === 'name') return updateUserName(req, res);
  else if (req.body.name === 'email') return updateUserEmail(req, res);
  else if (req.body.name === 'password') return updateUserPassword(req, res);
};

// Update password
async function updateUserPassword(req, res) {
  const { errors, isValid } = validatePasswordContent(req.body.value);
  if (!isValid) return res.status(400).json(errors);

  try {
    //TODO: RE-AUTHENTICATION USER WITH CURRENT PASSWORD AND EMAIL

    // 1. Update email in fb auth changed
    await admin
      .auth()
      .updateUser(req.user.userId, {
        password: req.body.value.newPassword,
      })
      .then(() =>
        res.status(200).json({
          message: 'Password updated successfully.',
        })
      );
  } catch (err) {
    console.error('Error while updating password ', err);
    return res.status(500).json({ error: err.code });
  }
}

// Update email
async function updateUserEmail(req, res) {
  if (!validEmail(req.body.value)) {
    return res.status(400).json({ email: 'Must be valid email address' });
  }

  try {
    // 1. Update email in fb auth changed
    await admin
      .auth()
      .updateUser(req.user.userId, {
        email: req.body.value,
      })
      .then(userRecord => {
        // 2. Update email field in the db
        return db
          .doc(`/users/${req.user.username}`)
          .update({ email: userRecord.toJSON().email });
      })
      .then(() => {
        //TODO: SEND EMAIL VERIFICATION LINK
        return res.status(200).json({
          message: 'Email updated successfully.',
        });
      });
  } catch (err) {
    console.error('Error while updating email ', err);
    if (err.code === 'auth/email-already-exists') {
      return res.status(400).json({
        email: 'The email address is already in use by another account.',
      });
    } else if (err.code === 'auth/invalid-email') {
      return res.status(400).json({ email: 'Invalid email address' });
    }
    return res.status(500).json({ error: err.code });
  }
}

// Update name
async function updateUserName(req, res) {
  if (!validName(req.body.value)) {
    return res.status(400).json({ name: 'Please use your authentic name' });
  }

  try {
    // 1. Update user displayName if Name is changed
    await admin
      .auth()
      .updateUser(req.user.userId, {
        displayName: req.body.value,
      })
      .then(userRecord => {
        // 2. Update name of the user in the db
        return db
          .doc(`/users/${req.user.username}`)
          .update({ name: userRecord.toJSON().displayName });
      })
      .then(() =>
        res.status(200).json({ message: 'Name updated successfully' })
      );
  } catch (err) {
    console.error('Error while updating name ', err);
    return res.status(500).json({ error: err.code });
  }
}
