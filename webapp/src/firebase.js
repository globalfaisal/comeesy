import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Firebases configuration for the web-app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
try {
  firebase.initializeApp(firebaseConfig);
  firebase.firestore();
  console.log('Firebase Initialized');
} catch (err) {
  console.log('Error White Initializing Firebase');
}

export default firebase;
