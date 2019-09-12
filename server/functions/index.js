const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();



// Our web app's firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_D174zCQigxHHQuoAjPRVWhqCsWW8Y2I",
  authDomain: "kydding-f188e.firebaseapp.com",
  databaseURL: "https://kydding-f188e.firebaseio.com",
  projectId: "kydding-f188e",
  storageBucket: "kydding-f188e.appspot.com",
  messagingSenderId: "1055385668845",
  appId: "1:1055385668845:web:780d5a228c2659507710e4"
};

// Initialize Firebase and Firebase-admin
firebase.initializeApp(firebaseConfig);
admin.initializeApp();

// Initialize Firebase (Cloud firestore DB)
const db = admin.firestore(); 

//  Setup joke-posts routes
app.get('/jokes', (req, res)=> {
  db.collection('jokes')
    .get()
    .then(snapshots => {
      const jokes = [];
        snapshots.forEach(doc => {
          jokes.push({
            jokeId: doc.id,
            ...doc.data()
          });
        });
      return res.json(jokes);
    })
    .catch(err => {
      res.json({error: err});
      console.error('== ERROR ==', err);
    });
});


app.post('/joke', (req, res)=>{
  const newJoke = {
    username: req.body.username, 
    body: req.body.body,
    createdAt: new Date().toISOString()
  };

  db.collection('jokes')
    .add(newJoke)
    .then(doc => res.json({message: `document ${doc.id} created successfully`}))
    .catch(err => {
      res.status(500).json({error: 'something went wrong'});
      console.error('== ERROR ==', err);
    });
});


// Setup app auth routes
app.post('/signup', (req, res)=> {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username,
  };
  
  let token, userId ;

  db.doc(`/users/${newUser.username}`)
    .get()
    .then(doc => {
      // Check if username is already exists
      if(doc.exists) {
        return res.status(400).json({username: 'username is already taken'});
      }else {
       // Create new user
      return firebase.auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then( data => {
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
      }
      // Persist the newly created user credentials to the db
      return db.doc(`/users/${newUser.username}`)
        .set(userCredentials);
    })
    .then(()=>res.status(201).json({token}))
    .catch(err => {
      console.error('== ERROR ==', err);
      if(err.code === 'auth/email-already-in-use') {
        return res.status(400).json({email: 'email is already in use'});
      }
      return res.status(500).json({error: err.code});
    });
});

// https://baseurl.com/api/{route}
exports.api = functions.region('europe-west1').https.onRequest(app);



