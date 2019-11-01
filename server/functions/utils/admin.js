const firebase = require('firebase');
const admin = require('firebase-admin');
const config = require('../config');

admin.initializeApp();

firebase.initializeApp(config);

const db = admin.firestore();

module.exports = { firebase, admin, db };
