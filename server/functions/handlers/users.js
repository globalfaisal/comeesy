const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

const { admin, db } = require('../utils/admin');

const {
  validateUserDetails,
  validateImageFile,
} = require('../utils/validators');

const config = require('../config');

// Add user details
exports.addUserDetails = async (req, res) => {
  // validation data

  const { errors, isValid, isEmptyData } = validateUserDetails(req.body);
  if (isEmptyData) {
    return res
      .status(400)
      .json({ error: 'At least one field must be updated' });
  }
  if (!isValid) return res.status(400).json(errors);

  try {
    // 1. Update user displayName if Name is changed
    const userRecord = await admin.auth().getUser(req.user.userId);
    if (req.body.name && req.body.name !== userRecord.toJSON().displayName) {
      await admin
        .auth()
        .updateUser(req.user.userId, {
          displayName: req.body.name,
        })
        .then(userNewRecord =>
          console.log(
            'Successfully updated user displayName',
            userNewRecord.toJSON().displayName
          )
        );
    }
    // 2. Update details in the users db
    return db
      .doc(`/users/${req.user.username}`)
      .update(req.body)
      .then(() =>
        res.status(201).json({ message: 'Details updated successfully' })
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
exports.getProfileData = (req, res) => {
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
exports.uploadUserAvatar = (req, res) => {
  let imageFileName;
  let imageToUpload = {};

  const busboy = new BusBoy({ headers: req.headers });
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    const { isValid, error } = validateImageFile(
      file,
      req.headers['content-length'],
      mimetype
    );
    if (!isValid) return res.status(400).json({ avatar: error });

    // 1. Generate unique image filename
    const imageExt = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${req.user.userId}.${imageExt}`;
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
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToUpload.mimetype,
          },
        },
      })
      .then(() => {
        // 2. Get the file url from the storage
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${imageFileName}?alt=media`;

        // 2. Add the imageUrl to the db
        return db.doc(`/users/${req.user.username}`).update({ imageUrl });
      })
      .then(() =>
        res.status(201).json({ message: 'Profile image updated successfully' })
      )
      .catch(err => {
        console.error('Error while uploading profile image ', err);
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      });
  });
  // get the response from the server
  busboy.end(req.rawBody);
};
