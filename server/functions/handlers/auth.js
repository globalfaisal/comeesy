const { db, admin, firebase } = require('../utils/admin');
const config = require('../config');

const {
  validateLoginData,
  validateSignupData,
} = require('../utils/validators');

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
    .then(data => {
      console.log(
        '-----------------------EMAIL VERIFIED: ',
        data.user.emailVerified
      );
      return data.user.getIdToken();
    })
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
    name: req.body.name,
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
    .then(async data => {
<<<<<<< HEAD
      // Send email verification
      await data.user.sendEmailVerification();

      // Add user displayName
      await data.user.updateProfile({
        displayName: newUser.name,
      });

      // Get user token
      token = await data.user.getIdToken();

      // Persist the newly created user credentials to the db
=======
      userId = data.user.uid;

      // add user displayName
      await data.user.updateProfile({
        displayName: newUser.name,
      });
      // send email verification
      await data.user.sendEmailVerification();

      return data.user.getIdToken();
    })
    .then(idToken => {
      token = idToken;
>>>>>>> 01df027b221af9430710483d3a51997c3f696a50
      const userCredentials = {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        gender: 'unspecified',
        birthdate: null,
        location: '',
        bio: '',
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
          config.storageBucket
        }/o/${defaultAvatarFileName}?alt=media`,
        verified: data.user.emailVerified,
        userId: data.user.uid,
      };
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

// Logout user
<<<<<<< HEAD
exports.resendEmailVerification = async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.userId);

    return user
      .sendEmailVerification()
      .then(() =>
        res.json({ message: 'Email verification sent successfully' })
      );
  } catch (err) {
    console.error('Error while sending email verification ', err);
    return res.status(500).json({ error: err.code });
  }
=======
exports.sendEmailVerification = (req, res) => {
  req.user
    .sendEmailVerification()
    .then(() => res.json({ message: 'Email verification sent successfully' }))
    .catch(err => {
      console.error('Error while sending email verification ', err);
      return res.status(500).json({ error: err.code });
    });
>>>>>>> 01df027b221af9430710483d3a51997c3f696a50
};
