const validator = require('validator');

exports.validateLoginData = data => {
  const errors = {};

  if (validator.isEmpty(data.email)) errors.email = 'Must not be empty';
  else if (!validator.isEmail(data.email))
    errors.email = 'Must be a valid email address';
  if (validator.isEmpty(data.password)) errors.password = 'Must not be empty';

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.validateSignupData = data => {
  const errors = {};
  if (validator.isEmpty(data.name)) errors.name = 'Must not be empty';

  if (validator.isEmpty(data.username)) errors.username = 'Must not be empty';

  if (validator.isEmpty(data.email)) errors.email = 'Must not be empty';
  else if (!validator.isEmail(data.email))
    errors.email = 'Must be a valid email address';

  if (validator.isEmpty(data.password)) errors.password = 'Must not be empty';
  if (validator.isEmpty(data.confirmPassword))
    errors.confirmPassword = 'Must not be empty';
  if (!validator.equals(data.password, data.confirmPassword))
    errors.confirmPassword = 'Password must match';

  return {
    errors,
    isValid: Object.keys(errors).length === 0 ? true : false,
  };
};

exports.reduceUserDetails = data => {
  const details = {};
  if (data.name && !validator.isEmpty(data.name)) details.name = data.name;
  if (data.gender && !validator.isEmpty(data.gender))
    details.gender = data.gender;
  if (data.location && !validator.isEmpty(data.location))
    details.location = data.location;
  if (data.bio && !validator.isEmpty(data.bio)) details.bio = data.bio;
  if (data.birthdate && !validator.isEmpty(data.birthdate))
    details.birthdate = data.birthdate;
  return {
    details,
    isEmptyData: Object.keys(details).length === 0 ? true : false,
  };
};

exports.validateBodyContent = body => {
  let error = '';
  if (typeof body === 'string' && validator.isEmpty(body))
    error = 'Must not be empty';
  else if (Array.isArray(body) && body.length === 0)
    error = 'Must not be empty';
  return {
    error,
    isValid: error === '' ? true : false,
  };
};
