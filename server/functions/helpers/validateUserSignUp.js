const validator = require('validator');

const validateUserSignUp = user => {
  const err = {}
  if(validator.isEmpty(user.username)) err.username = 'Must not be empty';

  if(validator.isEmpty(user.email)) err.email = 'Must not be empty';
  else if(!validator.isEmail(user.email)) err.email = 'Must be a valid email address';
  
  if(validator.isEmpty(user.password)) err.password = 'Must not be empty';
  if(!validator.equals(user.password, user.confirmPassword)) err.confirmPassword = 'Password must match';

  return err;
};

module.exports = validateUserSignUp;