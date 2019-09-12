const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const express = require('express');
const app = express();

const db = admin.firestore();

// Set api routes

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


exports.api = functions.region('europe-west1').https.onRequest(app);



