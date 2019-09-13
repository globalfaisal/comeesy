const validator = require('validator');

exports.validateLoginData = data => {
  const errors = {};

  if (validator.isEmpty(data.email)) errors.email = 'Must not be empty';
  else if (!validator.isEmail(data.email))
    errors.email = 'Must provide a valid email address';
  if (validator.isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignupData = data => {
  const errors = {};
  if (validator.isEmpty(data.username)) errors.username = 'Must not be empty';

  if (validator.isEmpty(data.email)) errors.email = 'Must not be empty';
  else if (!validator.isEmail(data.email))
    errors.email = 'Must be a valid email address';

  if (validator.isEmpty(data.password)) errors.password = 'Must not be empty';
  if (!validator.equals(data.password, data.confirmPassword))
    errors.confirmPassword = 'Password must match';

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
