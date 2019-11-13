const firebase = require('firebase');
const admin = require('firebase-admin');
const config = require('./config');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.databaseURL,
  storageBucket: config.storageBucket,
});

firebase.initializeApp(config);

const db = admin.firestore();

module.exports = { firebase, admin, db };
