const { admin, db } = require('./admin');

// middleware func that checks if request is authorized
// takes the authorized user credentials and add to the request header
// calls the handler(next)
module.exports = (req, res, next) => {
  let idToken;
  // 1. get the token from the req header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else {
    console.error('Error: No token found in the request');
    return res.status(403).json({ error: 'Unauthorized' });
  }
  // 2. check if the token is valid
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;

      return db
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();
    })
    .then(snapshot => {
      req.user.username = snapshot.docs[0].data().username;
      return next();
    })
    .catch(err => {
      console.error('Error while verifying token ', err);
      return res.status(403).json(err);
    });
};
