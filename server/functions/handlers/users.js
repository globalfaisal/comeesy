const firebase = require('firebase');
const config = require('../config');

firebase.initializeApp(config);

const { db } = require('../utils/admin');

const {
  validateLoginData,
  validateSignupData,
} = require('../utils/validators');

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  // Validate incoming data
  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json({ errors });

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => data.user.getIdToken())
    .then(token => res.json({ token }))
    .catch(err => {
      console.error('Error while user login ', err);
      if (err.code === 'auth/user-not-found') {
        return res
          .status(403)
          .json({ general: 'This email does not exist. please try again' });
      }
      if (err.code === 'auth/wrong-password') {
        return res
          .status(403)
          .json({ general: 'Wrong credentials. please try again' });
      }
      return res.status(500).json({ error: err.code });
    });
};

exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };

  // Validate incoming data
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json({ errors });

  let token, userId;
  // Creates new user
  db.doc(`/users/${newUser.username}`)
    .get()
    .then(doc => {
      // Check if username is already exists
      if (doc.exists) {
        return res.status(400).json({ username: 'username is already taken' });
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
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userId,
      };
      // Persist the newly created user credentials to the db
      return db.doc(`/users/${newUser.username}`).set(userCredentials);
    })
    .then(() => res.status(201).json({ token }))
    .catch(err => {
      console.error('Error while using sing-up ', err);

      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' });
      } else if (err.code === 'auth/invalid-email') {
        return res.status(400).json({ email: 'Invalid email address' });
      } else if (err.code === 'auth/weak-password') {
        return res
          .status(400)
          .json({ password: 'Weak password, please choose a strong password' });
      }

      return res.status(500).json({ error: err.code });
    });
};
