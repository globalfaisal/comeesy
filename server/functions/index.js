const firebase = require('firebase');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

const firebaseConfig = require('./firebase-config.js');
const validateUserSignUp = require('./helpers/validateUserSignUp.js')




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
    
  const signupErrors = validateUserSignUp(newUser);

  if(Object.keys(signupErrors).length > 0){
    return res.status(400).json({error: signupErrors});
  }
  // Validate user credentials
  


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



