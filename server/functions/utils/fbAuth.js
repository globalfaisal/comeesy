const { admin, db } = require('./admin');

// Middleware func for protecting the route
// from un authorized access.
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
    return res.status(403).json({ error: 'Unauthorized Request' });
  }
  // 2. check if the token is valid
  let uuid;
  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      uuid = decodedToken.uid;
      return db
        .collection('users')
        .where('userId', '==', uuid)
        .limit(1)
        .get();
    })
    .then(snapshot => {
      req.user = { ...snapshot.docs[0].data(), uuid };
      return next();
    })
    .catch(err => {
      console.error('Error while verifying token ', err);
      if (err.code === 'auth/id-token-expired') {
        return res.status(403).json({
          error: 'expired id-token provided',
        });
      } else if (err.code === 'auth/argument-error') {
        return res.status(403).json({
          error: 'invalid id-token provided',
        });
      }
      return res
        .status(500)
        .json({ general: 'Something went wrong, please try again' });
    });
};
