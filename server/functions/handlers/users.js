const firebase = require('firebase');
const BusBoy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

const { admin, db } = require('../utils/admin');
const {
  validateLoginData,
  validateSignupData,
  reduceUserDetails,
} = require('../utils/validators');

const config = require('../config');

firebase.initializeApp(config);

// Login user
exports.login = (req, res) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };

  // Validate incoming data
  const { isValid, errors } = validateLoginData(userData);
  if (!isValid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(userData.email, userData.password)
    .then(data => data.user.getIdToken())
    .then(token => res.status(200).json({ token }))
    .catch(err => {
      console.error('Error while user login ', err);
      if (err.code === 'auth/user-not-found') {
        return res
          .status(403)
          .json({ email: 'This email does not exist. Please try again' });
      }
      if (err.code === 'auth/wrong-password') {
        return res
          .status(403)
          .json({ password: 'Wrong password. Please try again' });
      }
      console.error('Error while login user ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

// Logout user
exports.logout = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => res.json({ message: 'Logged out successfully' }))
    .catch(err => {
      console.error('Error while logout ', err);
      return res.status(500).json({ error: err.code });
    });
};

// Signup new user
exports.signup = (req, res) => {
  const newUser = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  // Validate incoming data
  const { isValid, errors } = validateSignupData(newUser);
  if (!isValid) return res.status(400).json(errors);

  let token, userId;
  const defaultAvatarFileName = 'default-avatar.png';

  // Creates new user
  db.doc(`/users/${newUser.username}`)
    .get()
    .then(doc => {
      // Check if username is already exists
      if (doc.exists) {
        return res.status(400).json({ username: 'Username is already taken' });
      } else {
        // Create new user
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
      const userCredentials = {
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${defaultAvatarFileName}?alt=media`,
        userId,
      };
      // Persist the newly created user credentials to the db
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(doc => {
      // created successfully
      console.log(`User created successfully`);
      return res.status(201).json({ token });
    })
    .catch(err => {
      console.error('Error while user sing-up ', err);

      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' });
      } else if (err.code === 'auth/invalid-email') {
        return res.status(400).json({ email: 'Invalid email address' });
      } else if (err.code === 'auth/weak-password') {
        return res
          .status(400)
          .json({ password: 'Weak password, please choose a strong one' });
      }
      console.error('Error while signup new user ', err);
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};

// Add user details
exports.addUserDetails = (req, res) => {
  const { isEmptyData, details } = reduceUserDetails(req.body);
  if (isEmptyData)
    return res.status(400).json({ error: 'Invalid data submitted' });
  // persist the update details in the users db
  db.doc(`/users/${req.user.username}`)
    .update(details)
    .then(() => res.json({ message: 'Details added successfully' }))
    .catch(err => {
      console.error('Error while adding user own details ', err);
      return res.status(500).json({ error: err.code });
    });
};

// Get current logged-in user data
exports.getCurrentUserData = (req, res) => {
  const userData = {};
  db.doc(`/users/${req.user.username}`)
    .get()
    .then(async doc => {
      if (!doc.exists) return res.status(404).json({ error: 'User not found' });

      // Get user credentials
      userData.credentials = doc.data();

      // Get all the posts user created
      const postsSnapshot = await db
        .collection('posts')
        .where('user.username', '==', req.user.username)
        .orderBy('createdAt', 'desc')
        .get();
      userData.posts = postsSnapshot.docs.map(doc => doc.data());

      // Get all like user made
      const likesSnapshot = await db
        .collection('likes')
        .where('user.username', '==', req.user.username)
        .orderBy('createdAt', 'desc')
        .get();

      userData.likes = likesSnapshot.docs.map(doc => doc.data());

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

// Get any user data
exports.getUserData = (req, res) => {
  const userData = {};
  db.doc(`/users/${req.params.username}`)
    .get()
    .then(async doc => {
      if (!doc.exists) return res.status(404).json({ error: 'User not found' });

      // Get user credentials
      userData.credentials = doc.data();

      // Get all the posts user created
      const postsSnapshot = await db
        .collection('posts')
        .where('user.username', '==', req.params.username)
        .orderBy('createdAt', 'desc')
        .get();

      userData.posts = postsSnapshot.docs.map(doc => doc.data());
      return res.status(200).json(userData);
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
    if (!file || !mimetype)
      return res.status(400).json({ error: 'Invalid file submitted' });
    if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
      return res.status(400).json({
        error:
          'Invalid file-type uploaded, accepted file-types are .jpg or .png',
      });
    }
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
        res.status(201).json({ message: 'image uploaded successfully' })
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
